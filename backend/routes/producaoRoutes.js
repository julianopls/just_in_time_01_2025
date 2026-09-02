const express = require('express');
const router = express.Router();

const producaoController = require('../controllers/producaoController');

router.get('/producoes', producaoController.listarProducoes);
router.post('/producao', producaoController.cadastrarProducao);

module.exports = router;