
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
};

// Guardar selección al hacer clic en el botón
document.querySelectorAll('[data-bs-theme-value]').forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-bs-theme-value');
        setTheme(theme);
    });
});

// Al cargar la página, aplicar el tema guardado (o sistema por defecto)
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
} else {
    setTheme('light');
}

