const listaProdutos = document.getElementById('listaProdutos');
const formProduto = document.getElementById('formProduto');
const pesquisa = document.getElementById('pesquisa');
const mensagem = document.getElementById('mensagem');

let produtos = [];

function listarProdutos() {

    fetch('http://localhost:3000/produtos')
        .then(resposta => resposta.json())
        .then(dados => {

            produtos = dados;

            mostrarProdutos(produtos);

        })
        .catch(() => {

            mensagem.textContent = 'Erro ao carregar produtos';

        });
}

function mostrarProdutos(lista) {

    listaProdutos.innerHTML = '';

    lista.forEach(produto => {

        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${produto.id_produto}</td>
            <td>${produto.nome}</td>
            <td>${produto.descricao}</td>
            <td>R$ ${produto.custo}</td>
            <td>${produto.quantidade_estoque}</td>
            <td>${produto.estoque_minimo}</td>

            <td>
                <button class="editar"
                    onclick="editarProduto(${produto.id_produto})">
                    Editar
                </button>

                <button class="excluir"
                    onclick="excluirProduto(${produto.id_produto})">
                    Excluir
                </button>
            </td>
        `;

        listaProdutos.appendChild(linha);

    });
}

formProduto.addEventListener('submit', function(event) {

    event.preventDefault();

    const id = formProduto.dataset.id;

    const produto = {

        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        custo: document.getElementById('custo').value,
        quantidade_estoque:
            document.getElementById('quantidade_estoque').value,
        estoque_minimo:
            document.getElementById('estoque_minimo').value
    };

    let url = 'http://localhost:3000/produto';
    let metodo = 'POST';

    if (id) {

        produto.id_produto = id;

        metodo = 'PUT';

    }

    fetch(url, {

        method: metodo,

        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)

    })
    .then(resposta => resposta.json())

    .then(dados => {

        mensagem.textContent = dados.mensagem;
        formProduto.reset();
        delete formProduto.dataset.id;

        listarProdutos();

    })
    .catch(() => {

        mensagem.textContent = 'Erro ao salvar produto';

    });

});

function excluirProduto(id) {

    if (!confirm('Deseja excluir este produto?')) {
        return;
    }

    fetch(`http://localhost:3000/produto/${id}`, {

        method: 'DELETE'

    })
    .then(resposta => resposta.json())

    .then(dados => {
        mensagem.textContent = dados.mensagem;

        listarProdutos();
    })
    .catch(() => {

        mensagem.textContent = 'Erro ao excluir produto';

    });
}

function editarProduto(id) {
    const produto = produtos.find(
        produto => produto.id_produto === id
    );
    document.getElementById('nome').value = produto.nome;
    document.getElementById('descricao').value = produto.descricao;
    document.getElementById('custo').value = produto.custo;
    document.getElementById('quantidade_estoque').value = produto.quantidade_estoque;
    document.getElementById('estoque_minimo').value = produto.estoque_minimo;
    formProduto.dataset.id = id;

    mensagem.textContent =
        'Edite os dados e clique em cadastrar para salvar.';
}

pesquisa.addEventListener('input', function() {

    const texto = pesquisa.value.toLowerCase();

    const resultado = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(texto)
    );

    mostrarProdutos(resultado);

});

listarProdutos();