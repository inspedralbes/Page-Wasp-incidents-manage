document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('td.horesactuacio').forEach(td => {
        const decimal = parseFloat(td.textContent);
        if (!isNaN(decimal)) {
            const horas = Math.floor(decimal);
            const minutos = Math.round((decimal - horas) * 60);

            let textoFormateado = '';

            if (decimal === 0) {
                textoFormateado = 'Hores no registrades';
            } else if (horas === 0 && minutos > 0) {
                textoFormateado = `${minutos} minuto${minutos !== 1 ? 's' : ''}`;
            } else if (minutos === 0) {
                textoFormateado = `${horas} hora${horas !== 1 ? 's' : ''}`;
            } else {
                textoFormateado = `${horas} hora${horas !== 1 ? 's' : ''} ${minutos} minuto${minutos !== 1 ? 's' : ''}`;
            }

            td.textContent = textoFormateado;
        }
    });
});