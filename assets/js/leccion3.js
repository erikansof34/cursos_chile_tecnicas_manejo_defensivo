
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
                <div class="container dividerImgSeccion3 miga_titulo_curso" id="dividerImgSeccion3">
                    <div class="row">
                        <div class="pl-seccion">
                            <div class="col-lg-8 col-md-12">
                                <h1 class="tituloseccion">3-Factores para evitar
                                    <span class="yellow">Accidentes</span>
                                    <span class="yellow">de Tránsito</span>
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
            'background': bgImage + 'no-repeat center center',
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
                #dividerImgSeccion3::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.582);
                    z-index: 1;
                }
                
                #dividerImgSeccion3 > * {
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
                window.location.href = path.replace("leccion3", "leccion3") + "/resumen_leccion3.html";
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
                window.location.href = path.replace("leccion3", "leccion2") + "/evaluacion_leccion2.html";
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
    // window.location.href = 'quiz.html';
    // window.location.href = "quiz.php?course_code=<?= $course_code; ?>";

});

var iframeConfig = {
    "Slide3L3Web": {
        src: "https://iframe.mediadelivery.net/embed/450631/0fef6c4b-ae8b-4052-abc9-86be5b38c229?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
        className: "iframe-web",
        style: "width: 20vw; height: 70vh;"
    },

    "Slide3L3Mobile": {
        src: "https://iframe.mediadelivery.net/embed/450631/0fef6c4b-ae8b-4052-abc9-86be5b38c229?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
        className: "iframe-mobile",
        style: "width: 80vw; height: 70vh;"
    },
    "Slide7L3Web": {
        src: "https://iframe.mediadelivery.net/embed/450631/c26f352e-961c-4ca4-b1c7-82f8bfb00e88?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
        className: "iframe-web",
        style: "width: 40vw; height: 55vh;"
    },

    "Slide7L3Mobile": {
        src: "https://iframe.mediadelivery.net/embed/450631/c26f352e-961c-4ca4-b1c7-82f8bfb00e88?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
        className: "iframe-mobile",
        style: "width: 80vw; height: 30vh;"
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
    reloadIframe("Slide3L3Web");
    reloadIframe("Slide3L3Mobile");
    reloadIframe("Slide7L3Web");
    reloadIframe("Slide7L3Mobile");
});

$("#next").on('click', function () {
    console.log("2");
    reloadIframe("Slide3L3Web");
    reloadIframe("Slide3L3Mobile");
    reloadIframe("Slide7L3Web");
    reloadIframe("Slide7L3Mobile");
});

createCirclesMovil();
aniSl19(1);
$(document).ready(function () {
    // Inicializar la interfaz con el progreso actual
    const slideActual = parseInt($('#textProg').text()) || 1;
    actualizarInterfazProgreso(slideActual);

    // Actualizar el progreso cuando se navega entre slides
    // Esto depende de cómo manejas la navegación entre slides
    // Si usas una función como progCircle, modifícala para llamar a actualizarInterfazProgreso
});
function aniSl19(e) {
    var sliders = $(".contentModule > div").length;
    $('#nSlider3').html(sliders);
    // Actualizar la interfaz con el progreso
    actualizarInterfazProgreso(e); // Donde 'e' es el número de slide actual
    if (e === 1) {
        $("#prev").css('display', 'none');
        $("#pagIndex").css('display', 'inline-block');
        $("#pagIndex").off('click').on('click', function () {
            const path = location.pathname.split("/").slice(0, -1).join("/");
            window.location.href = path.replace("leccion3", "leccion2") + "/evaluacion_leccion2.html";
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
                const path = location.pathname.split("/").slice(0, -1).join("/");
                window.location.href = path.replace("leccion3", "leccion3") + "/resumen_leccion3.html";
            }
            // Si no estamos en el último slide, el comportamiento predeterminado
            // de navegación al siguiente slide ocurrirá normalmente
        });
    });

    var breadcrumbMap = {
        'miga_titulo_curso': 'Lección 3 > Factores para evitar Accidentes de Tránsito',
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

$(document).ready(function () {
    const $temperature = $('#temperature');
    const $tempRange = $('input[type="range"]');

    // Función para actualizar la temperatura
    function updateTemperature(value) {
        // Calcular el porcentaje (de 0 a 100)
        const percentage = value;

        // Actualizar la altura y el valor
        $temperature.css('height', `${percentage}%`);
        $temperature.attr('data-value', `${value}°C`);

        // Cambiar el color del termómetro según la temperatura
        if (value <= 30) {
            $temperature.css('background', 'linear-gradient(to top, blue, lightblue)');
        } else if (value <= 70) {
            $temperature.css('background', 'linear-gradient(to top, green, yellow)');
        } else {
            $temperature.css('background', 'linear-gradient(to top, orange, red)');
        }
    }

    // Reconfigurar el rango del slider para que funcione entre 0 y 100
    $tempRange.attr('min', 0);
    $tempRange.attr('max', 100);
    $tempRange.val(0); // Inicia en 0

    // Evento para el slider
    $tempRange.on('input', function () {
        const value = $(this).val();
        updateTemperature(value);
    });

    // Inicializar con el valor actual
    updateTemperature($tempRange.val());
});

