(function() {
    // Variables de estado
    var isHighContrastOn = false;
    var currentFontSizeMultiplier = 1;
    var originalFontSizes = new Map();
    var increaseButton, decreaseButton;
    var isTextToSpeechOn = false;
    var isBarVisible = false;
    
    // Elementos protegidos
    const protectedElements = [
        '#accessibility-widgetAct-bar',
        '#accessibility-widgetAct-bar *',
        '#accessibility-widgetAct-trigger',
        '#accessibility-widgetAct-trigger *'
    ];

    // Crear el botón trigger (FIXED POSITION - NO SE MUEVE)
    var triggerBtn = document.createElement('button');
    triggerBtn.id = 'accessibility-widgetAct-trigger';
    triggerBtn.className = 'accessibility-widgetAct-trigger';
    triggerBtn.innerHTML = '<i class="fas fa-universal-access"></i>';
    triggerBtn.title = 'Herramientas de accesibilidad';
    triggerBtn.style.position = 'fixed';
    triggerBtn.style.zIndex = '1001';
    triggerBtn.style.width = '40px';
    triggerBtn.style.height = '40px';
    triggerBtn.style.backgroundColor = '#007BFF';
    triggerBtn.style.color = '#FFFFFF';
    triggerBtn.style.border = 'none';
    triggerBtn.style.cursor = 'pointer';
    triggerBtn.style.fontSize = '20px';
    triggerBtn.style.display = 'flex';
    triggerBtn.style.alignItems = 'center';
    triggerBtn.style.justifyContent = 'center';
    triggerBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    triggerBtn.style.transition = 'all 0.3s ease';
    triggerBtn.style.bottom = '20px';
    triggerBtn.style.right = '20px';
    triggerBtn.style.borderRadius = '50%';

    // Crear la barra de accesibilidad
    var barContainer = document.createElement('div');
    barContainer.id = 'accessibility-widgetAct-bar';
    barContainer.className = 'accessibility-widgetAct-bar';
    barContainer.style.display = 'none';

    // Botones de la barra
    var increaseBtn = document.createElement('button');
    increaseBtn.id = 'increase-widgetAct-text';
    increaseBtn.className = 'accessibility-widgetAct-btn';
    increaseBtn.innerHTML = '<i class="fas fa-plus"></i>';
    increaseBtn.title = 'Aumentar tamaño del texto';
    increaseBtn.addEventListener('click', increaseTextSize);
    increaseButton = increaseBtn;

    var decreaseBtn = document.createElement('button');
    decreaseBtn.id = 'decrease-widgetAct-text';
    decreaseBtn.className = 'accessibility-widgetAct-btn';
    decreaseBtn.innerHTML = '<i class="fas fa-minus"></i>';
    decreaseBtn.title = 'Disminuir tamaño del texto';
    decreaseBtn.addEventListener('click', decreaseTextSize);
    decreaseButton = decreaseBtn;

    var contrastBtn = document.createElement('button');
    contrastBtn.id = 'toggle-widgetAct-contrast';
    contrastBtn.className = 'accessibility-widgetAct-btn';
    contrastBtn.innerHTML = '<i class="fas fa-adjust"></i>';
    contrastBtn.title = 'Alternar contraste alto';
    contrastBtn.addEventListener('click', toggleHighContrast);

    var speechBtn = document.createElement('button');
    speechBtn.id = 'text-widgetAct-to-speech';
    speechBtn.className = 'accessibility-widgetAct-btn';
    speechBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    speechBtn.title = 'Lectura en voz alta';
    speechBtn.addEventListener('click', toggleTextToSpeech);

    var resetBtn = document.createElement('button');
    resetBtn.id = 'reset-widgetAct-all';
    resetBtn.className = 'accessibility-widgetAct-btn';
    resetBtn.innerHTML = '<i class="fas fa-undo"></i>';
    resetBtn.title = 'Reiniciar todos los ajustes';
    resetBtn.addEventListener('click', resetAll);

    // Añadir botones a la barra
    barContainer.appendChild(increaseBtn);
    barContainer.appendChild(decreaseBtn);
    barContainer.appendChild(contrastBtn);
    barContainer.appendChild(speechBtn);
    barContainer.appendChild(resetBtn);

    // Añadir elementos al DOM
    document.body.appendChild(triggerBtn);
    document.body.appendChild(barContainer);

    // Función para mostrar/ocultar la barra (SIN MOVER EL BOTÓN)
    function toggleBar() {
        isBarVisible = !isBarVisible;
        barContainer.style.display = isBarVisible ? 'flex' : 'none';
        // EL BOTÓN NO SE MUEVE - SE ELIMINA LA LÍNEA QUE MODIFICABA EL BOTTOM
    }

    // Evento para mostrar/ocultar la barra
    triggerBtn.addEventListener('click', toggleBar);

    // Funciones de accesibilidad (se mantienen igual)
    function storeOriginalFontSizes() {
        var selector = 'body *:not(' + protectedElements.join(', ') + ')';
        var elements = document.querySelectorAll(selector);
        
        elements.forEach(function(element) {
            if (!originalFontSizes.has(element)) {
                originalFontSizes.set(element, parseFloat(window.getComputedStyle(element).fontSize));
            }
        });
    }

    function increaseTextSize() {
        storeOriginalFontSizes();
        currentFontSizeMultiplier += 0.1;
        
        var selector = 'body *:not(' + protectedElements.join(', ') + ')';
        var elements = document.querySelectorAll(selector);
        
        elements.forEach(function(element) {
            var originalSize = originalFontSizes.get(element);
            if (originalSize) {
                element.style.fontSize = (originalSize * currentFontSizeMultiplier) + 'px';
            }
        });
        
        increaseButton.classList.add('selected');
        if (currentFontSizeMultiplier > 1) {
            decreaseButton.classList.remove('selected');
        }
        if (Math.abs(currentFontSizeMultiplier - 1) < 0.01) {
            increaseButton.classList.remove('selected');
            decreaseButton.classList.remove('selected');
        }
        
        increaseBtn.style.transform = 'scale(0.9)';
        setTimeout(() => increaseBtn.style.transform = 'scale(1)', 200);
    }
    
    function decreaseTextSize() {
        storeOriginalFontSizes();
        currentFontSizeMultiplier = Math.max(0.5, currentFontSizeMultiplier - 0.1);
        
        var selector = 'body *:not(' + protectedElements.join(', ') + ')';
        var elements = document.querySelectorAll(selector);
        
        elements.forEach(function(element) {
            var originalSize = originalFontSizes.get(element);
            if (originalSize) {
                element.style.fontSize = (originalSize * currentFontSizeMultiplier) + 'px';
            }
        });
        
        decreaseButton.classList.add('selected');
        if (currentFontSizeMultiplier < 1) {
            increaseButton.classList.remove('selected');
        }
        if (Math.abs(currentFontSizeMultiplier - 1) < 0.01) {
            increaseButton.classList.remove('selected');
            decreaseButton.classList.remove('selected');
        }
        
        decreaseBtn.style.transform = 'scale(0.9)';
        setTimeout(() => decreaseBtn.style.transform = 'scale(1)', 200);
    }

    function toggleHighContrast() {
        isHighContrastOn = !isHighContrastOn;
        
        var selector = 'body, body *:not(' + protectedElements.join(', ') + ')';
        var elements = document.querySelectorAll(selector);
        
        elements.forEach(function(element) {
            if (isHighContrastOn) {
                element.classList.add('high-contrast-widgetAct');
            } else {
                element.classList.remove('high-contrast-widgetAct');
            }
        });
        
        if (isHighContrastOn) {
            contrastBtn.classList.add('selected');
        } else {
            contrastBtn.classList.remove('selected');
        }
        
        contrastBtn.style.transform = 'scale(0.9)';
        setTimeout(() => contrastBtn.style.transform = 'scale(1)', 200);
    }

    function toggleTextToSpeech() {
        isTextToSpeechOn = !isTextToSpeechOn;
        
        if (isTextToSpeechOn) {
            let allText = document.body.innerText;
            const bar = document.getElementById('accessibility-widgetAct-bar');
            const trigger = document.getElementById('accessibility-widgetAct-trigger');
            if (bar) allText = allText.replace(bar.innerText, '');
            if (trigger) allText = allText.replace(trigger.innerText, '');
            
            var speech = new SpeechSynthesisUtterance(allText);
            speech.lang = 'es-MX';
            
            speech.onend = function() {
                isTextToSpeechOn = false;
                speechBtn.classList.remove('selected');
            };
            
            window.speechSynthesis.speak(speech);
            speechBtn.classList.add('selected');
        } else {
            window.speechSynthesis.cancel();
            speechBtn.classList.remove('selected');
        }
        
        speechBtn.style.transform = 'scale(0.9)';
        setTimeout(() => speechBtn.style.transform = 'scale(1)', 200);
    }

    function resetAll() {
        currentFontSizeMultiplier = 1;
        
        var selector = 'body *:not(' + protectedElements.join(', ') + ')';
        var elements = document.querySelectorAll(selector);
        
        elements.forEach(function(element) {
            element.style.fontSize = '';
        });
        originalFontSizes.clear();
        
        if (isHighContrastOn) {
            isHighContrastOn = false;
            var elements = document.querySelectorAll('body, body *');
            elements.forEach(function(element) {
                element.classList.remove('high-contrast-widgetAct');
            });
            contrastBtn.classList.remove('selected');
        }
        
        if (isTextToSpeechOn) {
            window.speechSynthesis.cancel();
            isTextToSpeechOn = false;
            speechBtn.classList.remove('selected');
        }
        
        increaseButton.classList.remove('selected');
        decreaseButton.classList.remove('selected');
        
        resetBtn.classList.add('selected');
        resetBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            resetBtn.classList.remove('selected');
            resetBtn.style.transform = 'scale(1)';
        }, 200);
    }

    // Estilos dinámicos para la barra
    barContainer.style.position = 'fixed';
    barContainer.style.zIndex = '1000';
    barContainer.style.backgroundColor = '#f8f9fa';
    barContainer.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    barContainer.style.border = '1px solid #ddd';
    barContainer.style.overflow = 'hidden';
    barContainer.style.transition = 'all 0.3s ease';
    barContainer.style.bottom = '70px';
    barContainer.style.right = '20px';
    barContainer.style.flexDirection = 'column';
    barContainer.style.borderRadius = '5px 5px 0 0';

    // Estilos para los botones de la barra
    var barButtons = barContainer.querySelectorAll('button');
    barButtons.forEach(function(button) {
        button.style.width = '50px';
        button.style.height = '50px';
        button.style.border = 'none';
        button.style.backgroundColor = 'transparent';
        button.style.cursor = 'pointer';
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.fontSize = '20px';
        button.style.color = '#495057';
        button.style.transition = 'all 0.2s ease';
        button.style.borderBottom = '1px solid #ddd';
    });

    // Eliminar borde inferior del último botón
    if (barButtons.length > 0) {
        barButtons[barButtons.length - 1].style.borderBottom = 'none';
    }
})();