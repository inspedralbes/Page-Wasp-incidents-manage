const btnTots = document.getElementById('btn-tots');
const btnMeves = document.getElementById('btn-meves');
const divAssignades = document.getElementById('incidencias-assignades');
const divCompletades = document.getElementById('incidencias-completades');

btnTots.addEventListener('click', () => {
divAssignades.style.display = 'block';
divCompletades.style.display = 'none';
btnTots.classList.add('active');
btnMeves.classList.remove('active');
});

btnMeves.addEventListener('click', () => {
divAssignades.style.display = 'none';
divCompletades.style.display = 'block';
btnTots.classList.remove('active');
btnMeves.classList.add('active');
});