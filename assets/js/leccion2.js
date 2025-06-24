document.addEventListener('DOMContentLoaded', function () {
    const tempRange = document.getElementById('tempRange');
    const temperature = document.getElementById('temperature');
    const preventiveMeasures = document.querySelectorAll('#right-messages .centered-text');

    tempRange.addEventListener('input', function () {
        const value = this.value;
        temperature.style.height = value + '%';

        preventiveMeasures.forEach((measure, index) => {
            if (value >= (index + 1) * 20) {
                measure.classList.add('visible');
            } else {
                measure.classList.remove('visible');
            }
        });
    });
});
// Módulo para manejar la navegación móvil
const MobileSlides = (function () {
    // Función para verificar si es un dispositivo móvil
    function esDispositivoMovil() {
        return window.innerWidth <= 768; // Consideramos móvil si el ancho es menor o igual a 768px
    }

    // Función para crear el primer slide dinámicamente
    function crearPrimerSlide() {
        // Eliminar el primer slide existente si existe
        $(".contentModule > div").first().remove();

        // Crear el nuevo primer slide
        const primerSlide = $(`
                <div class="container dividerImgSeccion2 miga_titulo_curso" id="dividerImgSeccion2">
                    <div class="row">
                        <div class="pl-seccion">
                            <div class="col-lg-8 col-md-12">
                                <h1 class="tituloseccion">2- Buenos hábitos
                                    <span class="yellow">de Manejo</span>
                                    <span class="yellow">Defensivo</span>
                                </h1>
                                <hr class="hr-50">
                            </div>
                        </div>
                    </div>
                </div>
            `);


        // Insertar el nuevo slide al principio del contenedor
        $(".contentModule").prepend(primerSlide);

        // Determinar la imagen según el dispositivo
        const bgImage = esDispositivoMovil()
            ? 'url(../../assets/img/momento2_mobile.webp)'
            : 'url(../../assets/img/momento2_web.webp)';

        // Aplicar estilos directamente
        primerSlide.css({
            'background': bgImage + ' no-repeat center center',
            'background-size': 'cover',
            'height': '100vh',
            'display': 'flex',
            'flex-direction': 'column',
            'align-items': 'center',
            'justify-content': 'center',
            'text-align': 'left',
            'position': 'relative',
            'z-index': '0'
        });

        // Crear y aplicar el pseudo-elemento ::after
        const style = document.createElement('style');
        style.textContent = `
                #dividerImgSeccion2::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.582);
                    z-index: 1;
                }
                
                #dividerImgSeccion2 > * {
                    position: relative;
                    z-index: 2;
                }
            `;
        document.head.appendChild(style);

        return primerSlide;
    }

    // Función para mostrar slides
    function mostrarSlide(numeroSlide) {
        try {
            // Ocultar todos los slides
            $(".contentModule > div").hide().removeClass('current');

            // Si es el primer slide, recrearlo
            if (numeroSlide === 1) {
                const primerSlide = crearPrimerSlide();
                primerSlide.show().addClass('current');

                // Forzar visibilidad de botones para slide 1
                $("#prev").css("display", "none");
                $("#pagIndex").css("display", "inline-block");
                // $("#prev").css('display', 'none !important');
                // $("#pagIndex").css('display', 'block !important');
            } else {
                // Para otros slides, usar la lógica normal
                const slideActual = $(".contentModule > div").eq(numeroSlide - 1);
                if (!slideActual.length) {
                    console.warn(`Slide ${numeroSlide} no encontrado`);
                    return;
                }
                slideActual.show().addClass('current');

                // Forzar visibilidad de botones para slides 2 en adelante
                $("#prev").css("display", "inline-block");
                $("#pagIndex").css("display", "none");
                // $("#prev").css('display', 'block !important');
                // $("#pagIndex").css('display', 'none !important');
            }

            // Actualizar el contador
            $('#textProg').text(numeroSlide);

            // Actualizar la interfaz
            actualizarInterfazProgreso(numeroSlide);
        } catch (error) {
            console.error('Error al mostrar slide:', error);
        }
    }

    // Función para actualizar la interfaz de progreso
    function actualizarInterfazProgreso(e) {
        // Número de sliders
        var sliders = $(".contentModule > div").length;
        $('#nSlider2').html(sliders);

        // Actualizar la barra de progreso
        var progressBar = Math.round((e / sliders) * 100);
        $(".progBar > div").css("width", progressBar + "%");
        $('#porcentajeProgreso').text(progressBar);
    }

    // Función para inicializar la navegación móvil
    function init() {
        if (!esDispositivoMovil()) return;

        // Mostrar el primer slide al cargar
        mostrarSlide(1);

        // Manejar redimensionamiento de ventana
        $(window).on('resize', function () {
            if (!esDispositivoMovil()) return;

            const currentSlide = parseInt($('#textProg').text());
            if (currentSlide === 1) {
                crearPrimerSlide();
                // Forzar visibilidad de botones para slide 1
                $("#prev").css('display', 'none !important');
                $("#pagIndex").css('display', 'block !important');
            } else {
                // Forzar visibilidad de botones para otros slides
                $("#prev").css('display', 'block !important');
                $("#pagIndex").css('display', 'none !important');
            }
        });

        // Eventos de navegación
        $("#next").off('click').on('click', function () {
            if (!esDispositivoMovil()) return;

            const slideActual = parseInt($('#textProg').text());
            const totalSlides = $(".contentModule > div").length;

            if (slideActual === totalSlides) {
                const path = location.pathname.split("/").slice(0, -1).join("/");
                window.location.href = path.replace("leccion2", "leccion2") + "/resumen_leccion2.html";
            } else {
                mostrarSlide(slideActual + 1);
            }
        });

        $("#prev").off('click').on('click', function () {
            if (!esDispositivoMovil()) return;

            const slideActual = parseInt($('#textProg').text());
            if (slideActual > 1) {
                mostrarSlide(slideActual - 1);
            }
        });

        $("#pagIndex").off('click').on('click', function () {
            if (!esDispositivoMovil()) return;

            const slideActual = parseInt($('#textProg').text());
            if (slideActual === 1) {
                const path = location.pathname.split("/").slice(0, -1).join("/");
                window.location.href = path.replace("leccion2", "leccion1") + "/evaluacion_leccion1.html";
            }
        });
    }

    // Retornar la interfaz pública
    return {
        init: init
    };
})();

