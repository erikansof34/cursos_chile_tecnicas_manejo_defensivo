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
// Módulo para manejar la navegación móvil - Versión mejorada
const MobileSlides = (function () {
    function esDispositivoMovil() {
        return window.innerWidth <= 768;
    }

    function crearPrimerSlide() {
        $(".contentModule > div").first().remove();

        const primerSlide = $(`
            <div class="container dividerImgSeccion1 miga_titulo_curso  current" id="dividerImgSeccion1">
                <div class="row">
                    <div class="pl-seccion">
                        <div class="col-lg-8 col-md-12">
                            <h1 class="tituloseccion">1-Teoría del
                                <span class="yellow">Manejo Defensivo</span>
                            </h1>
                            <hr class="hr-50">
                        </div>
                    </div>
                </div>
            </div>
        `);

        $(".contentModule").prepend(primerSlide);

        // Determinar la imagen según el dispositivo
        const bgImage = esDispositivoMovil()
            ? 'url(../assets/img/momento1_mobile.webp)'
            : 'url(../assets/img/momento1_web.webp)';

        // Aplicar estilos directamente al contenedor, no al body
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

        const style = document.createElement('style');
        style.textContent = `
            #dividerImgSeccion1::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.582);
                z-index: 1;
            }
            #dividerImgSeccion1 > * {
                position: relative;
                z-index: 2;
            }
        `;
        document.head.appendChild(style);

        return primerSlide;
    }

    function mostrarSlide(numeroSlide) {
        try {
            // Ocultar todos los slides y quitar clases de estilo
            $(".contentModule > div").hide().removeClass('current');
            $('body').removeClass('darkStyleImgSeccion1');

            if (numeroSlide === 1) {
                const primerSlide = crearPrimerSlide();
                primerSlide.show().addClass('current');
                $("#prev").hide();
                $("#pagIndex").show();
            } else {
                const slideActual = $(".contentModule > div").eq(numeroSlide - 1);
                if (slideActual.length) {
                    slideActual.show().addClass('current');
                    $("#prev").show();
                    $("#pagIndex").hide();
                }
            }

            $('#textProg').text(numeroSlide);
            actualizarInterfazProgreso(numeroSlide);

            // Asegurar que no hay scroll no deseado
            if (esDispositivoMovil()) {
                $('html, body').scrollTop(0);
            }
        } catch (error) {
            console.error('Error al mostrar slide:', error);
        }
    }

    function actualizarInterfazProgreso(e) {
        var sliders = $(".contentModule > div").length;
        $('#nSlider1').html(sliders);
        var progressBar = Math.round((e / sliders) * 100);
        $(".progBar > div").css("width", progressBar + "%");
        $('#porcentajeProgreso').text(progressBar);
    }

    function init() {
        if (!esDispositivoMovil()) return;

        // Configuración inicial para móvil
        $('body').addClass('mobile-view');
        mostrarSlide(1);

        $(window).on('resize', function () {
            if (!esDispositivoMovil()) return;
            const currentSlide = parseInt($('#textProg').text());
            mostrarSlide(currentSlide); // Forzar redibujado
        });

        // Eventos de navegación
        $("#next").off('click').on('click', function () {
            if (!esDispositivoMovil()) return;
            const slideActual = parseInt($('#textProg').text());
            const totalSlides = $(".contentModule > div").length;

            if (slideActual === totalSlides) {
                const path = location.pathname.split("/").slice(0, -1).join("/");
                window.location.href = path.replace("leccion1", "leccion1") + "/resumen_leccion1.html";
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
                window.location.href = path.replace("leccion1", "inicio") + "/inicio.html";
            }
        });
    }

    return {
        init: init
    };
})();

// Inicializar cuando el documento esté listo
$(document).ready(function () {
    MobileSlides.init();

    // Asegurar que el body tenga la clase mobile-view solo en móvil
    if (window.innerWidth <= 768) {
        $('body').addClass('mobile-view');
    }

    // Manejar el breadcrumb
    var breadcrumbMap = {
        'miga_titulo_curso': 'Lección 1 > Teoría del Manejo Defensivo',
    };

    $('#breadcrumb').html(
        $('.current').filter(function () {
            return Array.from(this.classList).find(className => className.startsWith('miga'));
        }).map(function () {
            return breadcrumbMap[Array.from(this.classList).find(className => className.startsWith('miga'))] || '';
        }).get().join('')
    );
});


