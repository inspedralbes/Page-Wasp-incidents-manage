## System Overview

This page is a web application designed to manage the entire lifecycle of technical incidents. It allows users to report issues, technicians to resolve them, and moderators to administer the system.

## User Roles

The system has three distinct user roles, each with different permissions and interfaces:

### 1. User (Usuari)

· Can report incidents.
· Can view their own incidents.
· Can view public actions taken on their incidents.

### 2. Technician (Tècnic)

· Can view assigned incidents.
· Can add actions to incidents.
· Can mark incidents as resolved.
· Can view all actions on assigned incidents.

### 3. Moderator (Moderador)

· Has full system management access.
· Can assign incidents to technicians.
· Can manage departments, categories, and technicians.
· Can view statistics.

## Navigation

The system's navigation bar allows you to access different sections based on your role.

## Key Features

### Incident Management

#### Creating incidents (user)

Users can create new incidents by providing:

· Description.
· Department.
· Date of incident.

#### Viewing Incidents

· Users can view their own incidents.
· Technicians can view incidents assigned to them.
· Moderators can view all incidents.

#### Editiing incidents (Moderator)

Moderators can edit incident details.

### Action Tracking

Technicians can document work performed on incidents.

### Moderator Dashboard

The moderator dashboard provides comprehensive management capabilities.

### Statistics and Reporting

Moderators can view system statistics.

## Reference Data Management

### Department Management

Moderators can manage departments with:

· Department name
·Location information

### Category Management

Moderators can manage incident categories.

### Technicians Management

Moderators can manage technician accounts:

· Create new technicians.
· Edit existing technicians.
· Delete technicians when no longer needed.

## System Logging

The system logs user activity for auditing purposes.

## Default Accounts

The system initializes with these default accounts:

**User**: username: *user*, password: *12345*
**Moderator**: username: *admin*, password: *12345*
**Technicians**: Several technicians with password: *12345*

## Theme Settings

The system supports both light and dark themes, which can be toggled using the theme selector in the navigation bar.
