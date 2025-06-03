
document.addEventListener('DOMContentLoaded', function () {
  const iframes = document.querySelectorAll('.iframe-container iframe');
  const loaders = document.querySelectorAll('.loader');

  iframes.forEach((iframe, index) => {
    iframe.addEventListener('load', function () {
      loaders[index].style.display = 'none';
      iframe.style.opacity = '1';
    });

    iframe.style.opacity = '0';
    iframe.style.transition = 'opacity 0.5s';
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const slideConfigs = {
    'slide6': {
      buttonId: 'liveBoxSlide6',
      title: 'Selecciona las cuatro imágenes correctas ',
      titleMobile: 'Selecciona las cuatro imágenes correctas ',
      mobileSrc: "../assets/actividades/actividad_pregunta1alturas/index.html",
      desktopSrc: "../assets/actividades/actividad_pregunta1alturas/index.html",
      mobileHeight: '69vh',
      desktopHeight: '76vh',
      modalSize: "small"
    },
    'slide11': {
      buttonId: 'liveBoxSlide11',
      title: 'Selecciona Verdadero o Falso segun corresponda el caso',
      titleMobile: 'Selecciona Verdadero o Falso segun corresponda el caso',
      mobileSrc: '../assets/actividades/actividad_selectvorf/index.html',
      desktopSrc: '../assets/actividades/actividad_selectvorf/index.html',
      mobileHeight: '69vh',
      desktopHeight: '76vh',
      modalSize: "small"
    },
    'slide14': {
      buttonId: 'liveBoxSlide14',
      title: 'Selecciona la respuesta correcta para cada factor',
      titleMobile: 'Selecciona la respuesta correcta para cada factor',
      mobileSrc: '../assets/actividades/actividad_seleccionimagenesalturas/index.html',
      desktopSrc: '../assets/actividades/actividad_seleccionimagenesalturas/index.html',
      mobileHeight: '69vh',
      desktopHeight: '76vh',
      modalSize: "large"
    },
    'slide16': {
      buttonId: 'liveBoxSlide16',
      title: 'Relaciona los tipos de señales de tránsito con el formato que le corresponde:',
      titleMobile: 'Relaciona los tipos de señales de tránsito con el formato que le corresponde:',
      mobileSrc: '../assets/actividades/draganddropslide9movil/index.html',
      desktopSrc: '../assets/actividades/actividad_draganddropslide9/index.html',
      mobileHeight: '69vh',
      desktopHeight: '76vh',
      modalSize: "large"
    },
    'slide17': {
      buttonId: 'liveBoxSlide17',
      title: 'Arrastra los elementos para ordenarlos de acuerdo con la prelación de las señales de tránsito:',
      titleMobile: 'Selecciona los elementos para ordenarlos de acuerdo con la prelación de las señales de tránsito:',
      mobileSrc: '../assets/actividades/actividaddraganddropslide9/index.html',
      desktopSrc: '../assets/actividades/actividaddraganddropslide9/index.html',
      mobileHeight: '69vh',
      desktopHeight: '76vh',
      modalSize: "small"
    },
  };

  function isMobile() {
    return (
      window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }

  function createModal(slideId) {
    const config = slideConfigs[slideId];
    const modalContainer = document.getElementById(
      `modalContainer${slideId.charAt(0).toUpperCase() + slideId.slice(1)}`
    );
    const modal = document.createElement("div");
    modal.className = `modal-common modal-${config.modalSize}`; // Add modal size class
    modal.innerHTML = `
      <div class="modal-content-common">
        <div class="modal-content-header">
          <div class="modal-title">
            <h2></h2>
          </div>
          <span class="close">&times;</span>
        </div>
        <div class="modal-body">
          <div class="loader">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
            <div class="bar4"></div>
            <div class="bar5"></div>
            <div class="bar6"></div>
            <div class="bar7"></div>
            <div class="bar8"></div>
            <div class="bar9"></div>
            <div class="bar10"></div>
            <div class="bar11"></div>
            <div class="bar12"></div>
          </div>
          <div class="iframe-container"></div>
        </div>
      </div>
    `;
    modalContainer.appendChild(modal);
    return modal;
  }

  function openModal(slideId) {
    const config = slideConfigs[slideId];
    if (!config) return;

    const modal = createModal(slideId);
    const closeBtn = modal.querySelector(".close");
    const title = modal.querySelector(".modal-title h2");
    const loader = modal.querySelector(".loader");
    const iframeContainer = modal.querySelector(".iframe-container");

    title.textContent =
      isMobile() && config.titleMobile ? config.titleMobile : config.title;
    modal.style.display = "block";
    modal.classList.add("fade-in");

    const iframe = document.createElement("iframe");
    iframe.src = isMobile() ? config.mobileSrc : config.desktopSrc;
    iframe.style.width = "100%";
    iframe.style.height = isMobile()
      ? config.mobileHeight
      : config.desktopHeight;
    iframe.style.border = "none";
    iframe.style.display = "none";

    iframe.onload = () => {
      loader.style.display = "none";
      iframe.style.display = "block";
    };

    iframe.onerror = () => {
      loader.style.display = "none";
      iframeContainer.innerHTML =
        "<p>Error al cargar el contenido. Por favor, intente nuevamente.</p>";
    };

    setTimeout(() => {
      if (loader.style.display !== "none") {
        loader.style.display = "none";
        iframeContainer.innerHTML =
          "<p>El contenido está tardando demasiado en cargar. Por favor, verifique la conexión.</p>";
      }
    }, 10000);

    iframeContainer.appendChild(iframe);

    closeBtn.onclick = () => {
      closeModal(modal);
    };

    window.onclick = (event) => {
      if (event.target == modal) {
        closeModal(modal);
      }
    };
  }

  function closeModal(modal) {
    modal.classList.remove("fade-in");
    modal.classList.add("fade-out");
    setTimeout(() => {
      modal.remove();
    }, 300);
  }

  Object.keys(slideConfigs).forEach((slideId) => {
    const button = document.getElementById(slideConfigs[slideId].buttonId);
    if (button) {
      button.addEventListener("click", () => openModal(slideId));
    }
  });

  window.addEventListener("resize", () => {
    Object.keys(slideConfigs).forEach((slideId) => {
      const modalContainer = document.getElementById(
        `modalContainer${slideId.charAt(0).toUpperCase() + slideId.slice(1)}`
      );
      const modal = modalContainer.querySelector(".modal-common");
      if (modal) {
        const iframe = modal.querySelector("iframe");
        if (iframe) {
          const config = slideConfigs[slideId];
          iframe.src = isMobile() ? config.mobileSrc : config.desktopSrc;
          iframe.style.height = isMobile()
            ? config.mobileHeight
            : config.desktopHeight;
        }
      }
    });
  });
});

//Slider17
//audios
const audios = document.querySelectorAll('.audio-control');
audios.forEach(audio => {
  audio.addEventListener('play', () => {
    audios.forEach(otherAudio => {
      if (otherAudio !== audio) {
        otherAudio.pause();
      }
    });
  });
});

// $(document).ready(function () {

//   $('.zoom').magnify();
//   //TRACKING
//   $("#actividad_1").on({
//     play:function(){
//       trackingManager.startTracking("actividad_1");
//       trackingManager.stopTracking("actividad_1");
//     }
//   });
//   $("#tab_2").on({
//     play:function(){
//       trackingManager.startTracking("tab_2");
//       trackingManager.stopTracking("tab_2");
//     }
//   });
//   $("#actividad_3").on({
//     play:function(){
//       trackingManager.startTracking("actividad_3");
//       trackingManager.stopTracking("actividad_3");
//     }
//   });

//   $("#preguntas_01").on({
//     play:function(){
//       trackingManager.startTracking("preguntas_01");
//       trackingManager.stopTracking("preguntas_01");
//     }
//   });
//   $("#audio_politicas").on({
//     play:function(){
//       trackingManager.startTracking("audio_politicas");
//       trackingManager.stopTracking("audio_politicas");
//     }
//   });
//   $("#actividad_6").on({
//     play:function(){
//       trackingManager.startTracking("actividad_6");
//       trackingManager.stopTracking("actividad_6");
//     }
//   });
//   $("#actividad_7").on({
//     play:function(){
//       trackingManager.startTracking("actividad_7");
//       trackingManager.stopTracking("actividad_7");
//     }
//   });
//   $("#actividad_8").on({
//     play:function(){
//       trackingManager.startTracking("actividad_8");
//       trackingManager.stopTracking("actividad_8");
//     }
//   });
//   $("#actividad_9").on({
//     play:function(){
//       trackingManager.startTracking("actividad_9");
//       trackingManager.stopTracking("actividad_9");
//     }
//   });
//   $("#actividad_10").on({
//     play:function(){
//       trackingManager.startTracking("actividad_10");
//       trackingManager.stopTracking("actividad_10");
//     }
//   });
//    $("#actividad_11").on({
//     play:function(){
//       trackingManager.startTracking("actividad_11");
//       trackingManager.stopTracking("actividad_11");
//     }
//   });
//   $("#preguntas_02").on({
//     play:function(){
//       trackingManager.startTracking("preguntas_02");
//       trackingManager.stopTracking("preguntas_02");
//     }
//   });
//   $("#actividad_13").on({
//     play:function(){
//       trackingManager.startTracking("actividad_13");
//       trackingManager.stopTracking("actividad_13");
//     }
//   });
//   $("#ceo").on({
//     play:function(){
//       trackingManager.startTracking("ceo");
//       trackingManager.stopTracking("ceo");
//     }
//   });
//   $("#actividad_15").on({
//     play:function(){
//       trackingManager.startTracking("actividad_15");
//       trackingManager.stopTracking("actividad_15");
//     }
//   });

//   $("#actividad_16").on({
//     play:function(){
//       trackingManager.startTracking("actividad_16");
//       trackingManager.stopTracking("actividad_16");
//     }
//   });

//   $("#actividad_17").on({
//     play:function(){
//       trackingManager.startTracking("actividad_17");
//       trackingManager.stopTracking("actividad_17");
//     }
//   });
//   $("#actividad_18").on({
//     play:function(){
//       trackingManager.startTracking("actividad_18");
//       trackingManager.stopTracking("actividad_18");
//     }
//   });
//   $("#actividad_19").on({
//     play:function(){
//       trackingManager.startTracking("actividad_19");
//       trackingManager.stopTracking("actividad_19");
//     }
//   });
//   $("#actividad_20").on({
//     play:function(){
//       trackingManager.startTracking("actividad_20");
//       trackingManager.stopTracking("actividad_20");
//     }
//   });
//   $("#btn-etiqueta-1").on("click", function() {
//     trackingManager.startTracking("btn-etiqueta-1");
//     trackingManager.stopTracking("btn-etiqueta-1");
//   });

//   $("#llamada-incorrecta").on({
//     play:function(){
//       trackingManager.startTracking("llamada-incorrecta");
//       trackingManager.stopTracking("llamada-incorrecta");
//     }
//   });



//   $('.programas .nav-link').click(function() {
//     // Pause all audio
//     $(this).closest('.d-flex').find('audio').each(function() {
//       this.pause();
//     });
//     var targetId = $(this).attr('data-bs-target');
//     $(targetId).find('audio').get(0).play();
//   });

//   $('#carouselExampleCaptions').carousel({
//     interval: false // Desactiva el cambio automático de diapositivas
//   });

//   // Comportamiento de acordeón en dispositivos móviles
//   $(".accordion-label").click(function () {
//     $(this).siblings(".accordion-content").slideToggle();
//   });

//   setTimeout(() => {
//     $(".actVorF .tol").html($(".itemQ").length);
//   }, "2000");

//   $("#drop1, #drop2, #drop3, #drop4, #drop5, #drop6").on("droppable:drop",
//     function (e) {
//       $(this).addClass("corret");
//       actualizarProgreso(); // Llama a la función para actualizar el progreso
//     }
//   );

//   $("#grupo_whatsapp").click(function () {
//     window.open('https://chat.whatsapp.com/G91Vr9cBLlwAWaXGmS1cB9','_blank');
//   });


//   var selects = document.querySelectorAll('.select-opcion');

//   // Itera sobre cada select y agrega un evento de cambio
//   selects.forEach(function(select) {
//       select.addEventListener('change', function() {
//           // Obtén el valor y la imagen asociada de la opción seleccionada
//           var selectedValue = select.value;
//           var selectedImage = select.options[select.selectedIndex].getAttribute('data-image');

//           // Obtén la imagen dentro del div padre del select actual
//           var image = select.closest('.actividad_slide_37').querySelector('.img-estructura');

//           // Cambia la fuente de la imagen según la opción seleccionada
//           image.src = 'assets/img/' + (selectedImage);
//       });
//   });

//   // Guardar las imágenes originales de las imágenes draggables
//   $('.actividadAimg').each(function() {
//     var $listOpcDrag = $(this);
//     $listOpcDrag.data('originalImages', $listOpcDrag.children().clone());
//   });

//   // Guardar las imágenes originales de las imágenes droppable
//   $('.actividadBimg').each(function() {
//       var $listOpcDrop = $(this);
//       $listOpcDrop.data('originalImages', $listOpcDrop.children().clone());
//   });



//   //Actualizar el progreso del curso cada vez que se avanza en los slides
//   $("#next").on('click', function() {
//     updateProgress();
//   });
//   // preguntas01();
//   // preguntas02();
//   audiosCarrusel();
//   // firma();
//   arrastrarElemento();
//   arrastrarElemento2();
//   arrastrarElemento3();
//   listaLlamadaIncorrecta();
//   listaLlamadaCorrecta();
//   // actualizarGrafico();
//   // actualizarGrafico2();
//   pausarMultimedia();
//   reproducirAudioImagen();

//   dragablePuzzle();

// });

function firma() {
  var canvas = document.getElementById("firmaCanvas");
  var signaturePad = new SignaturePad(canvas);

  // Para borrar la firma
  $("#borrarFirmaBtn").on("click", function () {
    signaturePad.clear();
  });

}

function audiosCarrusel() {
  var audioCarrusel = $(".audioCarrusel");

  $("#carouselExampleCaptions").on("slid.bs.carousel", function () {
    // Detener la reproducción de todos los audios
    audioCarrusel.each(function () {
      this.pause();
    });

    // Obtener el índice del slide activo
    var activeSlideIndex = $(this).find(".carousel-item.active").index();

    // Reproducir el audio del slide activo
    audioCarrusel.eq(activeSlideIndex).get(0).play();
  });

  // Al hacer clic en las flechas de navegación, pausar/reproducir el audio correspondiente
  $("#prev_carrusel_ibds, #next_carrusel_ibds").on("click", function () {
    // Detener la reproducción de todos los audios
    audioCarrusel.each(function () {
      this.pause();
    });

    // Obtener el índice del slide activo
    var activeSlideIndex = $("#carouselExampleCaptions").find(".carousel-item.active").index();

    // Reproducir el audio del slide activo
    audioCarrusel.eq(activeSlideIndex).get(0).play();
  });
}

$("#video_slide_09").on({
  play: function () {
    trackingManager.startTracking("video_slide_09");
    trackingManager.stopTracking("video_slide_09");
  }
});


let currentAudio = null;

function playAudio(audioId) {
  const audioElement = document.getElementById(audioId);

  if (currentAudio && currentAudio !== audioElement) {
    currentAudio.pause();
  }
  audioElement.play();
  currentAudio = audioElement;
}


function reproducirAudioImagen() {
  var audioActual = null;
  let rutaActual = '';
  var elementosInline = document.querySelectorAll('.inline');

  elementosInline.forEach(function (elemento) {
    elemento.addEventListener('click', function () {

      let rutaAudio = elemento.getAttribute('data-audio');

      if (audioActual !== null) {
        audioActual.pause();
      }

      let nuevoAudio = new Audio(rutaAudio);

      if (rutaAudio === rutaActual) {
        nuevoAudio.pause();
      } else {
        nuevoAudio.play();
        audioActual = nuevoAudio;
        rutaActual = rutaAudio;
      }

      $("#prev, #next").on("click", function () {
        nuevoAudio.pause();
      });

    });
  });
}

//Para generar el TOOLTIP para riesgos
$(function () {
  for (var count = 1; count <= 9; count++) {
    $('#boton-riesgos-' + count).each(function () {
      var descripcion;
      switch ($(this).attr('value')) {
        case '1':
          descripcion = 'Ruido, iluminación, Vibración, Temperaturas extremas (Frio y calor).';
          break;
        case '2':
          descripcion = 'Elementos o partes de maquinaria, herramientas, equipos.';
          break;
        case '3':
          descripcion = 'Polvos, Líquidos, Gases y vapores, material particulado.';
          break;
        case '4':
          descripcion = 'Alta y baja tensión.';
          break;
        case '5':
          descripcion = 'Posturas prolongadas, esfuerzo, movimiento repetitivo.';
          break;
        case '6':
          descripcion = 'Virus, Bacterias, Hongos, Picaduras, Mordeduras.';
          break;
        case '7':
          descripcion = 'Pendiente';
          break;
        case '8':
          descripcion = 'Estilo de mando, Pago, carga mental, rotación, horas extras.';
          break;
        case '9':
          descripcion = 'Sismo, terremoto, inundación, Derrumbes.';
          break;
      }
      $(this).attr('title', descripcion).tooltip({
        html: true,
        track: true
      });
    });
  }
});


function preguntas01() {
  var video = document.getElementById('preguntas_01');
  var actividad_h_01 = $('#actividad_h_01');

  video.addEventListener("timeupdate", function () {
    var currentTime = video.currentTime;
    console.log(currentTime);
    if (currentTime >= 104) {
      // $('.custom-split-div').hide();
      actividad_h_01.css('display', 'block');
    }

    video.addEventListener("seeked", function () {
      var currentTime = video.currentTime;
      if (currentTime >= 160) {
        // $('.custom-split-div').hide();
        actividad_h_01.css('display', 'block');
      }

    });

  });
}

var results = [];
var elements = [];

function Questions(el, e) {
  var index = elements.indexOf(el);

  if (index === -1) {
    elements.push(el);
    results.push(e);
    $(el).addClass('act');
  } else {
    results.splice(index, 1);
    elements.splice(index, 1);
    $(el).removeClass('act');
  }


}

function valid(numCorrect) {
  var correctCount = 0;

  // Verificar si se seleccionaron más de 2 respuestas
  if (elements.length > 2) {
    $('#respuesta_mal').html('Solo puede seleccionar 2 respuestas.');
    $('#respuesta_mal').show();
    return;
  }

  for (var i = 0; i < elements.length; i++) {
    if (results[i]) {
      $(elements[i]).addClass('true');
      correctCount++;
    } else {
      $(elements[i]).addClass('false');
    }
  }

  if (correctCount == numCorrect) {
    $('#respuesta').html('Respuesta correcta');
    $('#respuesta').show();
  } else {
    $('#respuesta_mal').html('Respuesta incorrecta');
    $('#respuesta_mal').show();
  }

  // Mostrar el botón de reiniciar después de la validación
  $('#btn-valid').hide();
  $('#reiniciar').show();
}

function reiniciarActividadold() {
  // Reiniciar variables y estilos
  results = [];
  elements = [];

  $('.act').removeClass('act');
  $('.true').removeClass('true');
  $('.false').removeClass('false');

  // Ocultar mensajes y botones
  $('#respuesta').hide();
  $('#respuesta_mal').hide();
  $('#reiniciar').hide();
  $('#btn-valid').show();
}





//PREGUNTAS 02
function preguntas02() {
  var video = document.getElementById('preguntas_02');
  var actividad_h_02 = $('#actividad_h_02');

  video.addEventListener("timeupdate", function () {
    var currentTime = video.currentTime;
    console.log(currentTime);
    if (currentTime >= (video.duration - 15)) { // 15 segundos antes de que termine el video
      actividad_h_02.css('display', 'block');
    }
  });

  video.addEventListener("seeked", function () {
    var currentTime = video.currentTime;
    if (currentTime >= (video.duration - 15)) {
      actividad_h_02.css('display', 'block');
    }
  });
}

var results2 = [];
var elements2 = [];

function Questions2(el, e) {
  var index = elements2.indexOf(el);

  if (index === -1) {
    elements2.push(el);
    results2.push(e);
    $(el).addClass('act');
  } else {
    results2.splice(index, 1);
    elements2.splice(index, 1);
    $(el).removeClass('act');
  }
}

function valid2(numCorrect2) {
  var correctCount2 = 0;

  // Verificar si se seleccionaron más de 2 respuestas
  if (elements2.length > 2) {
    $('#respuesta_mal2').html('Solo puede seleccionar 2 respuestas.');
    $('#respuesta_mal2').show();
    return;
  }

  for (var i = 0; i < elements2.length; i++) {
    if (results2[i]) {
      $(elements2[i]).addClass('true');
      correctCount2++;
    } else {
      $(elements2[i]).addClass('false');
    }
  }

  if (correctCount2 == numCorrect2) {
    $('#respuesta2').html('Respuesta correcta');
    $('#respuesta2').show();
  } else {
    $('#respuesta_mal2').html('Respuesta incorrecta');
    $('#respuesta_mal2').show();
  }

  // Mostrar el botón de reiniciar después de la validación
  $('#btn-valid2').hide();
  $('#reiniciar2').show();
}

function reiniciarActividad2() {
  // Reiniciar variables y estilos
  results2 = [];
  elements2 = [];

  $('.act').removeClass('act');
  $('.true').removeClass('true');
  $('.false').removeClass('false');

  // Ocultar mensajes y botones
  $('#respuesta2').hide();
  $('#respuesta_mal2').hide();
  $('#reiniciar2').hide();
  $('#btn-valid2').show();
}


function listaLlamadaIncorrecta() {
  let incorrect = document.getElementById("llamada-incorrecta");
  let listItems = document.querySelectorAll(".custom-list-incorrect li");

  let selectedLi = null;

  function clickli(event) {
    const selectedIndex = Array.from(listItems).indexOf(event.currentTarget);

    const existingIcon = event.currentTarget.querySelector(".fa");
    const existingBadge = event.currentTarget.querySelector(".badge");

    if (existingIcon) {
      event.currentTarget.removeChild(existingIcon);
    }
    if (existingBadge) {
      event.currentTarget.removeChild(existingBadge);
    }

    if (selectedIndex === 0 || selectedIndex === 2) {
      // event.currentTarget.classList.add("active");
      // event.currentTarget.style.backgroundColor = "#89cf89";
      const checkIcon = document.createElement("i");
      checkIcon.className = "fa fa-check";
      checkIcon.style.color = "#009200";
      checkIcon.setAttribute("aria-hidden", "true");
      event.currentTarget.insertBefore(
        checkIcon,
        event.currentTarget.firstChild
      );
    } else {
      // event.currentTarget.classList.add("desactive");
      // event.currentTarget.style.backgroundColor = "#db8a8a";
      const checkIcon = document.createElement("i");
      checkIcon.className = "fa fa-question";
      checkIcon.style.color = "#df2828";
      checkIcon.setAttribute("aria-hidden", "true");
      event.currentTarget.insertBefore(
        checkIcon,
        event.currentTarget.firstChild
      );
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.innerText = "Faltante";
      badge.style.backgroundColor = "#EF455F";
      badge.style.borderRadius = "9px";
      badge.style.padding = "6px";
      badge.style.margin = "6px";
      event.currentTarget.appendChild(badge);
    }

    selectedLi = selectedIndex;
  }

  incorrect.addEventListener("play", function () {
    textoIncorrecto = $("#textoIncorrecto");
    textoIncorrecto.css("display", "block");
    listItems.forEach((item, index) => {
      item.style.display = "block";
      item.addEventListener("click", clickli);
    });
  });
}

function listaLlamadaCorrecta() {
  const correct = document.getElementById("llamada-correcta");
  const listItems = document.querySelectorAll(".custom-list-correct li");

  const cues = [
    { time: 0, index: 0 },
    { time: 8, index: 1 },
    { time: 12, index: 2 },
    { time: 20, index: 3 },
    { time: 25, index: 4 },
    { time: 30, index: 5 },
    { time: 35, index: 6 },
    { time: 39, index: 7 },
  ];

  const executedCues = {};

  correct.addEventListener("timeupdate", function () {
    const currentTime = Math.floor(correct.currentTime);
    cues.forEach((cue) => {
      if (currentTime === cue.time && !executedCues[cue.index]) {
        listItems[cue.index].style.display = "block";
        listItems[cue.index].classList.add("active");
        const checkIcon = document.createElement("i");
        checkIcon.className = "fa fa-check";
        checkIcon.style.color = "#009200";
        checkIcon.setAttribute("aria-hidden", "true");
        listItems[cue.index].insertBefore(
          checkIcon,
          listItems[cue.index].firstChild
        );
        executedCues[cue.index] = true;
      }
    });
  });
}

function updateProgress() {
  let code_course = $('#course_code').val();
  let module_id = $('#module_id').val();
  $.ajax({
    type: "POST",
    url: "../../../functions_helpers.php?progress_courses",
    dataType: "json",
    data:
    {
      code_course: code_course,
      module_id: module_id
    },
    success: function (result) {
      let courseProgress = result.course_progress;

      if (courseProgress === null || courseProgress === undefined) {
        $('#course-progress').html('<strong>0.0%</strong>');
      } else {
        $('#course-progress').html('<strong>' + courseProgress + '%</strong>');
      }
    }
  });
}

function reproducirAudioImagen() {
  var audioActual = null;
  let rutaActual = '';
  var elementosInline = document.querySelectorAll('.inline-3');

  elementosInline.forEach(function (elemento) {
    elemento.addEventListener('click', function () {

      let rutaAudio = elemento.getAttribute('data-audio');

      if (audioActual !== null) {
        audioActual.pause();
      }

      let nuevoAudio = new Audio(rutaAudio);

      if (rutaAudio === rutaActual) {
        nuevoAudio.pause();
      } else {
        nuevoAudio.play();
        audioActual = nuevoAudio;
        rutaActual = rutaAudio;
      }

      $("#prev, #next").on("click", function () {
        nuevoAudio.pause();
      });

    });
  });
}

// let cont;
// let video_slide_14 = document.getElementById("slide_14_actividad");

// video_slide_14.ontimeupdate = function () {
//   slide_14_actividad();
// };

// function slide_14_actividad() {
//   if (cont !== parseInt(video_slide_14.currentTime)) {
//     switch (parseInt(video_slide_14.currentTime)) {
//       case 7:
//         action();
//         $(".slide_14 .ctItem01").show();
//         break;
//       case 15:
//         action();
//         $(".slide_14 .ctItem02").show();
//         break;
//       case 25:
//         action();
//         $(".slide_14 .ctItem03").show();
//         break;
//     }
//     cont = parseInt(video_slide_14.currentTime);
//   }
// }


function pausarMultimedia() {
  var allMediaElements = document.querySelectorAll("audio, video");

  allMediaElements.forEach(function (mediaElement) {
    mediaElement.addEventListener("play", function () {
      allMediaElements.forEach(function (otherMediaElement) {
        if (otherMediaElement !== mediaElement && !otherMediaElement.paused) {
          otherMediaElement.pause();
        }
      });
    });
  });

  //Funcionalidad que permite pausar los elementos multimedias que se este reproduciendo
  $("#prev, #next, button").on("click", function () {
    let allMediaElements = $("audio, video");
    // Pausar cada elemento multimedia
    allMediaElements.each(function () {
      if (!this.paused) {
        this.pause();
      }
    });
  });
}


function playVideoInterval() {
  const videoBackground = document.querySelector(".video-background");
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.loop = true;

  const sourceElement = document.createElement("source");
  sourceElement.src = "assets/video/miningprocess.mp4";
  sourceElement.type = "video/mp4";

  videoElement.appendChild(sourceElement);
  videoBackground.appendChild(videoElement);
  videoElement.play();
}

function reiniciarActividadGrafico(el) {
  corret = 0;
  completion2 = 0.0;
  actualizarGrafico2();
  $(".actFin").hide();
  $(".btn-reintentar").hide();
  $(".itemQ").removeClass("hideT view");
  $(".itemQ").removeClass("view");

  $(el).parents(".itemQ").addClass("hideT");
  $(".actVorF .inc").html(1);

  let view = ".actVorF > div:nth-child(2)";
  $(view).addClass("view");

  let imgPaths = [
    "assets/img/copasst/copasst-2.png",
    "assets/img/copasst/copasst-6.png",
    "assets/img/copasst/copasst-3.png",
    "assets/img/copasst/copasst-4.png",
    "assets/img/copasst/copasst-1.png",
    "assets/img/copasst/copasst-5.png"
  ];

  // Actualizar las imágenes una por una en el orden deseado
  $(".itemQ").each(function (index) {
    let imgID = "#img-copast-0" + (index + 1);
    $(imgID).attr("src", imgPaths[index]);
  });


}

let completion2 = 0.0;
const totalElements2 = 6; // Número total de elementos a arrastrar
const borderWidth2 = 15; // Ancho del borde

function actualizarGrafico2() {
  const canvas = document.getElementById("donutChart02");
  const context = canvas.getContext("2d");

  context.clearRect(0, 0, canvas.width, canvas.height);

  // Dibuja el círculo amarillo en el borde
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 80; // Radio del círculo
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + 2 * Math.PI;

  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.lineWidth = borderWidth2;
  context.strokeStyle = "white"; // Color del borde amarillo
  context.stroke();

  // Dibuja la parte que se va llenando en blanco
  const filledEndAngle = startAngle + 2 * Math.PI * (completion2 / 100);

  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, filledEndAngle);
  context.lineWidth = borderWidth2;
  context.strokeStyle = "yellow"; // Color de la parte llena en blanco
  context.stroke();

  // Muestra el porcentaje en el centro
  context.font = "20px Arial";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(completion2.toFixed(1) + "%", centerX, centerY);
}

// Actualiza el progreso y el gráfico cuando se realiza una acción de arrastre correcta
function actualizarProgreso2(el) {

  if (completion2 < 100) {
    completion2 += 100 / totalElements2;
    if (completion2 > 100) {
      completion2 = 100;
    }
    actualizarGrafico2();
  }
}

let corret = 0;
function actVorF(el, res) {
  $(".actVorF button").attr("disabled", "disabled");
  //mostrar respuesta
  if (res == "correct") {
    $(el).parents(".itemQ").find("img").attr("src", "assets/img/true.jpg");
    corret = corret + 1;
    actualizarProgreso2();
  } else {
    $(el).parents(".itemQ").find("img").attr("src", "assets/img/false.jpg");
  }

  setTimeout(() => {
    $(el).parents(".itemQ").addClass("hideT");
    $(".actVorF .inc").html($(".hideT").length + 1);
    //mostrar la siguiente pregunta
    $(".itemQ").removeClass("view");
    let view = ".actVorF > div:nth-child(" + ($(".hideT").length + 2) + ")";
    $(view).addClass("view");
    // mostrar resultados finales
    if ($(".itemQ").length == $(".hideT").length) {
      $(".actVorF .inc").html($(".hideT").length);
      $(".actFin").show();
      $(".btn-reintentar").show();
      $(".actFin .p-res").css("font-size", "30px");
      $(".actFin .p-res").css("text-align", "center");
      $(".actFin h1").css("text-align", "center");
      $(".actFin button").css("text-align", "center");
      $(".actFin h1").html(corret + " de " + $(".itemQ").length);
      $("#next").removeAttr("disabled").removeAttr("style");
      localStorage.setItem("slider28", "ok");
    }
    $(".actVorF button").removeAttr("disabled");
  }, "1000");
}



const titles = document.querySelectorAll(".rulest h4");
const image = document.querySelector("#img_slide12");
const audio_slide_12 = new Audio();
let currentIndex = -1;
let prev = false;

function prevSlide() {
  currentIndex = (currentIndex - 1 + titles.length) % titles.length;
  updateSlide();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % titles.length;
  updateSlide();
  prev = true;
}

function updateSlide() {
  // Remover el fondo resaltado de todos los títulos
  titles.forEach((title) => {
    title.style.backgroundColor = "transparent";
    title.style.border = "transparent";
    title.style.borderRadius = "10px";
    title.classList.remove("back-color-12-reglas-2");
    title.classList.add("back-color-12-reglas");
    title.querySelector("span").style.color = "var(--grey)";
  });

  // Resaltar el título actual
  titles[currentIndex].style.backgroundColor = "rgba(0, 122, 243, 0.20)";
  titles[currentIndex].style.backgroundColor = "var(--grey)";
  titles[currentIndex].querySelector("span").style.color = "var(--primary)";
  // console.log(titles[currentIndex]);
  titles[currentIndex].classList.remove("back-color-12-reglas");
  titles[currentIndex].classList.add("back-color-12-reglas-2");
  // Cambiar la imagen
  const newImageSrc = `assets/img/${titles[currentIndex].getAttribute("data-title").toLowerCase()}.webp`;
  image.src = newImageSrc;
  image.style.cursor = "pointer";
  // Detener la reproducción actual y reproducir el nuevo audio
  audio_slide_12.pause();
  audio_slide_12.src = `assets/audio/${titles[currentIndex].getAttribute("data-title").toLowerCase()}.mp3`;
  audio_slide_12.play();


  image.addEventListener("click", function () {
    if (audio_slide_12.paused) {
      audio_slide_12.play();
    } else {
      audio_slide_12.pause();
    }
  });

  $("#prev, #next").on("click", function () {
    audio_slide_12.pause();
  });

  //Subtitulo dinamico 
  data_title_actual = titles[currentIndex].getAttribute("data-title").toLowerCase();

  $('#p-12-reglas').hide();

  /*var sub12Reglas = {
    'slide12_01': [
      'Preséntese a su turno de trabajo en buenas condiciones físicas y mentales.',
      'Reporte si alguien no se encuentra en condiciones para trabajar.',
      'Inicie su turno con calentamiento físico.'
    ],
    'slide12_02': [
      'Diligencie el ATS (Análisis de Trabajo Seguro) previo a la realización de cada actividad.',
      'Garantice que trabajos de alto riesgo contengan el permiso de trabajo.',
      'Reporte condiciones de peligro presentes en su puesto de trabajo al supervisor.'
    ],
    'slide12_03': [
      'Solicite su dotación y EPP a tiempo y en los horarios estipulados.',
      'Use la dotación y los Elementos de Protección Personal (EPP), de acuerdo a los riesgos de la actividad a ejecutar.',
      'Conserve en buen estado la dotación y los EPP, reemplácelos cada que estén deteriorados.'
    ],
    'slide12_04': [
      'Diligencie la inspección preoperacional antes de operar cualquier vehículo, máquina, equipo o herramienta.',
      'Garantice las condiciones de aseo y limpieza en todos los lugares.',
      'Evite ingresar a zonas restringidas, selladas, abandonadas o con barreras.'
    ],
    'slide12_05': [
      'Cumpla con la condición “Metro avanzado, metro sostenido”.',
      'Ejecute el ABC Minero (ventile, riegue y desabombe).',
      'Verifique condiciones de techos y paredes antes de iniciar labores.'
    ],
  };*/

  $('.listadoreglas').empty();

  if (data_title_actual in sub12Reglas) {
    sub12Reglas[data_title_actual].forEach(regla => {
      $('.listadoreglas').append(`<li>${regla}</li>`);
    });
  }
  $('.listadoreglas').show();
}

// let completion = 0.0;
// const totalElements = 6; // Número total de elementos a arrastrar
// const borderWidth = 10; // Ancho del borde

// function actualizarGrafico() {
//   const canvas = document.getElementById("donutChart01");
//   const context = canvas.getContext("2d");

//   context.clearRect(0, 0, canvas.width, canvas.height);

//   // Dibuja el círculo amarillo en el borde
//   const centerX = canvas.width / 2;
//   const centerY = canvas.height / 2;
//   const radius = 80; // Radio del círculo
//   const startAngle = -Math.PI / 2;
//   const endAngle = startAngle + 2 * Math.PI;

//   context.beginPath();
//   context.arc(centerX, centerY, radius, startAngle, endAngle);
//   context.lineWidth = borderWidth;
//   context.strokeStyle = "white"; // Color del borde amarillo
//   context.stroke();

//   // Dibuja la parte que se va llenando en blanco
//   const filledEndAngle = startAngle + 2 * Math.PI * (completion / 100);

//   context.beginPath();
//   context.arc(centerX, centerY, radius, startAngle, filledEndAngle);
//   context.lineWidth = borderWidth;
//   context.strokeStyle = "yellow"; // Color de la parte llena en blanco
//   context.stroke();

//   // Muestra el porcentaje en el centro
//   context.font = "20px Arial";
//   context.fillStyle = "white";
//   context.textAlign = "center";
//   context.textBaseline = "middle";
//   context.fillText(completion.toFixed(1) + "%", centerX, centerY);
// }


// Actualiza el progreso y el gráfico cuando se realiza una acción de arrastre correcta
function actualizarProgreso() {
  // if (completion < 100) {
  //   completion += 100 / totalElements;
  //   if (completion > 100) {
  //     completion = 100;
  //   }
  //   actualizarGrafico();
  // }
  const completed = selectedStates.filter(state => state).length;
  completion = (completed / totalElements) * 100;
  actualizarGrafico();
}

function changeImage(element, newSrc) {
  const image = element.querySelector("img");
  image.src = newSrc;
}

function arrastrarElemento() {
  // Lógica para la actividad (SLIDE 6)
  // item 1
  $("#drag1").draggable({
    revert: "invalid",
    snap: "#drop1",
    snapMode: "corner",
    snapTolerance: "1",
  });
  $("#drop1").droppable({
    accept: "#drag1",
  })
    .on("droppable:drop", function (e) {
      $(this).addClass("correct");
      selectedStates[0] = true;
      actualizarProgreso();
    });

  // item 2
  $("#drag2").draggable({
    revert: "invalid",
    snap: "#drop2",
    snapMode: "corner",
    snapTolerance: "1",
  });
  $("#drop2")
    .droppable({
      accept: "#drag2",
    })
    .on("droppable:drop", function (e) {
      $(this).addClass("correct");
      selectedStates[1] = true;
      actualizarProgreso();
    });

  // item 3
  $("#drag3").draggable({
    revert: "invalid",
    snap: "#drop3",
    snapMode: "corner",
    snapTolerance: "1",
  });
  $("#drop3")
    .droppable({
      accept: "#drag3",
    })
    .on("droppable:drop", function (e) {
      $(this).addClass("correct");
      selectedStates[2] = true;
      actualizarProgreso();
    });

  // item 4
  $("#drag4").draggable({
    revert: "invalid",
    snap: "#drop4",
    snapMode: "corner",
    snapTolerance: "1",
  });
  $("#drop4")
    .droppable({
      accept: "#drag4",
    })
    .on("droppable:drop", function (e) {
      $(this).addClass("correct");
      selectedStates[3] = true;
      actualizarProgreso();
    });

  // item 5
  $("#drag5").draggable({
    revert: "invalid",
    snap: "#drop5",
    snapMode: "corner",
    snapTolerance: "1",
  });
  $("#drop5")
    .droppable({
      accept: "#drag5",
    })
    .on("droppable:drop", function (e) {
      $(this).addClass("correct");
      selectedStates[4] = true;
      actualizarProgreso();
    });

  // item 6
  $("#drag6").draggable({
    revert: "invalid",
    snap: "#drop6",
    snapMode: "corner",
    snapTolerance: "1",
  });
  $("#drop6")
    .droppable({
      accept: "#drag6",
    })
    .on("droppable:drop", function (e) {
      $(this).addClass("correct");
      selectedStates[5] = true;
      actualizarProgreso();
    });
}

document.addEventListener("DOMContentLoaded", function () {
  arrastrarElemento();
  // actualizarGrafico();
});



/*slide botones laterla */
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
var producto = urlParams.get('color');
$('body').removeClass().addClass(producto);


/*logica actividad arrastrar*/
$(function () {
  $("#actOrderElement").sortable();
});

function actOrderElement() {
  for (var i = 1; i <= $("#actOrderElement li").length; i++) {
    if ($("#actOrderElement li:nth-child(" + i + ")").attr("value") == i) {
      $("#actOrderElement li:nth-child(" + i + ") img").addClass("correct");
      $("#actOrderElement li:nth-child(" + i + ") .ico").attr("src", "../img/checkAct.png");
    } else {
      $("#actOrderElement li:nth-child(" + i + ") img").addClass("incorrect");
      $("#actOrderElement li:nth-child(" + i + ") .ico").attr("src", "../img/xmarkAct.png");
    }
  }
}


/*Logica de actividad si es correcto o incorrecto*/
function actSelectImg(el, data) {
  $(el).addClass(data).find('.resAct').attr('src', 'assets/img/' + data + '.png');
  var textoDinamico = $(el).attr('data-texto');
  if (data == 'checkAct') {
    $("#correctIncorrect").text("¡ES CORRECTO!.  Este es un riesgo identificado de la " + textoDinamico + " a lo que la compañía podría estar expuesta");
    $(".correctIncorrect").removeClass("incorrecto").addClass("correcto").show();
  } else {
    $("#correctIncorrect").text("¡PIENSALO BIEN! Este NO es un riesgo. " + textoDinamico + "");
    $(".correctIncorrect").removeClass("correcto").addClass("incorrecto").show();
  }
}

//Para reiniciar las actividades de tipo seleccion multiple, arrastras e imagenes verdaderas o falsas
function reiniciarActividad(actividad = '', posicionesIniciales = '', tipo = 0, idActividad = 0) {
  if (tipo == 1) {
    actividad.find("li img").removeClass("correct incorrect");
    actividad.find("li .ico").removeAttr("src");

    var elementosOrdenados = posicionesIniciales.map(function (pos) {
      return actividad.find("li[value='" + pos + "']")[0];
    });

    actividad.empty().append(elementosOrdenados);
  }

  //Multiple Respuestas
  if (tipo == 2) {
    actividad = $('#actividad_h_0' + idActividad);
    if (idActividad == 1) {
      elements = [];
      results = [];
      correctCount = 0;
      actividad.find('.act').removeClass('act');
      actividad.find('.true').removeClass('true');
      actividad.find('.false').removeClass('false');
      $('#btn-valid').show();
      $('#respuesta').hide();
      $('#respuesta_mal').hide();
      $('#reiniciar').hide();
      $('#btn-valid').show();

    } else {
      elements = 'elements' + idActividad;
      this[elements] = [];

      results = 'results' + idActividad;
      this[results] = [];

      correctCount = 'correctCount' + idActividad;
      this[correctCount] = 0;

      actividad.find('.act').removeClass('act');
      actividad.find('.true').removeClass('true');
      actividad.find('.false').removeClass('false');
      $('#btn-valid' + idActividad).show();
      $('#respuesta' + idActividad).hide();
      $('#respuesta_mal' + idActividad).hide();
      $('#reiniciar' + idActividad).hide();
      $('#btn-valid' + idActividad).show();
    }
  }

  //Seleccionar la imagen correcta 
  if (tipo == 3) {
    $(".itemAct").removeClass("checkAct xmarkAct");
    $(".itemAct .resAct").attr("src", "");
    $(".correctIncorrect").hide();
  }

  //arrastrar imagen al cuadrado
  if (tipo == 4) {
    // Eliminar clases 'correct'
    actividad.find('.actividadBimg div').removeClass('correct');

    // Restablecer las imágenes draggables a su estado original
    actividad.find('.actividadBimg').each(function () {
      var $listOpcDragOriginal = $(this);
      var originalImages = $listOpcDragOriginal.data('originalImages');
      $listOpcDragOriginal.empty().append(originalImages);
    });

    // Restablecer las imágenes droppable a su estado original
    actividad.find('.actividadAimg').each(function () {
      var $listOpcDropOriginal = $(this);
      var originalImages = $listOpcDropOriginal.data('originalImages');
      $listOpcDropOriginal.empty().append(originalImages);
    });
    arrastrarElemento2();
  }

}

/*activida de arrastrr y soltar*/
// item 11
function arrastrarElemento2() {
  $("#drag11").draggable({
    revert: 'invalid',
    snap: '#drop11',
    snapMode: 'corner',
    snapTolerance: '22'
  });
  $("#drop11").droppable({
    accept: '#drag11'
  }).on('droppable:drop', function (e) {
    $(this).addClass("correct");

  });

  // item 22
  $("#drag22").draggable({
    revert: 'invalid',
    snap: '#drop22',
    snapMode: 'corner',
    snapTolerance: '22'
  });
  $("#drop22").droppable({
    accept: '#drag22'
  }).on('droppable:drop', function (e) {
    $(this).addClass("correct");
  });

  // item 33
  $("#drag33").draggable({
    revert: 'invalid',
    snap: '#drop33',
    snapMode: 'corner',
    snapTolerance: '22'
  });
  $("#drop33").droppable({
    accept: '#drag33'
  }).on('droppable:drop', function (e) {
    $(this).addClass("correct");
  });

  // item 44
  $("#drag44").draggable({
    revert: 'invalid',
    snap: '#drop44',
    snapMode: 'corner',
    snapTolerance: '22'
  });
  $("#drop44").droppable({
    accept: '#drag44'
  }).on('droppable:drop', function (e) {
    $(this).addClass("correct");
  });

  // item 55
  $("#drag55").draggable({
    revert: 'invalid',
    snap: '#drop55',
    snapMode: 'corner',
    snapTolerance: '22'
  });
  $("#drop55").droppable({
    accept: '#drag55'
  }).on('droppable:drop', function (e) {
    $(this).addClass("correct");
  });

  // item 66
  $("#drag66").draggable({
    revert: 'invalid',
    snap: '#drop66',
    snapMode: 'corner',
    snapTolerance: '22'
  });
  $("#drop66").droppable({
    accept: '#drag66'
  }).on('droppable:drop', function (e) {
    $(this).addClass("correct");
  });

}

function arrastrarElemento3() {
  var elementosSoltadosCorrectamente = 0;
  var totalElementos = 4; // Total de elementos a soltar correctamente

  // item 1
  $("#drag1_act_3").draggable({
    revert: "invalid",
    snap: "#drop1_act_3",
    snapMode: "corner",
    snapTolerance: "22",
  });
  $("#drop1_act_3").droppable({
    accept: "#drag1_act_3",
  }).on('droppable:drop', function (e) {
    elementosSoltadosCorrectamente++;
    checkComplecion();
  });



  // item 3
  $("#drag3_act_3").draggable({
    revert: "invalid",
    snap: "#drop3_act_3",
    snapMode: "corner",
    snapTolerance: "1",
  });
  $("#drop3_act_3").droppable({
    accept: "#drag3_act_3",
  }).on('droppable:drop', function (e) {
    elementosSoltadosCorrectamente++;
    checkComplecion();
  });

  // item 5
  $("#drag5_act_3").draggable({
    revert: "invalid",
    snap: "#drop5_act_3",
    snapMode: "corner",
    snapTolerance: "1",
  });
  $("#drop5_act_3").droppable({
    accept: "#drag5_act_3",
  }).on('droppable:drop', function (e) {
    elementosSoltadosCorrectamente++;
    checkComplecion();
  });

  // item 4
  $("#drag6_act_3").draggable({
    revert: "invalid",
    snap: "#drop6_act_3",
    snapMode: "corner",
    snapTolerance: "1",
  });
  $("#drop6_act_3").droppable({
    accept: "#drag6_act_3",
  }).on('droppable:drop', function (e) {
    elementosSoltadosCorrectamente++;
    checkComplecion();
  });

  function checkComplecion() {
    if (elementosSoltadosCorrectamente === totalElementos) {
      $(".ctActivityDragDropFny").show();
    }
  }
}

function cuatro_politicas() {
  $("#politicas").attr('src', 'assets/img/4-politicas.png');
  $("#titulo_politicas").html('Políticas corporativas');
  $("#sub_titulo_politicas").html('Presentamos las tres políticas que aplicamos en la operación y que cuidan tu salud y tu vida cada día.');
  $("#audio_politicas").attr('src', 'assets/audio/Tres-politicas.mp3');
  $(".politicas-seis-modal").hide();
  $(".politicas-cuatro-modal").attr('hidden', false);

}

function seis_politicas() {
  $("#politicas").attr('src', 'assets/img/6politicas.png');
  $("#titulo_politicas").html('Seis políticas');
  $("#sub_titulo_politicas").html('Presentamos las seis políticas que aplicamos en la operación y que cuidan tu salud y tu vida cada día.');

  $("#audio_politicas").attr('src', 'assets/audio/6_politicas.mp3');
  $(".politicas-cuatro-modal").attr('hidden', true);
  $(".politicas-seis-modal").show();
}


function info_aliado() {
  $("#titulo").html('Soy Aliado');
  $("#imagen-accidente").attr('src', 'assets/img/aliado.png');
  $(".reporte_accidente_directo").hide();
  $(".reporte_accidente_aliado").attr('hidden', false);
}

function info_directo() {
  $("#titulo").html('Soy Directo');
  $("#imagen-accidente").attr('src', 'assets/img/directo.png');
  $(".reporte_accidente_aliado").attr('hidden', true);
  $(".reporte_accidente_directo").show();
}


function uploadPhoto() {
  // Obtener el elemento canvas y su contexto
  let photoPreview = document.getElementById('firmaCanvas');

  // Obtener la imagen capturada como un objeto Blob
  photoPreview.toBlob(function (blob) {
    let course_code = $('#course_code').val();
    let module_id = $('#module_id').val();
    let unique_course_id = $('#unique_course_id').val();
    let emp_unique_id = $('#emp_unique_id').val();

    // Crear un objeto FormData
    let formData = new FormData();

    // Agregar la imagen Blob al FormData
    formData.append(emp_unique_id, blob, emp_unique_id + '.png');

    // Agregar otros datos al FormData
    formData.append('course_code', course_code);
    formData.append('module_id', module_id);
    formData.append('unique_course_id', unique_course_id);

    // Mostrar círculo de carga antes de enviar la solicitud
    $('#borrarFirmaBtn').hide();
    // Enviar la solicitud mediante AJAX con jQuery
    $.ajax({
      type: 'POST',
      url: '../upload.php',
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $('#btn_enviar').text('Enviado');
        // Cambiar color del botón
        $('#btn_enviar').css('background-color', '--primary');
      },
      error: function () {

      }
    });
  }, 'image/png');
}


//slider 21 tooltip vestuario

//Para generar el TOOLTIP p
$(function () {
  $('.iconos-uniforme img, .mostrar-mobile img.icono').each(function () {

    var imgSrc;
    var $img = $('<img>');
    switch ($(this).attr('value')) {
      case '1':
        imgSrc = 'assets/img/vestuario-mina/uniforme-mina-lampara.png';
        break;
      case '2':
        imgSrc = 'assets/img/vestuario-mina/uniforme-mina-casco.png';
        break;
      case '3':
        imgSrc = 'assets/img/vestuario-mina/uniforme-mina-gafas.png';
        break;
      case '4':
        imgSrc = 'assets/img/vestuario-mina/uniforme-mina-protector.png';
        break;
      case '5':
        imgSrc = 'assets/img/vestuario-mina/uniforme-mina-repistaorio.png';
        break;
      case '6':
        imgSrc = 'assets/img/vestuario-mina/uniforme-mina-guantes.png';
        break;
      case '7':
        imgSrc = 'assets/img/vestuario-mina/uniforme-mina-botas.png';
        break;
      case '8':
        imgSrc = 'assets/img/vestuario-mina/autorescatador.png';
        break;
      case '9':
        imgSrc = 'assets/img/vestuario-mina/reata.png';
        break;
      case '10':
        imgSrc = 'assets/img/vestuario-mina/overol-seguridad.png';
        break;
    }

    $(this).attr('title', '<img src="' + imgSrc + '">').tooltip({
      html: true,
      track: true
    });

    $(this).on('click touchstart', function () {
      $(this).tooltip('show');
    });

  });
});
function reiniciarActividadPuzzle() {
  // Borrar todo el contenido de actPuzzle
  $(".actPuzzle").empty();

  // Volver a agregar el contenido original
  $(".actPuzzle").append(`
     <div>
       <img id="actPuzzleDra01" src="assets/img/sl24img01.jpg">
       <img id="actPuzzleDra02" src="assets/img/sl24img02.jpg">
       <img id="actPuzzleDra03" src="assets/img/sl24img03.jpg">
       <img id="actPuzzleDra04" src="assets/img/sl24img04.jpg">
       <img id="actPuzzleDra05" src="assets/img/sl24img05.jpg">
     </div>
     <div>
       <div id="actPuzzleDro01">
         <img class="imgPz" src="assets/img/sl24img06.jpg">
       </div>
       <div id="actPuzzleDro02">
         <img class="imgPz" src="assets/img/sl24img07.jpg">
       </div>
       <div id="actPuzzleDro03">
         <img class="imgPz" src="assets/img/sl24img08.jpg">
       </div>
       <div id="actPuzzleDro04">
         <img class="imgPz" src="assets/img/sl24img09.jpg">
       </div>
       <div id="actPuzzleDro05">
         <img class="imgPz" src="assets/img/sl24img10.jpg">
       </div>
     </div>
   `);

  dragablePuzzle()
}

function dragablePuzzle() {
  /*actividad puzzle slider22*/
  $("#actPuzzleDra01").draggable({
    snap: '#actPuzzleDro01'
  });
  $("#actPuzzleDro01").droppable({
    accept: '#actPuzzleDra01'
  }).on('droppable:drop', function (e) {
    $(this).find('.imgPz').remove();
  });

  //img02 grag & drop
  $("#actPuzzleDra02").draggable({
    snap: '#actPuzzleDro02'
  });
  $("#actPuzzleDro02").droppable({
    accept: '#actPuzzleDra02'
  }).on('droppable:drop', function (e) {
    $(this).find('.imgPz').remove();
  });

  //img03 grag & drop
  $("#actPuzzleDra03").draggable({
    snap: '#actPuzzleDro03'
  });
  $("#actPuzzleDro03").droppable({
    accept: '#actPuzzleDra03'
  }).on('droppable:drop', function (e) {
    $(this).find('.imgPz').remove();
  });

  //img04 grag & drop
  $("#actPuzzleDra04").draggable({
    snap: '#actPuzzleDro04'
  });
  $("#actPuzzleDro04").droppable({
    accept: '#actPuzzleDra04'
  }).on('droppable:drop', function (e) {
    $(this).find('.imgPz').remove();
  });

  //img05 grag & drop
  $("#actPuzzleDra05").draggable({
    snap: '#actPuzzleDro05'
  });
  $("#actPuzzleDro05").droppable({
    accept: '#actPuzzleDra05'
  }).on('droppable:drop', function (e) {
    $(this).find('.imgPz').remove();
  });
}

//Script para controlar la reproducción de audio y video

// Función para inicializar la lógica del botón de play
function initializePlayButtonLogic() {
  const audioElements = document.querySelectorAll('audio');
  const playButtons = document.querySelectorAll('.video-button-control-audio');
  const modalButtons = document.querySelectorAll('[data-bs-toggle="modal"]');
  const sliderContainers = document.querySelectorAll('[data-slider]');

  // Variables globales (moverlas fuera de la función)
  if (typeof currentPlayingVideo === 'undefined') {
    window.currentPlayingVideo = null;
    window.currentPlayingButton = null;
  }

  // Función para mostrar el botón de reproducción con delay
  const showPlayButton = (playButton, delay = 0) => {
    if (playButton) {
      setTimeout(() => {
        playButton.style.display = 'block';
        playButton.style.opacity = '0';
        playButton.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          playButton.style.opacity = '1';
        }, 50);
      }, delay);
    }
  };

  // Función para ocultar el botón de reproducción
  const hidePlayButton = (playButton) => {
    if (playButton) {
      playButton.style.opacity = '0';
      setTimeout(() => {
        playButton.style.display = 'none';
      }, 300);
    }
  };

  // Función para pausar el video
  const pauseVideo = (iframe) => {
    if (iframe) {
      const pauseMessage = JSON.stringify({ action: 'pause' });
      iframe.contentWindow.postMessage(pauseMessage, '*');
      iframe.src = iframe.src.replace('autoplay=true', 'autoplay=false');
      iframe.style.pointerEvents = 'none';
    }
  };

  // Función para reproducir el video
  const playVideo = (iframe, playButton) => {
    if (iframe) {
      const playMessage = JSON.stringify({ action: 'play' });
      iframe.contentWindow.postMessage(playMessage, '*');
      iframe.src = iframe.src.replace('autoplay=false', 'autoplay=true');

      // Ocultar el botón inmediatamente
      hidePlayButton(playButton);

      // Actualizar estado
      window.currentPlayingVideo = iframe;
      window.currentPlayingButton = playButton;

      setTimeout(() => {
        iframe.style.pointerEvents = 'auto';
      }, 500);
    }
  };

  // Función para manejar el clic en el botón de reproducción del video
  const handlePlayButtonClick = (event, iframe) => {
    // Pausar todos los audios si están reproduciéndose
    audioElements.forEach(audio => {
      if (!audio.paused) {
        audio.pause();
      }
    });

    // Pausar otros videos
    playButtons.forEach(button => {
      if (button !== event.target.closest('.video-button-control-audio')) {
        const otherIframeId = button.getAttribute('data-target');
        const otherIframe = document.getElementById(otherIframeId);
        if (otherIframe) {
          pauseVideo(otherIframe);
          showPlayButton(button);
        }
      }
    });

    // Obtener el botón de play
    const playButton = event.target.closest('.video-button-control-audio');

    // Reproducir el video
    playVideo(iframe, playButton);
  };

  // Función para manejar la reproducción del audio
  const handleAudioPlay = (event) => {
    // Pausar todos los videos si están reproduciéndose
    if (window.currentPlayingVideo) {
      pauseVideo(window.currentPlayingVideo);
      if (window.currentPlayingButton) {
        showPlayButton(window.currentPlayingButton);
      }
      window.currentPlayingVideo = null;
      window.currentPlayingButton = null;
    }

    // Pausar otros audios si están reproduciéndose
    audioElements.forEach(audio => {
      if (audio !== event.target && !audio.paused) {
        audio.pause();
      }
    });
  };

  // Agregar eventos de clic a los botones de reproducción del video
  playButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const iframeId = button.getAttribute('data-target');
      const iframe = document.getElementById(iframeId);
      if (iframe) {
        handlePlayButtonClick(event, iframe);
      }
    });
  });

  // Agregar evento a los audios para pausar el video y otros audios cuando se reproduzcan
  audioElements.forEach(audio => {
    audio.addEventListener('play', handleAudioPlay);
  });

  // Escuchar mensajes del iframe - SOLO para evento 'ended'
  window.addEventListener('message', (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.event === 'ended') {
        // Mostrar el botón de reproducción solo cuando el video termine
        if (window.currentPlayingVideo && window.currentPlayingButton) {
          showPlayButton(window.currentPlayingButton);
          window.currentPlayingVideo.style.pointerEvents = 'none';
          window.currentPlayingVideo = null;
          window.currentPlayingButton = null;
        }
      }
    } catch (e) {
      // No es un mensaje JSON o no es de nuestro iframe
    }
  });

  // NUEVA FUNCIONALIDAD: Sincronizar botón de play con carga del iframe
  const containers = document.querySelectorAll(".iframe-container");
  containers.forEach(container => {
    const iframe = container.querySelector("iframe");
    const loader = container.querySelector(".loader");
    const playButton = container.querySelector('.video-button-control-audio');

    if (iframe && loader && playButton) {
      // Inicialmente ocultar el botón de play y preparar iframe
      playButton.style.display = 'none';
      playButton.style.opacity = '0';
      playButton.style.transition = 'opacity 0.5s ease';
      iframe.style.pointerEvents = 'none';
      iframe.style.opacity = '0';
      iframe.style.transition = 'opacity 0.5s';

      // Cuando el iframe se carga completamente
      iframe.addEventListener("load", function () {
        // Ocultar el loader
        loader.style.display = 'none';

        // Mostrar el iframe Y el botón al MISMO TIEMPO
        iframe.style.opacity = '1';

        // Solo mostrar el botón si no hay un video reproduciéndose actualmente
        if (!currentPlayingVideo || iframe !== currentPlayingVideo) {
          playButton.style.display = 'block';
          // Usar el mismo timing de transición que el iframe
          setTimeout(() => {
            playButton.style.opacity = '1';
          }, 50); // Pequeño delay para sincronizar con la transición del iframe
        }
      });

      // Manejar errores de carga del iframe
      iframe.addEventListener("error", function () {
        loader.style.display = 'none';
        console.error('Error al cargar el iframe:', iframe.src);
      });
    }
  });

  // Manejar la apertura de modales
  modalButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Pausar todos los audios cuando se abre un modal
      audioElements.forEach(audio => {
        if (!audio.paused) {
          audio.pause();
        }
      });

      // Pausar todos los videos cuando se abre un modal
      if (window.currentPlayingVideo) {
        pauseVideo(window.currentPlayingVideo);
        if (window.currentPlayingButton) {
          showPlayButton(window.currentPlayingButton);
        }
        window.currentPlayingVideo = null;
        window.currentPlayingButton = null;
      }
    });
  });

  // Observar cambios de slider
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'class') {
        if (window.currentPlayingVideo) {
          const currentSlider = window.currentPlayingVideo.closest('[data-slider]');
          const activeSliders = document.querySelectorAll('[data-slider].active, [data-slider].show');

          let isStillVisible = false;
          activeSliders.forEach(slider => {
            if (slider === currentSlider) {
              isStillVisible = true;
            }
          });

          if (!isStillVisible) {
            pauseVideo(window.currentPlayingVideo);
            if (window.currentPlayingButton) {
              showPlayButton(window.currentPlayingButton);
            }
            window.currentPlayingVideo = null;
            window.currentPlayingButton = null;
          }
        }
      }
    });
  });

  // Configurar el observer para cada contenedor de slider
  sliderContainers.forEach(container => {
    observer.observe(container, { attributes: true });
  });
}

