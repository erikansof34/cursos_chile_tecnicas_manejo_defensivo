// Global breadcrumb mapping
const breadcrumbMap = {
    'miga_titulo_curso': 'Técnicas de protección ante peligros y riesgos para las manos, en contextos laborales',
    'miga_vision_zeroo': 'Programa Visión Zerooo',
    'miga_gestion_riesgo': 'Gestión de riesgos',
    'miga_salud_trabajo': 'Salud en el trabajo'
};

// Dynamic breadcrumb paths for each lesson
const lessonPaths = {
    'leccion1': ['miga_vision_zeroo', 'miga_titulo_curso'],
    'leccion2': ['miga_vision_zeroo', 'miga_gestion_riesgo', 'miga_titulo_curso'],
    'leccion3': ['miga_vision_zeroo', 'miga_salud_trabajo', 'miga_titulo_curso']
};

// Function to generate breadcrumb separator
function getBreadcrumbSeparator() {
    return ' <i class="fas fa-chevron-right"></i> ';
}

// Function to update breadcrumb based on current lesson and slide
function updateBreadcrumb() {
    // Determine which lesson we're in based on URL or any other identifier
    let currentLesson = getCurrentLesson();
    
    // Get the appropriate path for this lesson
    let path = lessonPaths[currentLesson] || [];
    
    // Generate HTML for the breadcrumb using the mapped values
    let breadcrumbHTML = path.map(className => breadcrumbMap[className] || '').join(getBreadcrumbSeparator());
    
    // Get additional breadcrumb from current slide if available
    let currentSlideBreadcrumb = getCurrentSlideBreadcrumb();
    if (currentSlideBreadcrumb) {
        breadcrumbHTML += getBreadcrumbSeparator() + currentSlideBreadcrumb;
    }
    
    // Update both desktop and mobile breadcrumbs
    $('#breadcrumb').html(breadcrumbHTML);
    $('#breadcrumb_movil').html(breadcrumbHTML);
}

// Detect current lesson based on the page URL
function getCurrentLesson() {
    let path = window.location.pathname;
    if (path.includes('leccion1')) return 'leccion1';
    if (path.includes('leccion2')) return 'leccion2';
    if (path.includes('leccion3')) return 'leccion3';
    return 'leccion1'; // Default
}

// Get breadcrumb from current active slide
function getCurrentSlideBreadcrumb() {
    let currentSlide = $('.current');
    if (currentSlide.length === 0) return '';
    
    // Find all miga classes on the current slide
    let migaClass = Array.from(currentSlide[0].classList).find(className => className.startsWith('miga'));
    
    // Return the mapped value if found
    return migaClass ? (breadcrumbMap[migaClass] || '') : '';
}

// Initialize breadcrumb when the page loads
$(document).ready(function() {
    // Load the header component if using AJAX method
    // loadHeaderComponent();
    
    // Update breadcrumb
    updateBreadcrumb();
    
    // Update breadcrumb whenever slides change (assuming you have an event for that)
    $(document).on('slideChanged', function() {
        updateBreadcrumb();
    });
});

// Optional: Function to dynamically load header component via AJAX
function loadHeaderComponent() {
    $.get('../components/header.html', function(data) {
        $('#header-container').html(data);
        // After loading, update the breadcrumb
        updateBreadcrumb();
    });
}