// Inicializar cuando el documento esté listo
$(document).ready(function () {
    MobileSlides.init();
});

$('#evaluacion').click(function () {
    window.location.href = 'quiz.html';
    // window.location.href = "quiz.php?course_code=<?= $course_code; ?>";

});

var iframeConfig = {
    "Slide4L2Web": {
        src: "https://iframe.mediadelivery.net/embed/450631/bae78faa-6f69-4a99-832d-afaaf94561ac?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
        className: "iframe-web",
        style: "width: 20vw; height: 70vh;"
    },

    "Slide4L2Mobile": {
        src: "https://iframe.mediadelivery.net/embed/450631/bae78faa-6f69-4a99-832d-afaaf94561ac?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
        className: "iframe-mobile",
        style: "width: 80vw; height: 70vh;"
    },
}

function reloadIframe(id) {
    var $iframeContainer = $("#" + id); // Selecciona el contenedor por ID
    var $existingIframe = $iframeContainer.find("iframe"); // Encuentra el iframe actual

    if ($existingIframe.length) {
        // Si el iframe existe, solo actualiza su 'src'
        var iframeData = iframeConfig[id]; // Extrae la configuración
        $existingIframe.attr("src", iframeData.src); // Actualiza el src
    } else {
        // Si no existe, crea el iframe
        var iframeData = iframeConfig[id]; // Extrae la configuración
        var iframeClass = iframeData.className || ""; // Clase opcional
        var iframeSrc = iframeData.src;
        var iframeStyle = iframeData.style;

        // Inserta el nuevo iframe
        $iframeContainer.html(`
    <iframe
        class="${iframeClass}"
        src="${iframeSrc}"
        loading="lazy"
        style="${iframeStyle}"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowfullscreen="true"
    ></iframe>
`);
    }
}
function reloadAllIframes() {
    Object.keys(iframeConfig).forEach(function (id) {
        reloadIframe(id);
    });
}

