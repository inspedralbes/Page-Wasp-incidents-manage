async function obtenerDatosRoles() {
    const respuesta = await fetch('http://localhost:3000/api/estadistiques-rols');
    const datos = await respuesta.json();

    const labels = datos.map(item => item._id || 'Anónimo');
    const values = datos.map(item => item.total);

    const ctx = document.getElementById('graficoRoles').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Visitas por usuario',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    });
}

async function obtenerDatosHora() {
    const respuesta = await fetch('http://localhost:3000/api/estadistiques-hores');
    const datos = await respuesta.json();

    const labels = datos.map(item => `${item._id}:00`);
    const values = datos.map(item => item.total);

    const ctx = document.getElementById('graficoHoras').getContext('2d');
    new Chart(ctx, {
        type: 'line', 
        data: {
            labels: labels,
            datasets: [{
                label: 'Visitas por hora',
                data: values,
                fill: true,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                tension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    precision: 0
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosRoles();
    obtenerDatosHora();
});