// Función para reiniciar la lógica de los botones de play en el slide actual
function resetPlayButtonLogic() {
  // Obtener solo los contenedores visibles/activos del slide actual
  const activeContainers = document.querySelectorAll(".iframe-container");

  activeContainers.forEach(container => {
    const iframe = container.querySelector("iframe");
    const loader = container.querySelector(".loader");
    const playButton = container.querySelector('.video-button-control-audio');

    // Verificar si el contenedor está en un slide visible
    const parentSlide = container.closest('[data-slider], .slide, .carousel-item, .swiper-slide');
    let isVisible = true;

    if (parentSlide) {
      const computedStyle = window.getComputedStyle(parentSlide);
      isVisible = computedStyle.display !== 'none' &&
        computedStyle.visibility !== 'hidden' &&
        computedStyle.opacity !== '0';
    }

    if (iframe && loader && playButton && isVisible) {
      // Resetear estados
      playButton.style.display = 'none';
      playButton.style.opacity = '0';
      playButton.style.transition = 'opacity 0.5s ease';
      iframe.style.pointerEvents = 'none';

      // Verificar si el iframe ya está cargado
      if (iframe.complete || iframe.readyState === 'complete') {
        // Si ya está cargado, aplicar lógica inmediatamente
        loader.style.display = 'none';
        iframe.style.opacity = '1';

        if (!window.currentPlayingVideo || iframe !== window.currentPlayingVideo) {
          playButton.style.display = 'block';
          setTimeout(() => {
            playButton.style.opacity = '1';
          }, 50);
        }
      } else {
        // Si no está cargado, mostrar loader y esperar
        loader.style.display = 'block';
        iframe.style.opacity = '0';
        iframe.style.transition = 'opacity 0.5s';

        // Remover listeners anteriores para evitar duplicados
        iframe.removeEventListener("load", handleIframeLoad);
        iframe.removeEventListener("error", handleIframeError);

        // Agregar nuevos listeners
        iframe.addEventListener("load", handleIframeLoad);
        iframe.addEventListener("error", handleIframeError);
      }
    }
  });
}

