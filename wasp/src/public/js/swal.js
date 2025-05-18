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
            window.location.href = `otros/${type}/${id}/delete`;
        }
    });
}

function confirmarDesasignar(id) {
    Swal.fire({
        title: '¿Desasignar técnic?',
        text: 'Aquesta acció desasignarà al técnic actual',
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

function confirmarEliminarT(id) {
    Swal.fire({
        title: '¿Eliminar técnic?',
        text: 'Aquesta acció eliminarà al tecnic actual',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        ...swalOptions
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = `incidencias/${id}/delete`;
        }
    });
}

function mostrarAccesDenegat() {
    Swal.fire({
        icon: 'error',
        title: 'Accés denegat',
        text: `No tens permissos per accedir!`,
        confirmButtonText: 'Tornar enrere',
        ...swalOptions
    });
}

function mostrarErrorBuscar() {
    Swal.fire({
        title: 'Incidéncia no trobada',
        icon: 'question',
        confirmButtonText: 'Tornar enrere',
        ...swalOptions
    });
}

function mostrarErrorLogin() {
        Swal.fire({
        icon: 'error',
        title: 'Accés denegat',
        text: `Contrasenya o usuari incorrecte`,
        confirmButtonText: 'Tornar enrere',
        ...swalOptions
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('error') === '1') {
        mostrarErrorLogin();
    }

    if (params.get('no-autoritzat') === '1') {
        mostrarAccesDenegat();
    }
    
    if (params.get('no-trobat') === '1') {
        mostrarErrorBuscar();
    }
    
});