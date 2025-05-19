# Frequently Asked Questions

### 1. What are the different user roles and what can each do?

**Answer:**  
The Wasp system has three different user roles, each with different levels of access and functionalities:

- **Regular User:**  
  Can create new incidents and view the status of the incidents they have created. They access through the user page.  
  `auth.js:15-17`

- **Technician:**  
  Can view incidents assigned to them, log actions taken to resolve incidents, and mark them as resolved. They have access to their own technician page where they can manage their tasks.  
  `auth.js:28-33` `app.js:111-130`

- **Moderator:**  
  Has full access to the system. Can create, assign, edit, and delete incidents, manage technicians, departments, and categories, and view statistics. Moderators are the system administrators.  
  `auth.js:20-25` `app.js:133-149`

### 2. How does the incident management process work?

**Answer:**  
The Wasp system follows a complete workflow for incident management:

- **Incident Creation:**  
  Users create incidents by providing a description, related department, and category.  
  `incidencias.controllers.js:61-69`

- **Assignment:**  
  Moderators review unassigned incidents and assign them to available technicians, also setting a priority (High, Medium, or Low).  
  `incidencias.controllers.js:84-101`

- **Management and Tracking:**  
  Technicians log their actions on assigned incidents, indicating hours spent and work done.  
  `Actuaciones.js:1-30`

- **Resolution:**  
  When an incident is resolved, the technician marks it as resolved and total hours spent are recorded.  
  `Incidencias.js:18-22`

### 3. How are incidents prioritized and categorized in the system?

**Answer:**  
The Wasp system enables effective incident management through:

- **Prioritization:**  
  Incidents can be marked with different priority levels:  
  - **High:** For urgent issues requiring immediate attention  
  - **Medium:** For important but not critical issues  
  - **Low:** For minor issues that can wait  
  `Incidencias.js:9-12` `app.js:208-229`

- **Categorization:**  
  Incidents are classified into predefined categories such as:  
  - **IT:** For problems related to computer equipment and systems  
  - **Logistics:** For supply or resource management issues  
  - **Maintenance:** For general maintenance problems  
  `app.js:203-205`

- **Departments:**  
  Each incident is linked to a specific department (Physics, Administration, IT, etc.), which helps contextualize and properly manage it.  
  `app.js:187-192`