$("#prev").on('click', function () {
    console.log("1");
    reloadIframe("Slide4L2Web");
    reloadIframe("Slide4L2Mobile");
});

$("#next").on('click', function () {
    console.log("2");
    reloadIframe("Slide4L2Web");
    reloadIframe("Slide4L2Mobile");
});

createCirclesMovil();
aniSl19(1);
$(document).ready(function () {
    // Inicializar la interfaz con el progreso actual
    const slideActual = parseInt($('#textProg').text()) || 1;
    actualizarInterfazProgreso(slideActual);
});
function aniSl19(e) {
    // number of slider
    var sliders = $(".contentModule > div").length;
    $('#nSlider2').html(sliders);

    // Actualizar la interfaz con el progreso
    actualizarInterfazProgreso(e); // Donde 'e' es el número de slide actual
    if (e === 1) {
        $("#prev").css('display', 'none');
        $("#pagIndex").css('display', 'inline-block');
        $("#pagIndex").off('click').on('click', function () {
            const path = location.pathname.split("/").slice(0, -1).join("/");
            window.location.href = path.replace("leccion2", "leccion1") + "/evaluacion_leccion1.html";
        });
    } else {
        $("#pagIndex").css('display', 'none');
    }
    if (e === 2) {
        $("#pagIndex").css('display', 'none');
        $("#next-btn").on('click', function () {
            $("#next").click();
        });
    }

    if (e === sliders) {
        // Verificar si es una pantalla de escritorio (ancho mayor a 768px)
        if ($(window).width() >= 768) {
            $("#next").css('display', 'block');
        }

        $("#next").attr('data-last-slide', 'true');
    } else {
        $("#next").removeAttr('data-last-slide');
    }
    $(document).ready(function () {
        // Este evento se ejecutará cada vez que se haga click en #next
        $("#next").on('click', function (event) {
            // Verificamos si estamos en el último slide
            if ($(this).attr('data-last-slide') === 'true') {
                event.preventDefault();
                // window.location.href = "quiz.html";
                const path = location.pathname.split("/").slice(0, -1).join("/");
                window.location.href = path.replace("leccion2", "leccion2") + "/resumen_leccion2.html";
            }
        });
    });

    var breadcrumbMap = {
        'miga_titulo_curso': 'Lección 2: Buenos hábitos de Manejo Defensivo',
    };

    $('#breadcrumb').html(
        $('.current').filter(function () {
            return Array.from(this.classList).find(className => className.startsWith('miga'));
        }).map(function () {
            return breadcrumbMap[Array.from(this.classList).find(className => className.startsWith('miga'))] || '';
        }).get().join('')
    );

    $('#breadcrumb_movil').html(
        $('.current').filter(function () {
            return Array.from(this.classList).find(className => className.startsWith('miga'));
        }).map(function () {
            return breadcrumbMap[Array.from(this.classList).find(className => className.startsWith('miga'))] || '';
        }).get().join('')
    );

    // cambiar fondo instruccion
    if ($('.current').hasClass('dividerInstruccion')) {
        $('body').addClass('darkStyleInstruccion');
    } else {
        $('body').removeClass('darkStyleInstruccion');
    }

    // cambiar fondo secion 1
    if ($('.current').hasClass('dividerImgSeccion1')) {
        $('body').addClass('darkStyleImgSeccion1');
    } else {
        $('body').removeClass('darkStyleImgSeccion1');
    }

    // cambiar fondo secion 2
    if ($('.current').hasClass('dividerImgSeccion2')) {
        $('body').addClass('darkStyleImgSeccion2');
    } else {
        $('body').removeClass('darkStyleImgSeccion2');
    }

    // cambiar fondo secion 3
    if ($('.current').hasClass('dividerImgSeccion3')) {
        $('body').addClass('darkStyleImgSeccion3');
    } else {
        $('body').removeClass('darkStyleImgSeccion3');
    }

    // cambiar fondo secion 4
    if ($('.current').hasClass('dividerImgSeccion4')) {
        $('body').addClass('darkStyleImgSeccion4');
    } else {
        $('body').removeClass('darkStyleImgSeccion4');
    }
}


