const CONFIGURACION_CURSO = {
    momentos: [
      { id: "leccion1", nombre: "Lección 1", totalSlides: 8 },
      { id: "leccion2", nombre: "Lección 2", totalSlides: 7 },
      { id: "leccion3", nombre: "Lección 3", totalSlides: 9 }
    ],
    // Total de slides en todo el curso
    get totalSlides() {
      return this.momentos.reduce((total, momento) => total + momento.totalSlides, 0);
    }
  };


// Archivo: assets/js/progreso-curso.js

// Obtener el momento actual basado en la URL
function obtenerMomentoActual() {
    const path = window.location.pathname;
    for (const momento of CONFIGURACION_CURSO.momentos) {
      if (path.includes(momento.id)) {
        return momento;
      }
    }
    return null; // Si no estamos en ningún momento reconocido
  }
  
  // Calcular el índice del slide actual dentro del curso completo
  function calcularIndiceGlobal(momentoActual, slideActual) {
    if (!momentoActual) return 0;
    
    let indiceGlobal = slideActual;
    
    // Sumar los slides de los momentos anteriores
    for (const momento of CONFIGURACION_CURSO.momentos) {
      if (momento.id === momentoActual.id) {
        break;
      }
      indiceGlobal += momento.totalSlides;
    }
    
    return indiceGlobal;
  }
  
  // Guardar progreso en localStorage
  function guardarProgreso(momentoId, slideActual) {
    const progreso = JSON.parse(localStorage.getItem('cursoProgreso') || '{}');
    
    // Actualizar el slide más alto alcanzado en este momento
    progreso[momentoId] = Math.max(slideActual, progreso[momentoId] || 0);
    
    localStorage.setItem('cursoProgreso', JSON.stringify(progreso));
  }
  
  function calcularProgresoTotal() {
    const progreso = JSON.parse(localStorage.getItem('cursoProgreso') || '{}');
    let slidesCompletados = 0;
    
    // Contar slides completados en cada momento
    for (const momento of CONFIGURACION_CURSO.momentos) {
      const slideAlcanzado = progreso[momento.id] || 0;
      slidesCompletados += Math.min(slideAlcanzado, momento.totalSlides);
    }
    
    // Calcular porcentaje
    return Math.round((slidesCompletados / CONFIGURACION_CURSO.totalSlides) * 100);
  }
  
  // Actualizar la interfaz con el progreso
  function actualizarInterfazProgreso(slideActual) {
    const momentoActual = obtenerMomentoActual();
    if (!momentoActual) return;
    
    // Actualizar contador de slides
    $('#textProg').text(slideActual);
    $('#nSlider').text(momentoActual.totalSlides);
    
    // Guardar progreso
    guardarProgreso(momentoActual.id, slideActual);
    
    // Calcular progreso del momento actual
    const progresoMomento = Math.round((slideActual / momentoActual.totalSlides) * 100);
    
    // Calcular progreso total del curso
    const progresoTotal = calcularProgresoTotal();
    
    // Actualizar texto de porcentaje
    $('#porcentajeProgreso').text(progresoTotal);
    
    // Actualizar barra de progreso
    $(".progBar > div").css("width", progresoTotal + "%");
  }