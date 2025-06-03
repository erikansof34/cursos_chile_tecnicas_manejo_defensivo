document.addEventListener('DOMContentLoaded', function () {
    const audios = document.querySelectorAll('.audio-con-transcripcion');
    const transcripcionGlobal = document.getElementById('transcripcion-global');
    const toggleButtons = document.querySelectorAll('.transcription-toggle');

    if (audios.length === 0) {
        console.warn('No se encontraron audios con la clase audio-con-transcripcion');
        return;
    }

    // Función para desactivar todos los botones excepto el actual
    function deactivateOtherToggleButtons(currentButton) {
        toggleButtons.forEach(btn => {
            if (btn !== currentButton) {
                btn.classList.remove('active');
                btn.style.color = '#666';
                btn.setAttribute('title', 'Activar subtítulos');
            }
        });
    }

    // Función para actualizar la transcripción
    function updateTranscripcion(audio, textos, toggleBtn) {
        const tiempoActual = audio.currentTime;
        const textoActual = textos.find(item => tiempoActual >= item.start && tiempoActual <= item.end);

        if (toggleBtn.classList.contains('active')) {
            if (textoActual) {
                transcripcionGlobal.textContent = textoActual.text;
                transcripcionGlobal.style.display = 'block';
            } else {
                transcripcionGlobal.style.display = 'none';
            }
        } else {
            transcripcionGlobal.style.display = 'none';
        }

        if (!audio.paused && !audio.ended) {
            requestAnimationFrame(() => updateTranscripcion(audio, textos, toggleBtn));
        }
    }

    // Configurar eventos para cada audio
    audios.forEach(audio => {
        const toggleBtn = audio.parentElement.querySelector('.transcription-toggle');
        let textos = [];

        try {
            textos = JSON.parse(audio.getAttribute('data-transcripcion'));
        } catch (e) {
            console.error('Error al parsear data-transcripcion:', e);
            return;
        }

        // Agregar título (tooltip) al botón
        if (toggleBtn) {
            toggleBtn.setAttribute('title', 'Activar subtítulos');

            // Eventos para cambiar el tooltip
            toggleBtn.addEventListener('mouseenter', function () {
                this.setAttribute('title', this.classList.contains('active') ? 'Desactivar subtítulos' : 'Activar subtítulos');
            });

            // Evento para el botón de toggle
            toggleBtn.addEventListener('click', function () {
                // Desactivar otros botones primero
                deactivateOtherToggleButtons(this);

                // Activar/desactivar el actual
                this.classList.toggle('active');
                this.style.color = this.classList.contains('active') ? '#2a7fba' : '#666';
                this.setAttribute('title', this.classList.contains('active') ? 'Desactivar subtítulos' : 'Activar subtítulos');

                if (this.classList.contains('active') && !audio.paused) {
                    updateTranscripcion(audio, textos, toggleBtn);
                } else {
                    transcripcionGlobal.style.display = 'none';
                }
            });
        }

        // Evento play
        audio.addEventListener('play', function () {
            // Pausar otros audios
            audios.forEach(a => {
                if (a !== audio && !a.paused) a.pause();
            });

            if (toggleBtn && toggleBtn.classList.contains('active')) {
                updateTranscripcion(audio, textos, toggleBtn);
            }
        });

        // Evento pause - reinicia el icono
        audio.addEventListener('pause', function () {
            transcripcionGlobal.style.display = 'none';
            if (toggleBtn) {
                toggleBtn.classList.remove('active');
                toggleBtn.style.color = '#666';
                toggleBtn.setAttribute('title', 'Activar subtítulos');
            }
        });

        // Evento ended - reinicia el icono
        audio.addEventListener('ended', function () {
            transcripcionGlobal.style.display = 'none';
            if (toggleBtn) {
                toggleBtn.classList.remove('active');
                toggleBtn.style.color = '#666';
                toggleBtn.setAttribute('title', 'Activar subtítulos');
            }
        });

        // Actualizar durante la reproducción
        audio.addEventListener('timeupdate', function () {
            if (toggleBtn && toggleBtn.classList.contains('active') && !audio.paused) {
                updateTranscripcion(audio, textos, toggleBtn);
            }
        });
    });
});
// Función para reiniciar todos los botones de play de video
function resetVideoPlayButtons() {
    const videoButtons = document.querySelectorAll('.video-button-control-audio');
    videoButtons.forEach(button => {
        button.style.display = 'block'; // Mostrar el botón
        // También puedes reiniciar cualquier otro estado si es necesario
    });
}

// Detectar cambios en el slider (asumiendo que usas algún sistema de sliders)
// Dependiendo de cómo funcione tu slider, puedes llamar a resetVideoPlayButtons() cuando cambie

// Ejemplo para los botones de navegación que muestras:
document.getElementById('prev').addEventListener('click', resetVideoPlayButtons);
document.getElementById('next').addEventListener('click', resetVideoPlayButtons);
document.getElementById('pagIndex').addEventListener('click', resetVideoPlayButtons);

// También deberías llamar a esta función cuando se carga la página por primera vez
document.addEventListener('DOMContentLoaded', resetVideoPlayButtons);