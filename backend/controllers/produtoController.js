const db = require('../database/database');

function listarProdutos(req, res) {
    db.query('SELECT * FROM produto', (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                mensagem: 'Erro ao listar produtos'
            });
        }

        res.json(resultado);
    });
}

function buscarProduto(req, res) {
    const id = req.params.id;

    db.query(
        'SELECT * FROM produto WHERE id_produto = ?',
        [id],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json({
                    mensagem: 'Erro ao buscar produto'
                });
            }

            res.json(resultado);
        }
    );
}

function cadastrarProduto(req, res) {
    const {
        nome,
        descricao,
        custo,
        quantidade_estoque,
        estoque_minimo
    } = req.body;

    db.query(
        `INSERT INTO produto 
        (nome, descricao, custo, quantidade_estoque, estoque_minimo)
        VALUES (?, ?, ?, ?, ?)`,
        [
            nome,
            descricao,
            custo,
            quantidade_estoque,
            estoque_minimo
        ],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json({
                    mensagem: 'Erro ao cadastrar produto'
                });
            }

            res.status(201).json({
                mensagem: 'Produto cadastrado com sucesso',
                id: resultado.insertId
            });
        }
    );
}

function atualizarProduto(req, res) {
    const {
        id_produto,
        nome,
        descricao,
        custo,
        quantidade_estoque,
        estoque_minimo
    } = req.body;

    db.query(
        `UPDATE produto
         SET nome = ?, descricao = ?, custo = ?,
             quantidade_estoque = ?, estoque_minimo = ?
         WHERE id_produto = ?`,
        [
            nome,
            descricao,
            custo,
            quantidade_estoque,
            estoque_minimo,
            id_produto
        ],
        (erro) => {
            if (erro) {
                return res.status(500).json({
                    mensagem: 'Erro ao atualizar produto'
                });
            }

            res.json({
                mensagem: 'Produto atualizado com sucesso'
            });
        }
    );
}

function excluirProduto(req, res) {
    const id = req.params.id;

    db.query(
        'DELETE FROM produto WHERE id_produto = ?',
        [id],
        (erro) => {
            if (erro) {
                return res.status(500).json({
                    mensagem: 'Erro ao excluir produto'
                });
            }

            res.json({
                mensagem: 'Produto excluído com sucesso'
            });
        }
    );
}

module.exports = {
    listarProdutos,
    buscarProduto,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto
};