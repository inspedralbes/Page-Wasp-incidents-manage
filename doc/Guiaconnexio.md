## Com connectar la base de dades a l'aplicació

### 1. Instal·La el paquet mysql2

```bash
npm install mysql2
```

### 2. Crea el arxiu de connexió (db.js)

```js
const mysql = require('mysql2');

// Crea la connexió
const connection = mysql.createConnection({
  host: 'localhost',      // o IP del servidor
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'nombre_de_la_bd'
});

// Connecta't
connection.connect((err) => {
  if (err) {
    console.error('Error de connexió:', err.stack);
    return;
  }
  console.log('Connectat a la base de dades MySQL com ID', connection.threadId);
});

module.exports = connection;
```

### Utilitza la connexió en la teva aplicació (app.js)

```js
const db = require('./db');

// fer una consulta
db.query('SELECT * FROM usuari', (err, results) => {
  if (err) {
    console.error('Error en la consulta:', err);
    return;
  }
  console.log('Resultats:', results);
});
```
#### Recomanacions

· Utilitza variables d'entorn (.env) per ocultar credencials
· Verifica que el servidor de MySQL estigui corrent i sigui accessible.