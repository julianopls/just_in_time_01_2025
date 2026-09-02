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
        quantidade,
        data,
        id_usuario,
        id_produto
    } = req.body;

    // Verifica se o tipo é válido
    if (tipo !== 'fabricado' && tipo !== 'pedido') {
        return res.status(400).json({
            mensagem: 'O tipo deve ser fabricado ou pedido'
        });
    }

    // Verifica a quantidade
    if (quantidade <= 0) {
        return res.status(400).json({
            mensagem: 'A quantidade deve ser maior que zero'
        });
    }

    // Busca o produto
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

            // Se for pedido, verifica o estoque
            if (tipo === 'pedido' && produto.quantidade_estoque < quantidade) {
                return res.status(400).json({
                    mensagem: 'Estoque insuficiente'
                });
            }

            let novoEstoque;

            if (tipo === 'fabricado') {
                novoEstoque = produto.quantidade_estoque + quantidade;
            } else {
                novoEstoque = produto.quantidade_estoque - quantidade;
            }

            // Atualiza o estoque
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

                    // Registra a produção
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

                            let mensagem = 'Movimentação registrada com sucesso';

                            // Verifica estoque mínimo
                            if (
                                tipo === 'pedido' &&
                                novoEstoque < produto.estoque_minimo
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