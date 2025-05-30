//CURSO ACTUAL TRABAJO SEGURO EN ALTURAS


//----------------------------------------------//
//LECCION 1 SLIDER 3
let currentIndex_sld3_lec1 = 0;
const slides_sld3_lec1 = document.querySelectorAll('.slide-sld3_lec1');

function showNextSlide_sld3_lec1() {
  slides_sld3_lec1[currentIndex_sld3_lec1].classList.remove('active-sld3_lec1');
  currentIndex_sld3_lec1 = (currentIndex_sld3_lec1 + 1) % slides_sld3_lec1.length;
  slides_sld3_lec1[currentIndex_sld3_lec1].classList.add('active-sld3_lec1');
}

setInterval(showNextSlide_sld3_lec1, 3000); // cambia cada 3 segundos


//----------------------------------------------//
//LECCION 3 SLIDER 2
// TOOLTIPS EPP
// ---------------------------------------------- //
// LECCION 3 SLIDER 2 - VERSIÓN FINAL CORREGIDA
// ---------------------------------------------- //

// ---------------------------------------------- //
// LECCION 3 SLIDER 2 - VERSIÓN FINAL COMPLETA
// ---------------------------------------------- //

// Función principal para mostrar el reproductor con transcripción
function showAudioWithTranscription_sld15epp(button, message, event) {
    closeMessage_sld15epp(); // Cierra cualquier mensaje previo
    event.stopPropagation();

    // 1. Crear el contenedor del mensaje
    let messageBox_sld15epp = document.createElement('div');
    messageBox_sld15epp.className = 'message-box_sld15epp';

    // 2. Crear el reproductor de audio completo
    let audioContainer = document.createElement('div');
    audioContainer.className = 'audio-container-slider';
    
    let audioElement = document.createElement('audio');
    audioElement.className = 'audio-con-transcripcion slider-audio audio-reducido-modal';
    audioElement.controls = true;
    audioElement.setAttribute('data-transcripcion', button.getAttribute('data-transcripcion'));
    audioElement.innerHTML = `<source src="${button.getAttribute('data-audio')}" type="audio/mp3">`;
    
    let toggleButton = document.createElement('i');
    toggleButton.className = 'transcription-toggle-slider fas fa-closed-captioning';
    toggleButton.setAttribute('title', 'Activar subtítulos');

    audioContainer.appendChild(audioElement);
    audioContainer.appendChild(toggleButton);

    // 3. Construir el contenido del messageBox
    messageBox_sld15epp.innerHTML = `
        ${message}
        <button class="close-button_sld15epp" onclick="closeMessage_sld15epp()">&times;</button>
    `;
    messageBox_sld15epp.appendChild(audioContainer);

    // 4. Posicionamiento
    let buttonRect_sld15epp = button.getBoundingClientRect();
    let containerRect_sld15epp = document.querySelector('.image-sld15epp').getBoundingClientRect();

    if (window.innerWidth <= 768) {
        messageBox_sld15epp.style.top = `${containerRect_sld15epp.top}px`;
        messageBox_sld15epp.style.left = `10px`;
    } else {
        messageBox_sld15epp.style.top = `${buttonRect_sld15epp.top - containerRect_sld15epp.top + buttonRect_sld15epp.height / 2}px`;
        messageBox_sld15epp.style.left = `${buttonRect_sld15epp.left - containerRect_sld15epp.left + buttonRect_sld15epp.width / 2}px`;
    }

    document.querySelector('.image-sld15epp').appendChild(messageBox_sld15epp);
    messageBox_sld15epp.style.display = 'block';
    document.getElementById('imageContainer_sld15epp').classList.add('darkened_sld15epp');

    // 5. Inicializar eventos y autoplay
    initSliderAudioTranscription(audioElement, toggleButton);
    
    // Autoplay con manejo de errores
    const playPromise = audioElement.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Autoplay prevenido, mostrando controles");
            audioElement.controls = true;
        });
    }

    document.addEventListener('click', outsideClickListener_sld15epp);
}

// Función para inicializar la transcripción
function initSliderAudioTranscription(audioElement, toggleButton) {
    const transcripcionGlobal = document.getElementById('transcripcion-global');
    let textos = [];
    
    try {
        textos = JSON.parse(audioElement.getAttribute('data-transcripcion'));
    } catch (e) {
        console.error('Error al parsear data-transcripcion:', e);
        return;
    }

    // Función de actualización
    function updateTranscripcion() {
        if (!audioElement || audioElement.readyState === 0) return;
        
        const tiempoActual = audioElement.currentTime;
        const textoActual = textos.find(item => tiempoActual >= item.start && tiempoActual <= item.end);

        if (toggleButton.classList.contains('active')) {
            transcripcionGlobal.textContent = textoActual?.text || '';
            transcripcionGlobal.style.display = textoActual ? 'block' : 'none';
        }

        if (!audioElement.paused && !audioElement.ended) {
            requestAnimationFrame(updateTranscripcion);
        }
    }

    // Eventos del botón de transcripción
    toggleButton.addEventListener('click', function() {
        this.classList.toggle('active');
        this.style.color = this.classList.contains('active') ? '#2a7fba' : '#666';
        
        if (this.classList.contains('active')) {
            updateTranscripcion();
        } else {
            transcripcionGlobal.style.display = 'none';
        }
    });

    // Eventos del audio
    const audioEvents = {
        play: () => {
            if (toggleButton.classList.contains('active')) {
                updateTranscripcion();
            }
        },
        pause: () => {
            transcripcionGlobal.style.display = 'none';
        },
        ended: () => {
            transcripcionGlobal.style.display = 'none';
            toggleButton.classList.remove('active');
            toggleButton.style.color = '#666';
        },
        timeupdate: () => {
            if (toggleButton.classList.contains('active') && !audioElement.paused) {
                updateTranscripcion();
            }
        }
    };

    // Registrar eventos
    Object.entries(audioEvents).forEach(([event, handler]) => {
        audioElement.addEventListener(event, handler);
    });

    // Guardar referencia para limpieza
    audioElement._transcriptionEvents = audioEvents;
}

// Función mejorada para cerrar el mensaje (CON CORRECCIÓN PARA TRANSCRIPCIÓN)
function closeMessage_sld15epp() {
    let messageBox_sld15epp = document.querySelector('.message-box_sld15epp');
    if (messageBox_sld15epp) {
        // Detener y limpiar el audio
        const audioElement = messageBox_sld15epp.querySelector('.slider-audio');
        if (audioElement) {
            audioElement.pause();
            // Remover eventos de transcripción
            Object.entries(audioElement._transcriptionEvents || {}).forEach(([event, handler]) => {
                audioElement.removeEventListener(event, handler);
            });
        }
        
        messageBox_sld15epp.remove();
    }

    // Ocultar transcripción global (CORRECCIÓN AQUÍ)
    const transcripcionGlobal = document.getElementById('transcripcion-global');
    if (transcripcionGlobal) {
        transcripcionGlobal.style.display = 'none';
        transcripcionGlobal.textContent = ''; // Limpiar el texto también
    }

    document.getElementById('imageContainer_sld15epp').classList.remove('darkened_sld15epp');
    document.removeEventListener('click', outsideClickListener_sld15epp);
}

// Listener para clics fuera del mensaje
function outsideClickListener_sld15epp(event) {
    let messageBox_sld15epp = document.querySelector('.message-box_sld15epp');
    if (messageBox_sld15epp && 
        !messageBox_sld15epp.contains(event.target) && 
        !event.target.classList.contains('circle-button_sld15epp')) {
        closeMessage_sld15epp();
    }
}