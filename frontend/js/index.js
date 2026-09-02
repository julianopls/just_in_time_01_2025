const usuario = localStorage.getItem('usuario');

if (!usuario) {
    window.location.href = 'login.html';
} else {

    const dadosUsuario = JSON.parse(usuario);

    document.getElementById('nomeUsuario').textContent =
        dadosUsuario.nome;
}

document.getElementById('btnSair').addEventListener('click', function() {

    localStorage.removeItem('usuario');

    window.location.href = 'login.html';

});