var iframeConfig = {
    "Slide2L1Web": {
        src: "https://iframe.mediadelivery.net/embed/450631/24821a5f-efa6-4786-8f66-b8a6ec872b61?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
        className: "iframe-web",
        style: "width: 40vw; height: 55vh;"
    },

    "Slide2L1Mobile": {
        src: "https://iframe.mediadelivery.net/embed/450631/24821a5f-efa6-4786-8f66-b8a6ec872b61?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
        className: "iframe-mobile",
        style: "width: 80vw; height: 70vh;"
    },
    "Slide4L1Web": {
        src: "https://iframe.mediadelivery.net/embed/450631/198d8d1c-cbcf-483f-a030-cd94e9893671?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
        className: "iframe-web",
        style: "width: 20vw; height: 70vh;"
    },

    "Slide4L1Mobile": {
        src: "https://iframe.mediadelivery.net/embed/450631/198d8d1c-cbcf-483f-a030-cd94e9893671?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
        className: "iframe-mobile",
        style: "width: 80vw; height: 70vh;"
    },
    "Slide5L1Web": {
        src: "https://iframe.mediadelivery.net/embed/450631/3415c5f2-0b27-4f7a-98a1-b589dbc549c4?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
        className: "iframe-web",
        style: "width: 20vw; height: 70vh;"
    },

    "Slide5L1Mobile": {
        src: "https://iframe.mediadelivery.net/embed/450631/3415c5f2-0b27-4f7a-98a1-b589dbc549c4?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
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
    reloadIframe("Slide2L1Web");
    reloadIframe("Slide2L1Mobile");
    reloadIframe("Slide4L1Web");
    reloadIframe("Slide4L1Mobile");
    reloadIframe("Slide5L1Web");
    reloadIframe("Slide5L1Mobile");

});

$("#next").on('click', function () {
    console.log("2");
    reloadIframe("Slide2L1Web");
    reloadIframe("Slide2L1Mobile");
    reloadIframe("Slide4L1Web");
    reloadIframe("Slide4L1Mobile");
    reloadIframe("Slide5L1Web");
    reloadIframe("Slide5L1Mobile");
});

createCirclesMovil();
aniSl19(1);

$(document).ready(function () {
    // Inicializar la interfaz con el progreso actual
    const slideActual = parseInt($('#textProg').text()) || 1;
    actualizarInterfazProgreso(slideActual);
});

function aniSl19(e) {
    $(document).ready(function () {
        // Número de sliders
        var sliders = $(".contentModule > div").length;
        $('#nSlider1').html(sliders);

        // Actualizar la interfaz con el progreso
        actualizarInterfazProgreso(e); // Donde 'e' es el número de slide actual

        // Manejo de la navegación
        // function manejarNavegacion(e) {
        if (e === 1) {
            $("#prev").hide();
            $("#pagIndex").show().off('click').on('click', function () {
                // Redirecciona solo si el usuario está ya en el slide 1 y presiona este botón
                const path = location.pathname.split("/").slice(0, -1).join("/");
                window.location.href = path.replace("leccion1", "inicio") + "/inicio.html";
            });
        } else {
            $("#prev").show();
            $("#pagIndex").hide();
        }

        if (e === 2) {
            $('body').removeClass('darkStyleImgSeccion1');
            $("#pagIndex").css('display', 'none');
            $("#next-btn").off('click').on('click', function () {
                $("#next").click();
            });
        }

        // Nueva condición para redirigir al resumen si e es 8
        if (e === 7) {
            const path = location.pathname.split("/").slice(0, -1).join("/");
            window.location.href = path.replace("leccion1", "leccion1") + "/resumen_leccion1.html";
            return; // Salir de la función para evitar más lógica
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
        // }

        // Evento para el botón "next"
        $("#next").on('click', function (event) {
            // Verificamos si estamos en el último slide
            if ($(this).attr('data-last-slide') === 'true') {
                event.preventDefault();
                const path = location.pathname.split("/").slice(0, -1).join("/");
                window.location.href = path.replace("leccion1", "leccion1") + "/resumen_leccion1.html";
            }
            // else {
            //     // Aquí puedes agregar la lógica para avanzar al siguiente slide
            //     avanzarAlSiguienteSlide();
            // }
        });

        // Llamar a la función de manejo de navegación al cargar la página
        // manejarNavegacion(e);
    });

    // Función para avanzar al siguiente slide
    function avanzarAlSiguienteSlide() {
        var currentSlide = $(".contentModule > div:visible");
        var nextSlide = currentSlide.next();

        if (nextSlide.length) {
            currentSlide.hide();
            nextSlide.show();
            var newSlideNum = nextSlide.index() + 1;
            $('#textProg').text(newSlideNum);
            manejarNavegacion(newSlideNum);
            actualizarInterfazProgreso(newSlideNum);
        }
    }

    var breadcrumbMap = {
        'miga_titulo_curso': 'Lección 1 > Teoría del Manejo Defensivo',
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
}

// cambiar fondo secion 4
if ($('.current').hasClass('dividerImgSeccion4')) {
    $('body').addClass('darkStyleImgSeccion4');
} else {
    $('body').removeClass('darkStyleImgSeccion4');
}