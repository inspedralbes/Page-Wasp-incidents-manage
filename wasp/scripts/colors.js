function cambiarColor(selectElement) {
    // Elimina las clases de fondo existentes
    selectElement.classList.remove('bg-danger', 'bg-warning', 'bg-success');

    // Aplica la clase de fondo según el valor seleccionado
    const valor = selectElement.value;
    if (valor === "Alta") {
      selectElement.classList.add('bg-danger'); // Fondo rojo para "Alta"
    } else if (valor === "Media") {
      selectElement.classList.add('bg-warning'); // Fondo amarillo para "Media"
    } else if (valor === "Baja") {
      selectElement.classList.add('bg-success'); // Fondo verde para "Baja"
    }
  }

  // Aplicar colores iniciales al cargar la página
  document.querySelectorAll('.form-select').forEach(select => {
    cambiarColor(select);
  });