# Explanation Scripts

After examining the codebase, I found three JavaScript files in the `public/js` directory of the Page-Wasp-incidents-manage application. Below is an explanation of each file's purpose and how it is used.

## grafics.js

This file is responsible for creating charts and visualizations using the Chart.js library. It contains two main functions:  

- `obtenerDatosRoles()` fetches statistics from the `/api/estadisticas` endpoint and creates a pie chart showing visits by user.  
- `obtenerDatosHora()` fetches time-based statistics from `/api/estadisticas-horas` and renders a line chart displaying visits by hour.  

This file is mainly used for the analytics and reporting functionality on the moderator dashboard.

## swal.js

This file handles all SweetAlert2 dialog functionality across the application, providing consistent and themed alert and confirmation dialogs. Key functions include:

- `updateSwalTheme()`: Updates SweetAlert dialogs to match the current application theme (light/dark).  
- `showCustomSwal()`: Displays custom alerts with consistent styling.  
- `confirmarEliminar()`: Shows confirmation dialogs before deleting items like incidents, technicians, departments, or categories.  
- `confirmarActualizar()`: Displays confirmation dialogs before updating information.  
- `confirmarDesasignar()`: Shows confirmation dialog before removing a technician assignment.  
- `mostrarAccesDenegat()`: Displays access denied messages with proper translation.  

## theme-toggle.js

This file manages dark/light theme switching functionality. It includes:

- `setTheme()`: Sets the application theme, stores the preference in `localStorage`, and updates SweetAlert’s theme.  
- Event listeners for theme toggle buttons.  
- Theme initialization from `localStorage` or system preference.  
- System preference change detection to switch themes dynamically.  

## How These Files Are Served in the Application

The application serves these JavaScript files as static resources through Express (`app.js:80-82`). This means any JavaScript file placed in the `wasp/src/public/js` directory is accessible from the browser under the `/js/` path.

## Important Notes

These JavaScript files improve the user experience by providing interactive visualizations, theme customization, and consistent dialog interfaces.

The `theme-toggle.js` script works with system preferences, allowing automatic switching between light and dark modes based on user system settings.

The `swal.js` file ensures a consistent user experience for confirmations and alerts throughout the app, with proper theme support.

The `grafics.js` file integrates with backend statistics APIs to visually represent system usage data.

