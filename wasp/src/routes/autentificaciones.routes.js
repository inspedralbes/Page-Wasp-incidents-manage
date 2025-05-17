const express = require('express');
const router = express.Router();
const { loginView, loginUser } = require('../controllers/autentificaciones.controllers'); 

router.get('/login', loginView);

router.post('/login', loginUser);

module.exports = router;
