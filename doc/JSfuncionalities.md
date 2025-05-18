# JavaScript functionalities implemented in the project

## Client-Side JavaScript Functionalities

### 1. Theme Toggle System

The application implements a dark/light theme toggle functionality using client-side JavaScript: theme-toggle.js

This functionality:

· Persists user theme preferences in localStorage.
· Automatically detects system preferences using prefers-color-scheme media query.
· Updates the theme across the application by setting the data-bs-theme attribute.
· Integrates with SweetAlert2 to ensure consistent theming across alerts.

### 2. Interactive Alerts and Confirmations

The application uses SweetAlert2 for enhanced user interactions, with custom JavaScript functions for different alert types: swal.js.

Specific confirmation dialogs are implemented for various actions:

1. Delete Confirmation: For removing items like incidents, technicians, departments, and categories.

2. Update Confirmation: For confirming data updates.

3. Technician Unassignment: For confirming technician removal from incidents.

4. Access Denied Alerts: For handling unauthorized access attempts.

These JavaScript functions are integrated with the EJS templates and called from various views, such as the category listing page: list_all.ejs

## Server-Side JavaScript Functionalities

### 1. Athentication and Authorization

The application implements role-based access control using Express middleware functions:

These middleware functions are used throughout the route definitions to protect resources based on user roles.

### 2. Database Operations with Sequelize ORM

The application uses Sequelize ORM for database interactions, with model definitions and relationships defined in JavaScript.

Model definitions use JavaScript to specify data types and constraints.

### Controller Logic for Actions

The application implements MVC architecture with JavaScript controllers handling business logic.

The action creation process includes complex logic for updating related records.


### 4. Analytics and Logging

The application implements a logging system using MongoDB and Mongoose: estadistiques.routes.js

Statistics routes are defined for data visualization: estadistiques.routes.js

### 5. View Rendering with EJS

The application uses EJS (Embedded JavaScript) templates for dynamic HTML generation.

### 6. Database Initialization

The application uses JavaScript to initialize the database with sample data.