// Handlers para los eventos del iframe
function handleIframeLoad(event) {
  const iframe = event.target;
  const container = iframe.closest('.iframe-container');
  if (!container) return;

  const loader = container.querySelector(".loader");
  const playButton = container.querySelector('.video-button-control-audio');

  if (loader && playButton) {
    loader.style.display = 'none';
    iframe.style.opacity = '1';

    if (!window.currentPlayingVideo || iframe !== window.currentPlayingVideo) {
      playButton.style.display = 'block';
      setTimeout(() => {
        playButton.style.opacity = '1';
      }, 50);
    }
  }
}

function handleIframeError(event) {
  const iframe = event.target;
  const container = iframe.closest('.iframe-container');
  if (!container) return;

  const loader = container.querySelector(".loader");
  if (loader) {
    loader.style.display = 'none';
  }
  console.error('Error al cargar el iframe:', iframe.src);
}

// Función para manejar los clics en las flechas de navegación
function handleSliderNavigation() {
  // Pausar video actual si está reproduciéndose
  if (window.currentPlayingVideo) {
    const pauseMessage = JSON.stringify({ action: 'pause' });
    window.currentPlayingVideo.contentWindow.postMessage(pauseMessage, '*');
    window.currentPlayingVideo.src = window.currentPlayingVideo.src.replace('autoplay=true', 'autoplay=false');
    window.currentPlayingVideo.style.pointerEvents = 'none';

    if (window.currentPlayingButton) {
      window.currentPlayingButton.style.display = 'none';
    }

    window.currentPlayingVideo = null;
    window.currentPlayingButton = null;
  }

  // Reiniciar lógica después de un pequeño delay para permitir que el slide cambie
  setTimeout(() => {
    resetPlayButtonLogic();
  }, 100);
}

