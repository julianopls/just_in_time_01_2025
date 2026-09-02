const express = require('express');

const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

router.get('/usuarios', usuarioController.listarUsuarios);
router.get('/usuario/:id', usuarioController.buscarUsuario);
router.post('/usuario', usuarioController.cadastrarUsuario);
router.put('/usuario', usuarioController.atualizarUsuario);
router.delete('/usuario/:id', usuarioController.excluirUsuario);

module.exports = router;