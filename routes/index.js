const express = require('express');
const router = express.Router();

const {
  comandoLer,
  comandoParar,
} = require('../controllers/comandoController');

const {
  buscarClientePorNome,
  buscarClientePorTag,
} = require('../controllers/buscarController');

const {
  cadastroController,
} = require('../controllers/cadastroController');

const{
  deletarPorTag,
} = require('../controllers/deletarController');

// Rota genérica
router.post('/comando', comandoLer);

router.post('/comandoParar', comandoParar);

router.post('/buscar', buscarClientePorNome);

router.post('/buscarTag', buscarClientePorTag);

router.post('/cadastro', cadastroController);

router.post('/deletar', deletarPorTag);

module.exports = router;