// Inicializar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function () {
  initializePlayButtonLogic();
  resetPlayButtonLogic();

  // Agregar listeners a las flechas de navegación
  const navButtons = document.querySelectorAll('.bntNextPrev, #pagIndex, #prev, #next');
  navButtons.forEach(button => {
    button.addEventListener('click', function () {
      handleSliderNavigation();
    });
  });

  // También escuchar cambios en elementos que puedan indicar cambio de slide
  const sliderIndicators = document.querySelectorAll('[data-bs-slide], [data-slide], .carousel-control-prev, .carousel-control-next');
  sliderIndicators.forEach(indicator => {
    indicator.addEventListener('click', function () {
      handleSliderNavigation();
    });
  });
});


// ========== VARIABLES GLOBALES ========== //
let vozActual = null;
let enPausa = false;
let seccionActual = null;

// ========== FUNCIÓN TOGGLE LECTURA (PLAY/PAUSE) ========== //
function toggleLecturaVoz(boton) {
  if (boton.classList.contains('activo')) {
    // Si ya está activo, pausar o reanudar
    if (enPausa) {
      reanudarLecturaVoz(boton);
    } else {
      pausarLecturaVoz(boton);
    }
  } else {
    // Si no está activo, iniciar nueva lectura
    iniciarLecturaVoz(boton);
  }
}

