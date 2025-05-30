function uploadPhoto() {
    // Obtener el elemento canvas y su contexto
    let photoPreview = document.getElementById('photo-preview');

    // Obtener la imagen capturada como un objeto Blob
    photoPreview.toBlob(function(blob) {
        let course_code = $('#course_code').val();
        let module_id = $('#module_id').val();
        let unique_course_id = $('#unique_course_id').val();
        let emp_unique_id = $('#emp_unique_id').val();
        // Crear un objeto FormData
        let formData = new FormData();
        
        // Agregar la imagen Blob al FormData
        formData.append(emp_unique_id, blob, emp_unique_id +'.png');

        // Agregar otros datos al FormData
       
        formData.append('course_code', course_code);
        formData.append('module_id', module_id);
        formData.append('unique_course_id', unique_course_id);

        // Crear una solicitud XMLHttpRequest
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '../upload.php', true); 
        
        // Mostrar círculo de carga antes de enviar la solicitud
        document.getElementById('loader').style.display = 'block';
        document.getElementById('btn_enviar').style.display = 'none';
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('btn_enviar').style.display = 'block';
                    document.getElementById('response').innerHTML = 'Cargado con exito!';
                } else {
                    // Manejo de errores en caso de que la solicitud no sea exitosa
                    document.getElementById('response').innerHTML = 'Error en la solicitud.';
                    document.getElementById('incorrect').style.display = 'block';
    
                }
                // Ocultar círculo de carga después de recibir la respuesta
                document.getElementById('loader').style.display = 'none';
                document.getElementById('correct').style.display = 'block';
    
            }
        };
        // Enviar la solicitud con el FormData que contiene la imagen
        xhr.send(formData);
    }, 'image/png'); // Especifica el tipo de imagen (en este caso, PNG)
}
