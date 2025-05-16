let swalOptions = {};

function updateSwalTheme(theme) {
    if (theme === 'dark') {
        swalOptions = {
            background: '#1f1f1f',
            color: '#f1f1f1',
            confirmButtonColor: '#0d6efd'
        };
    } else {
        swalOptions = {
            background: '#fff',
            color: '#000',
            confirmButtonColor: '#0d6efd'
        };
    }
}

function showCustomSwal(title, text, icon = 'success') {
    Swal.fire({
        title,
        text,
        icon,
        ...swalOptions
    });
}

function confirmarEliminar(type, id) {
    let messages = {
        incidencias: {
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará la incidencia definitivamente.'
        },
        tecnicos: {
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará al técnico seleccionado.'
        },
        departamentos: {
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el departamento seleccionado.'
        },
        categorias: {
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará la categoría seleccionada.'
        }
    };

    let message = messages[type] || {
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el elemento seleccionado.'
    };

    Swal.fire({
        title: message.title,
        text: message.text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        ...swalOptions
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = `/${type}/${id}/delete`;
        }
    });
}

function confirmarActualizar(type, id) {
    Swal.fire({
        title: '¿Actualizar?',
        text: '¿Quieres guardar los cambios realizados?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar',
        ...swalOptions
    }).then((result) => {
        
        if (result.isConfirmed) {
            const inputSelector = `input[name="nombre_${id}"]`;
            const input = document.querySelector(inputSelector);
            if (!input) {
                Swal.fire('Error', 'No se encontró el campo para actualizar', 'error');
                return;
            }

            const nombre = input.value;

            const form = document.createElement('form');
            form.method = 'POST';
            form.action = `/${type}/${id}/update`;

            const inputNombre = document.createElement('input');
            inputNombre.type = 'hidden';
            inputNombre.name = 'nombre';
            inputNombre.value = nombre;

            form.appendChild(inputNombre);
            document.body.appendChild(form);
            form.submit();
        }
    });
}


function confirmarDesasignar(id) {
    Swal.fire({
        title: '¿Desasignar técnico?',
        text: 'Esta acción desasignará el técnico actual.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, desasignar',
        cancelButtonText: 'Cancelar',
        ...swalOptions
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = `/incidencias/${id}/desasignar`;
        }
    });
}