const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const producaoRoutes = require('./routes/producaoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(usuarioRoutes);
app.use(produtoRoutes);
app.use(producaoRoutes);
app.use(authRoutes);

app.get('/', (req, res) => {
    res.send('API funcionando!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});