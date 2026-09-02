const db = require('../database/database');

function listarProducoes(req, res) {
    db.query(
        `SELECT producao.*, produto.nome AS nome_produto, usuario.nome AS nome_usuario
         FROM producao
         INNER JOIN produto ON producao.id_produto = produto.id_produto
         INNER JOIN usuario ON producao.id_usuario = usuario.id_usuario`,
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json({
                    mensagem: 'Erro ao listar produções'
                });
            }

            res.json(resultado);
        }
    );
}

function cadastrarProducao(req, res) {

    const {
        tipo,
        data,
        id_usuario,
        id_produto
    } = req.body;

    const quantidade = Number(req.body.quantidade);

    if (tipo !== 'fabricado' && tipo !== 'pedido') {
        return res.status(400).json({
            mensagem: 'O tipo deve ser fabricado ou pedido'
        });
    }

    if (quantidade <= 0 || isNaN(quantidade)) {
        return res.status(400).json({
            mensagem: 'A quantidade deve ser maior que zero'
        });
    }

    db.query(
        'SELECT * FROM produto WHERE id_produto = ?',
        [id_produto],
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    mensagem: 'Erro ao buscar produto'
                });
            }

            if (resultado.length === 0) {
                return res.status(404).json({
                    mensagem: 'Produto não encontrado'
                });
            }

            const produto = resultado[0];

            const estoqueAtual = Number(produto.quantidade_estoque);
            const estoqueMinimo = Number(produto.estoque_minimo);

            if (tipo === 'pedido' && estoqueAtual < quantidade) {
                return res.status(400).json({
                    mensagem: 'Estoque insuficiente'
                });
            }

            let novoEstoque;

            if (tipo === 'fabricado') {
                novoEstoque = estoqueAtual + quantidade;
            } else {
                novoEstoque = estoqueAtual - quantidade;
            }

            db.query(
                `UPDATE produto
                 SET quantidade_estoque = ?
                 WHERE id_produto = ?`,
                [novoEstoque, id_produto],
                (erro) => {

                    if (erro) {
                        return res.status(500).json({
                            mensagem: 'Erro ao atualizar estoque'
                        });
                    }

                    db.query(
                        `INSERT INTO producao
                        (tipo, quantidade, data, id_usuario, id_produto)
                        VALUES (?, ?, ?, ?, ?)`,
                        [
                            tipo,
                            quantidade,
                            data,
                            id_usuario,
                            id_produto
                        ],
                        (erro, resultado) => {

                            if (erro) {
                                return res.status(500).json({
                                    mensagem: 'Erro ao cadastrar produção'
                                });
                            }

                            let mensagem =
                                'Movimentação registrada com sucesso';

                            if (
                                tipo === 'pedido' &&
                                novoEstoque < estoqueMinimo
                            ) {
                                mensagem =
                                    'Movimentação registrada. Atenção: estoque abaixo do mínimo!';
                            }

                            res.status(201).json({
                                mensagem: mensagem,
                                id: resultado.insertId,
                                estoque_atual: novoEstoque
                            });
                        }
                    );
                }
            );
        }
    );
}

module.exports = {
    listarProducoes,
    cadastrarProducao
};