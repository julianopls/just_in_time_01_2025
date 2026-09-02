const db = require('../database/database');

function listarUsuarios(req, res) {

    db.query('SELECT * FROM usuario', (erro, resultado) => {

        if (erro) {
            return res.status(500).json({
                mensagem: 'Erro ao listar usuários'
            });
        }

        res.json(resultado);
    });
}

function buscarUsuario(req, res) {

    const id = req.params.id;

    db.query(
        'SELECT * FROM usuario WHERE id_usuario = ?',
        [id],
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    mensagem: 'Erro ao buscar usuário'
                });
            }

            res.json(resultado);
        }
    );
}

function cadastrarUsuario(req, res) {

    const { nome, email, senha } = req.body;

    db.query(
        'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, senha],
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    mensagem: 'Erro ao cadastrar usuário'
                });
            }

            res.status(201).json({
                mensagem: 'Usuário cadastrado com sucesso',
                id: resultado.insertId
            });
        }
    );
}

function atualizarUsuario(req, res) {

    const { id_usuario, nome, email, senha } = req.body;

    db.query(
        `UPDATE usuario
         SET nome = ?, email = ?, senha = ?
         WHERE id_usuario = ?`,
        [nome, email, senha, id_usuario],
        (erro) => {

            if (erro) {
                return res.status(500).json({
                    mensagem: 'Erro ao atualizar usuário'
                });
            }

            res.json({
                mensagem: 'Usuário atualizado com sucesso'
            });
        }
    );
}

function excluirUsuario(req, res) {

    const id = req.params.id;

    db.query(
        'DELETE FROM usuario WHERE id_usuario = ?',
        [id],
        (erro) => {

            if (erro) {
                return res.status(500).json({
                    mensagem: 'Erro ao excluir usuário'
                });
            }

            res.json({
                mensagem: 'Usuário excluído com sucesso'
            });
        }
    );
}

module.exports = {
    listarUsuarios,
    buscarUsuario,
    cadastrarUsuario,
    atualizarUsuario,
    excluirUsuario
};