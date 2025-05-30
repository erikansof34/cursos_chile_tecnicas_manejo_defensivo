const visitedTabs = new Set();

function changeTab(tabNumber) {
    // Oculta todos los contenidos
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`content${i}`).style.display = "none";
        document.getElementById(`tab${i}`).classList.remove("active");
    }

    // Muestra el contenido del tab seleccionado
    document.getElementById(`content${tabNumber}`).style.display = "block";
    document.getElementById(`tab${tabNumber}`).classList.add("active");

    // Marca como visitado si no lo ha sido antes
    if (!visitedTabs.has(tabNumber)) {
        visitedTabs.add(tabNumber);
        const checkIcon = document.getElementById(`check${tabNumber}`);
        checkIcon.innerHTML = `<i class="fas fa-check-circle"></i>`; // Aseguramos que se muestre el ícono
        checkIcon.classList.add("active");
        checkIcon.classList.remove("inactive");
    }

    // Actualiza la barra de progreso
    const progressPercent = (visitedTabs.size / 4) * 100;
    document.getElementById("progress-bar").style.width = progressPercent + "%";

    // Habilita el botón y muestra el mensaje de éxito si se han visitado los 4 tabs
    if (visitedTabs.size === 4) {
        document.getElementById("start-btn").disabled = false;
        document.getElementById("start-btn").classList.add("enabled"); // Agregar clase 'enabled'
        document.getElementById('warning-msg').classList.add('hidden'); // Oculta el mensaje de advertencia
        document.getElementById('success-msg').classList.remove('hidden'); // Muestra el mensaje de éxito
    }
}

// Al cargar la página, solo mostramos el primer tab sin marcarlo como visitado
window.onload = () => {
    document.getElementById("content1").style.display = "block";
    for (let i = 2; i <= 4; i++) {
        document.getElementById(`content${i}`).style.display = "none";
    }
    document.getElementById("progress-bar").style.width = "0%";
    document.getElementById("start-btn").disabled = true;
    document.getElementById("start-btn").classList.remove("enabled"); // Asegurarse de que la clase 'enabled' esté eliminada al principio
    document.getElementById('warning-msg').classList.remove('hidden'); // Asegura que el mensaje de advertencia sea visible
    document.getElementById('success-msg').classList.add('hidden'); // Asegura que el mensaje de éxito esté oculto

    // Inicialmente, los checks deben estar blancos (sin clase activa)
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`check${i}`).classList.add("inactive");
        document.getElementById(`check${i}`).classList.remove("active");
    }
};
