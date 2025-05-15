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

function confirmarEliminar(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la incidencia definitivamente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        ...swalOptions
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = `/incidencias/${id}/delete`;
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