// ========== FUNCIÓN PARA INICIAR LECTURA ========== //
function iniciarLecturaVoz(boton) {
  const seccion = boton.closest('[class*="col-"]');
  if (!seccion) return;

  // Detener lectura previa
  detenerLecturaVoz();

  // Clonar y limpiar contenido
  const clon = seccion.cloneNode(true);
  const elementosNoLeer = clon.querySelectorAll('.lecturaVoz-widget, script, style, iframe, audio, video, img, button');
  elementosNoLeer.forEach(el => el.remove());

  const texto = clon.innerText.replace(/\s+/g, ' ').trim();

  if (texto) {
    vozActual = new SpeechSynthesisUtterance(texto);
    vozActual.lang = 'es-MX'; // Español latinoamericano
    vozActual.rate = 0.9;

    // Intentar encontrar una voz latinoamericana
    const voces = window.speechSynthesis.getVoices();
    if (voces.length > 0) {
      const vozLatina = voces.find(voz =>
        voz.lang === 'es-MX' ||
        voz.lang === 'es-US' ||
        (voz.lang.startsWith('es-') && !voz.lang.startsWith('es-ES'))
      );
      if (vozLatina) vozActual.voice = vozLatina;
    }

    // Eventos
    vozActual.onstart = () => {
      seccionActual = seccion;
      boton.classList.add('activo');
      boton.innerHTML = '<i class="fas fa-pause"></i>';
      seccion.classList.add('lecturaVoz-activa');
      enPausa = false;

      // Mostrar controles
      const controls = boton.nextElementSibling;
      if (controls) {
        controls.style.display = 'flex';
        controls.style.transform = 'translateY(0)';
        controls.style.opacity = '1';
      }
    };

    vozActual.onend = () => {
      detenerLecturaVoz();
      // Restaurar ícono original
      boton.innerHTML = '<i class="fas fa-volume-up"></i>';
    };

    vozActual.onerror = () => {
      detenerLecturaVoz();
      boton.innerHTML = '<i class="fas fa-volume-up"></i>';
    };

    window.speechSynthesis.speak(vozActual);
  }
}

