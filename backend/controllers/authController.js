const db = require('../database/database');

function login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            mensagem: 'Email e senha são obrigatórios'
        });
    }

    db.query(
        'SELECT * FROM usuario WHERE email = ? AND senha = ?',
        [email, senha],
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    mensagem: 'Erro ao realizar login'
                });
            }

            if (resultado.length === 0) {
                return res.status(401).json({
                    mensagem: 'Email ou senha incorretos'
                });
            }

            const usuario = resultado[0];

            res.json({
                mensagem: 'Login realizado com sucesso',
                usuario: {
                    id_usuario: usuario.id_usuario,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });
        }
    );
}

module.exports = {
    login
};