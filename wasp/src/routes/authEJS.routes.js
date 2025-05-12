const express = require('express');
const router = express.Router();
const { loginView, loginUser } = require('../controllers/auth'); 

// Ruta para mostrar el formulario de login
router.get('/login', loginView);

// Ruta para procesar el login
router.post('/login', loginUser);

module.exports = router;
