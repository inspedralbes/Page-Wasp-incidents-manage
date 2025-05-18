# Basic Guide to Solving Common Problems

## 1. User Authentication Issues

### Problem: Unable to log in

· Ensure you're using the correct credentials
· Default user accounts are:
    · Regular user: username **user**, password **12345**
    · Technician: various accounts like **Juan**, **Marcos**, etc. with password **12345**
    · Moderator: username **admin**, password **12345**.

### Problem: Session expired

· The system uses express-session for authentication.
· If your session expires, you'll be redirected to the login page.
· Simply log in again to continue your work.

## 2. Creating and Managing Incidents (For users)

### Problem: Can't create a new incident

1. Ensure you're logged in as a user (role "usuari").
2. Navigate to the user dashboard.
3. Click the "Afegir incidència" button.
4. Fill in all required fields (description, department, category).

### Problem: Can't see my submitted incidents

· After creating an incident, you should be redirected to a ticket confirmation page.
· To view all your incidents, return to the user dashboard and search your incident by the incident id.
· Note that newly created incidents won't have a technician assigned until a moderator processes them.

## 3. Assigning and Managing Incidents (For moderators)

### Problem: Can't assign technicians to incidents

1. Log in as a moderator (admin).
2. On the moderator dashboard, you'll see unassigned incidents at the top.
3. Use the assignment form to select a technician and set priority.

### Problem: Need to edit incident details

1. From the moderator dashboard, find the incident in the list.
2. Click the edit button for that incident.
3. Update fields as needed (description, priority, department, category, date).
4. Click "Actualitzar" to save changes.

### Problem: Managing reference data

1. As a moderator, you can manage departments, technicians, and categories.
2. Use the respective "Afegir" buttons in each section of the moderator dashboard.

## 4. Working with Incidents (For technicians)

### Problem: Recording actions on assigned incidents

1. Log in as a technician.
2. View your assigned incidents.
3. Click on an incident to add a new action.
4. Fill in the action details (description, hours spent, visibility, resolution status).

### Problem: Can't see all actions for an incident

· As a technician, you can see all actions for incidents assigned to you.
· Navigate to the incident details page to view the complete action history.

## 5. Deployment and System Issues

### Problem: Docker container won't start

1. Ensure Docker and Docker Compose are installed
2. Navigate to the project directory
3. Check if the **.env** file exists with proper configuration
4. Run **docker compose up --build** to rebuild and start containers

### Problem: System logging not working

· The system logs user visits to specific routes.
· Check MongoDB connection if logging isn't working.
· Only main dashboard routes (/usuari, /tecnic, /moderador) are logged.

## 6. Role-Based Access Issues

### Problem: Accessing unauthorized pages

· The system uses role-based middleware to control access.
· Make sure you're logged in with the appropriate role for the page you're trying to access.
· Regular users can only access user pages, technicians can only access technician pages, etc.

### Problem: Redirected to wrong dashboard after login

· The system detects your role and redirects you to the appropriate dashboard.
· If you're redirected incorrectly, check your account's role assignment.

## 7. Data Visualization Issues

### Problem: Statistics not showing on moderator dashboard

· The moderator dashboard includes a chart for visualizing system data.
· If the chart isn't displaying, check browser console for JavaScript errors.
· Ensure Chart.js is loading properly.

## 8. Form Submission Issues

### Problem: Form validation errors

· Ensure all required fields are filled out.
· Check for format errors in date fields (should be DD/MM/YYYY).
· Verify that dropdown selections are valid.

### Problem: Error messages after form submission

· Check server logs for detailed error information.
· Common issues include database constraints or validation failures.
· Try refreshing the page and submitting again.