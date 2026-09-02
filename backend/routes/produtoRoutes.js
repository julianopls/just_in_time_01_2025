const express = require('express');
const router = express.Router();

const produtoController = require('../controllers/produtoController');

router.get('/produtos', produtoController.listarProdutos);
router.get('/produto/:id', produtoController.buscarProduto);
router.post('/produto', produtoController.cadastrarProduto);
router.put('/produto', produtoController.atualizarProduto);
router.delete('/produto/:id', produtoController.excluirProduto);

module.exports = router;