// ========== FUNCIÓN PARA PAUSAR LECTURA ========== //
function pausarLecturaVoz(boton) {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.pause();
  enPausa = true;
  boton.innerHTML = '<i class="fas fa-play"></i>';
}

// ========== FUNCIÓN PARA REANUDAR LECTURA ========== //
function reanudarLecturaVoz(boton) {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.resume();
  enPausa = false;
  boton.innerHTML = '<i class="fas fa-pause"></i>';
}

// ========== FUNCIÓN PARA DETENER LECTURA ========== //
function detenerLecturaVoz() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();

  // Remover estados activos
  document.querySelectorAll('.lecturaVoz-mainBtn, .lecturaVoz-controlBtn')
    .forEach(btn => btn.classList.remove('activo'));

  if (seccionActual) {
    seccionActual.classList.remove('lecturaVoz-activa');

    // Restaurar ícono original
    const mainBtn = seccionActual.querySelector('.lecturaVoz-mainBtn');
    if (mainBtn) mainBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  }

  vozActual = null;
  seccionActual = null;
  enPausa = false;
}

// ========== NAVEGACIÓN ENTRE SLIDES ========== //
function btnPrev() {
  detenerLecturaVoz();
  console.log("Navegando al slide anterior");
}

function btnNext() {
  detenerLecturaVoz();
  console.log("Navegando al slide siguiente");
}

