<h1 align="center">
  <br>
  <a href="https://www.youtube.com/watch?v=EKop9AUitvA"><img src="./content/wasp-logo.png" alt="Markdownify" width="250"></a>
  <br>
  Wasp
  <br>
</h1>

<h4 align="center">A Modifiable Issue Web Page with Docker Compose.</h4>

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white" style="margin: 2px;">
  <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff" style="margin: 2px;">
  <img src="https://img.shields.io/badge/EJS-B4CA65?logo=ejs&logoColor=fff" style="margin: 2px;">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000" style="margin: 2px;">
  <img src="https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=vsc&logoColor=white" style="margin: 2px;">
  <img src="https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white" style="margin: 2px;">
</div>

<div align="center">

[🔑 Key Features](#🔑-key-features) • [🛠️ How To Use](#🛠️-how-to-use) • [📚 Architecture & Docs](#📚-architecture--docs) • [🧩 Dependencies](#🧩-dependencies) • [📦 DataBase](#📦-database)

</div>

---

![Demo de la app](content/wasp.gif)

## 🔑 Key Features

Develop a web application to record, manage and track computer incidents within a company, institute or others. The system allows communication between users, technicians and IT managers, as well as the generation of reports and statistics.

## 🛠️ How To Use

To get started with Wasp, follow these steps:

Clone the repository
Use Git to download the project to your local machine:

```bash
git clone https://github.com/inspedralbes/projecte-1dam-24-25-dam1pj2
cd wasp/
```

Set up environment variables
Create a `.env` file at the root of the project with all required configuration values. This may include the application port, database credentials, session secrets, etc.

Start the app using Docker Compose
The project is containerized using Docker and Docker Compose. Build and start all services with:

```bash
docker compose up --build
```

Access the app in your browser
Once everything is up and running, you can access the application at `http://localhost:3000` or whatever port you’ve configured.

This will launch the full application stack, including the database and the backend server, ready for development or testing.

If you need have the application in the background, you can use:

```bash
docker compose up -d
```

## 📚 Architecture & Docs

If you are interested in knowing more or expanding the project, here is part of the project documentation, how it works, what is needed, and more...

### Documentation
- [Explanation Scripts – Step-by-step code walkthrough](/doc/Explanation-Scripts.md)  
- [Faq – Common questions answered](/doc/Frequently-Asked-Questions.md)  
- [Guide Connection – How to start the system](/doc/Guide-Connection.md)

### Diagrams
- [Related Entity ](/diag/related-entity.pdf)  
- [Screens Overview](/diag/screens.pdf)  
- [Use Cases – How to start the system](/diag/use-cases.pdf)

## 🧩 Dependencies

**Dependencies** are external packages or libraries that our project needs to work properly. In Node.js applications, they are managed through the `package.json` file, where we define all the tools we use to simplify tasks such as running a server, connecting to databases, rendering views, or managing sessions.

This project uses two types of dependencies:

* **Main dependencies (`dependencies`)**: required for the app to run in production.
* **Development dependencies (`devDependencies`)**: only used during development (e.g., to automatically restart the server when code changes).

#### Main Dependencies (`dependencies`)

| Package           | Version | Description                                               |
| ----------------- | ------- | --------------------------------------------------------- |
| `express`         | ^5.1.0  | Web framework for building the backend in Node.js.        |
| `ejs`             | ^3.1.10 | Templating engine to render HTML with JavaScript.         |
| `dotenv`          | ^16.5.0 | Loads environment variables from a `.env` file.           |
| `express-session` | ^1.18.1 | Middleware to manage user sessions.                       |
| `mongoose`        | ^8.14.3 | ODM to interact with MongoDB in a more structured way.    |
| `mongodb`         | ^6.16.0 | Official MongoDB driver for Node.js.                      |
| `mysql2`          | ^3.14.0 | MySQL client compatible with `async/await` and Sequelize. |
| `sequelize`       | ^6.37.7 | ORM for SQL databases like MySQL.                         |
| `sweetalert`      | ^2.1.2  | Stylish and customizable alert boxes for the frontend.    |
| `bootstrap`       | ^5.3.6  | CSS framework for responsive design.                      |
| `bootswatch`      | ^5.3.6  | Ready-made Bootstrap themes.                              |
| `bootstrap-icons` | ^1.13.1 | Collection of SVG icons for Bootstrap.                    |

#### Development Dependencies (`devDependencies`)

| Package   | Version | Description                                           |
| --------- | ------- | ----------------------------------------------------- |
| `nodemon` | ^3.1.10 | Automatically restarts the server during development. |


## 📦 Database

The Page-Wasp Incident Management System uses two databases: MySQL for core application data and MongoDB for logging. MySQL stores structured data such as incidents, users, departments, categories, and technician actions, all managed via Sequelize ORM.

The MySQL connection is set up in db.js, with model relationships and sample data initialized in app.js. Adminer is included for easy web-based database management.

MongoDB handles unstructured logging data, like user activity and usage stats. It’s connected in app.js and uses a simple schema in Stats.js, with logs recorded via middleware.

Both databases are configured in the docker-compose.yml file, along with Adminer (for MySQL) and Mongo Express (for MongoDB). This separation improves scalability, maintainability, and performance.

<p align="right">(<a href="#🔑-key-features">back to top</a>)</p>