//---------------------------------//
//SLIDER 2 LECCION 2 - SECCION DE CAMBIOS
document.addEventListener("DOMContentLoaded", function () {
    // Configuración de URLs de videos
    const videoUrls = {
        modal: 'https://iframe.mediadelivery.net/embed/386695/f1d9bf8d-9755-4764-8d6f-08c3764a3db2?autoplay=false&loop=false&muted=false&preload=true&responsive=true'
    };

    // Elementos de la caja de cambios
    const gears = document.querySelectorAll(".gear");
    const boxes = document.querySelectorAll(".box-cambio");
    const audios = document.querySelectorAll(".track-element");

    // Elementos del modal de video
    const videoModal = document.getElementById("sld22-video-vial");
    const videoContainers = {
        web: document.getElementById("Slide23Web"),
        mobile: document.getElementById("Slide23Mobile")
    };
    let currentAudio = null;

    // Función para destruir y recrear iframes de forma agresiva
    function hardRefreshIframe(container, url, className) {
        if (!container) return;

        // 1. Detener completamente el iframe existente
        const iframe = container.querySelector('iframe');
        if (iframe) {
            iframe.src = '';
            iframe.remove();
            container.innerHTML = '';
        }

        // 2. Recrear el iframe después de un breve retraso
        setTimeout(() => {
            container.innerHTML = `
        <iframe class="${className}" 
                src="${url}" 
                loading="lazy"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture" 
                allowfullscreen></iframe>`;
        }, 50);
    }

    // Control de la caja de cambios
    gears.forEach((gear) => {
        gear.addEventListener("click", function () {
            const gearNumber = this.getAttribute("data-gear");
            const audioId = `audio${gearNumber}_factor`;
            const boxToHighlight = document.getElementById(`box${gearNumber}`);

            // Detener audio actual
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            // Reproducir nuevo audio
            currentAudio = document.getElementById(audioId);
            if (currentAudio) {
                currentAudio.currentTime = 0;
                currentAudio.play().catch(e => console.log("Error al reproducir audio:", e));
            }

            // Resaltar box
            boxes.forEach((box) => {
                box.classList.remove("active");
                const p = box.querySelector("p");
                if (p) p.style.color = "";
            });

            if (boxToHighlight) {
                boxToHighlight.classList.add("active");
                const p = boxToHighlight.querySelector("p");
                if (p) p.style.color = "#000";
            }

            // Actualizar engranaje activo
            gears.forEach(g => g.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Eventos del modal
    videoModal.addEventListener("show.bs.modal", function () {
        // Pausar todos los audios
        audios.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        currentAudio = null;

        // Preparar los iframes del modal (web y mobile)
        hardRefreshIframe(videoContainers.web, videoUrls.modal, 'iframe-video-horizontal-web');
        hardRefreshIframe(videoContainers.mobile, videoUrls.modal, 'iframe-video-horizontal-mobile');
    });

    videoModal.addEventListener("hidden.bs.modal", function () {
        // Reiniciar completamente los iframes al cerrar el modal
        hardRefreshIframe(videoContainers.web, videoUrls.modal, 'iframe-video-horizontal-web');
        hardRefreshIframe(videoContainers.mobile, videoUrls.modal, 'iframe-video-horizontal-mobile');
    });

    // Precargar los iframes después de un retraso
    setTimeout(() => {
        hardRefreshIframe(videoContainers.web, videoUrls.modal, 'iframe-video-horizontal-web');
        hardRefreshIframe(videoContainers.mobile, videoUrls.modal, 'iframe-video-horizontal-mobile');
    }, 500);
});

//---------------------------------//
//SLIDER 3 LECCION 2//
document.addEventListener("DOMContentLoaded", () => {
    const audios = [
        { title: "1. Atención y Visión Periférica", src: "../../assets/audio/L2-slide_3_factor_1.mp3" },
        { title: "2. Anticipación y Predecibilidad", src: "../../assets/audio/L2-slide_3_factor_2.mp3" },
        { title: "3. Uso de Tecnología para la Seguridad", src: "../../assets/audio/L2-slide_3_factor_3.mp3" }
    ];

    let currentAudioIndex = 0;
    const audioPlayer = document.getElementById("myAudio");
    const audioSource = document.getElementById("audioSource_sld9");
    const audioTitle = document.getElementById("audio-title");
    const startButton = document.getElementById("startButton");
    const audioControls = document.getElementById("audioControls");
    const prevButton = document.getElementById("prevAudio_sld9");
    const nextButton = document.getElementById("nextAudio_sld9");

    function updateAudio() {
        audioSource.src = audios[currentAudioIndex].src;
        audioTitle.textContent = audios[currentAudioIndex].title;
        audioPlayer.load(); // Carga el nuevo audio
        audioPlayer.play().then(() => {
            console.log("Reproducción iniciada correctamente.");
        }).catch(error => {
            console.error("Error al reproducir el audio:", error);
        });

        // Mostrar/Ocultar botones "Anterior" y "Siguiente" según el índice actual
        if (currentAudioIndex === 0) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'inline-block';
        } else if (currentAudioIndex === audios.length - 1) {
            prevButton.style.display = 'inline-block';
            nextButton.style.display = 'none';
        } else {
            prevButton.style.display = 'inline-block';
            nextButton.style.display = 'inline-block';
        }
    }

    startButton.addEventListener("click", () => {
        startButton.style.display = 'none';
        audioControls.style.display = 'block';
        updateAudio();
    });

    prevButton.addEventListener("click", () => {
        if (currentAudioIndex > 0) {
            currentAudioIndex--;
            updateAudio();
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentAudioIndex < audios.length - 1) {
            currentAudioIndex++;
            updateAudio();
        }
    });

    // No configures el primer audio al cargar la página
    // updateAudio(); // El primer audio se configurará solo cuando el usuario haga clic en "Iniciar"
});

//---------------------------------//
//SLIDER 6 LECCION 2//
document.addEventListener('DOMContentLoaded', function () {
    // URLs de los videos
    const videoUrls = {
        enVia: {
            web: 'https://iframe.mediadelivery.net/embed/450631/1570698c-827d-4269-bf1f-643e878e66a2?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
            mobile: 'https://iframe.mediadelivery.net/embed/450631/1570698c-827d-4269-bf1f-643e878e66a2?autoplay=false&loop=false&muted=false&preload=true&responsive=true'
        },
        volcamientos: {
            web: 'https://iframe.mediadelivery.net/embed/450631/215496f8-81ae-4bd5-8a62-ca91a7c03602?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
            mobile: 'https://iframe.mediadelivery.net/embed/450631/215496f8-81ae-4bd5-8a62-ca91a7c03602?autoplay=false&loop=false&muted=false&preload=true&responsive=true'
        }
    };

    // Variables para controlar los iframes actuales
    let currentIframes = {
        web: null,
        mobile: null
    };

    // Selectores de video
    const videoSelectors = document.querySelectorAll('.btn-video-selector');

    // Cargar el primer video al inicio
    loadVideo('enVia');

    videoSelectors.forEach(selector => {
        selector.addEventListener('click', function () {
            // Solo hacer cambios si no es el botón activo actual
            if (!this.classList.contains('active')) {
                // Detener y destruir los iframes actuales antes de cambiar
                destroyCurrentIframes();

                // Remover clase active de todos los botones
                videoSelectors.forEach(btn => btn.classList.remove('active'));

                // Añadir clase active al botón clickeado
                this.classList.add('active');

                // Determinar qué video cargar
                const target = this.getAttribute('data-target');
                const videoType = target === 'videoEnVia' ? 'enVia' : 'volcamientos';

                // Cargar el video seleccionado
                loadVideo(videoType);
            }
        });
    });

    // Función para destruir los iframes actuales
    function destroyCurrentIframes() {
        // Pausar y eliminar iframe web
        if (currentIframes.web) {
            try {
                currentIframes.web.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                currentIframes.web.remove();
            } catch (e) {
                console.log("Error al pausar iframe web:", e);
            }
            currentIframes.web = null;
        }

        // Pausar y eliminar iframe mobile
        if (currentIframes.mobile) {
            try {
                currentIframes.mobile.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                currentIframes.mobile.remove();
            } catch (e) {
                console.log("Error al pausar iframe mobile:", e);
            }
            currentIframes.mobile = null;
        }
    }

    // Función para cargar un video específico
    function loadVideo(videoType) {
        // Ocultar todos los contenedores de video primero
        document.querySelectorAll('.video-container').forEach(container => {
            container.style.display = 'none';
        });

        // Mostrar el contenedor correspondiente
        const containerId = videoType === 'enVia' ? 'videoEnVia' : 'videoVolcamientos';
        const container = document.getElementById(containerId);
        container.style.display = 'block';

        // Construir iframes para web y móvil
        buildIframe('web', videoType);
        buildIframe('mobile', videoType);
    }

    // Función para construir un iframe
    function buildIframe(device, videoType) {
        const containerId = videoType === 'enVia' ?
            `containerEnVia${device.charAt(0).toUpperCase() + device.slice(1)}` :
            `containerVolcamientos${device.charAt(0).toUpperCase() + device.slice(1)}`;

        const iframeId = videoType === 'enVia' ?
            `${device}IframeSlider6L2Via` :
            `${device}IframeSlider6L2Volc`;

        const container = document.getElementById(containerId);

        // Mostrar loader mientras carga
        const loader = container.querySelector('.loader');
        if (loader) loader.style.display = 'flex';

        // Crear nuevo iframe
        const iframe = document.createElement('iframe');
        iframe.id = iframeId;
        iframe.className = device === 'web' ? 'iframe-video-horizontal-web' : 'iframe-video-horizontal-mobile';
        iframe.src = videoUrls[videoType][device];
        iframe.loading = 'lazy';
        iframe.allow = 'accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;';
        iframe.allowFullscreen = true;
        iframe.style.pointerEvents = 'none';

        // Evento para ocultar loader cuando el iframe cargue
        iframe.addEventListener('load', function () {
            if (loader) loader.style.display = 'none';

            // Guardar referencia al iframe actual
            currentIframes[device] = iframe;
        });

        // Limpiar solo el iframe si existe, manteniendo el botón de play
        const existingIframe = container.querySelector('iframe');
        if (existingIframe) {
            container.removeChild(existingIframe);
        }

        // Insertar el iframe después del loader
        const loaderElement = container.querySelector('.loader');
        if (loaderElement) {
            loaderElement.insertAdjacentElement('afterend', iframe);
        } else {
            container.appendChild(iframe);
        }

        // Configurar el botón de play
        const playButton = container.querySelector('.video-button-control-audio');
        if (playButton) {
            // Añadir la clase personalizada
            playButton.classList.add('video-button-custom-2');

            // Asegurarnos de que el botón de play permanezca visible
            playButton.style.display = 'block';

            // Configurar el evento click para reproducir el video
            playButton.onclick = function () {
                // Habilitar temporalmente los eventos de puntero
                iframe.style.pointerEvents = 'auto';

                // Enviar comando de play al iframe
                iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');

                // Después de 1 segundo, volver a deshabilitar los eventos de puntero
                setTimeout(() => {
                    iframe.style.pointerEvents = 'none';
                }, 1000);
            };
        }
    }
});