// ========== DETENER AL RECARGAR ========== //
window.addEventListener('beforeunload', detenerLecturaVoz);

// ========== INICIALIZACIÓN ========== //
document.addEventListener('DOMContentLoaded', () => {
  if (!('speechSynthesis' in window)) {
    console.warn('Tu navegador no soporta síntesis de voz');
    document.querySelectorAll('.lecturaVoz-widget').forEach(el => {
      el.style.display = 'none';
    });
  }

  // Asignar eventos a los botones de navegación
  document.getElementById('prev')?.addEventListener('click', btnPrev);
  document.getElementById('pagIndex')?.addEventListener('click', btnPrev);
  document.getElementById('next')?.addEventListener('click', btnNext);

  // Mostrar controles al hacer hover en el widget
  document.querySelectorAll('.lecturaVoz-widget').forEach(widget => {
    widget.addEventListener('mouseenter', function () {
      const mainBtn = this.querySelector('.lecturaVoz-mainBtn');
      if (mainBtn.classList.contains('activo')) {
        const controls = this.querySelector('.lecturaVoz-controls');
        controls.style.display = 'flex';
        controls.style.transform = 'translateY(0)';
        controls.style.opacity = '1';
      }
    });
    widget.addEventListener('mouseleave', function () {
      const controls = this.querySelector('.lecturaVoz-controls');
      controls.style.display = 'none';
      controls.style.transform = 'translateY(-10px)';
      controls.style.opacity = '0';
    });
  });

  // Cargar las voces disponibles (necesario para algunos navegadores)
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = function () {
      console.log("Voces cargadas:", speechSynthesis.getVoices());
    };
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const widget = document.getElementById('accessibility-widget');
  if (!widget) return;

  // Función que verifica el estado de los modales
  function checkModalStatus() {
    // Busca cualquier modal visible (Bootstrap o personalizado)
    const isAnyModalOpen = document.querySelector('.modal.show, .modal-container[style*="display: block"]');

    // Oculta/Muestra el widget según el estado
    widget.style.display = isAnyModalOpen ? 'none' : 'block';

    // console.log(isAnyModalOpen ? 'Modal abierto - Widget oculto' : 'Modal cerrado - Widget visible');
  }

  // Verificar cada 300ms (solución a prueba de fallos)
  setInterval(checkModalStatus, 300);

  // También verificar al hacer clic en cualquier lugar (para cierre por backdrop)
  document.addEventListener('click', checkModalStatus);
});