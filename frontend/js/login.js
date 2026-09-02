const formLogin = document.getElementById('formLogin');

formLogin.addEventListener('submit', async function(event) {

    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');

    try {

        const resposta = await fetch('http://localhost:3000/login', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            mensagem.textContent = dados.mensagem;
            return;
        }

        localStorage.setItem(
            'usuario',
            JSON.stringify(dados.usuario)
        );

        window.location.href = 'index.html';

    } catch (erro) {

        mensagem.textContent = 'Não foi possível conectar ao servidor';

    }

});