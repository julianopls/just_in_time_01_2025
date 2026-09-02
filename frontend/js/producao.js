const selectProduto = document.getElementById('produto');
const formProducao = document.getElementById('formProducao');
const listaEstoque = document.getElementById('listaEstoque');
const listaProducao = document.getElementById('listaProducao');
const mensagem = document.getElementById('mensagem');

let produtos = [];

const usuario = JSON.parse(localStorage.getItem('usuario'));

if (!usuario) {
    window.location.href = 'login.html';
}

function carregarProdutos() {

    fetch('http://localhost:3000/produtos')

        .then(resposta => resposta.json())

        .then(dados => {
            produtos = dados;
            produtos.sort((a, b) =>
                a.nome.localeCompare(b.nome)
            );

            selectProduto.innerHTML =
                '<option value="">Selecione um produto</option>';

            produtos.forEach(produto => {
                const opcao = document.createElement('option');
                opcao.value = produto.id_produto;
                opcao.textContent = produto.nome;
                selectProduto.appendChild(opcao);

            });

            mostrarEstoque();

        });
}

function mostrarEstoque() {

    listaEstoque.innerHTML = '';
    produtos.forEach(produto => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.quantidade_estoque}</td>
            <td>${produto.estoque_minimo}</td>
        `;

        listaEstoque.appendChild(linha);

    });
}

function listarProducao() {

    fetch('http://localhost:3000/producoes')

        .then(resposta => resposta.json())

        .then(dados => {

            listaProducao.innerHTML = '';
            dados.forEach(producao => {

                const linha = document.createElement('tr');

                linha.innerHTML = `
                    <td>${producao.nome_produto}</td>
                    <td>${producao.tipo}</td>
                    <td>${producao.quantidade}</td>
                    <td>${producao.data}</td>
                    <td>${producao.nome_usuario}</td>
                `;

                listaProducao.appendChild(linha);

            });

        });
}

formProducao.addEventListener('submit', function(event) {

    event.preventDefault();

    const dados = {

        tipo: document.getElementById('tipo').value,
        quantidade:
            document.getElementById('quantidade').value,
        data:
            document.getElementById('data').value,
        id_usuario: usuario.id_usuario,
        id_produto:
            document.getElementById('produto').value

    };

    fetch('http://localhost:3000/producao', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(dados)

    })

    .then(resposta => resposta.json())

    .then(dados => {

        mensagem.textContent = dados.mensagem;

        if (dados.estoque_atual !== undefined) {

            mensagem.textContent +=
                ' Estoque atual: ' + dados.estoque_atual;

        }

        formProducao.reset();

        carregarProdutos();

        listarProducao();

    })

    .catch(() => {

        mensagem.textContent =
            'Erro ao registrar movimentação';

    });

});

carregarProdutos();

listarProducao();