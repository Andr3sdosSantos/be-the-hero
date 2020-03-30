const express = require('express')
const routes = require('./routes')
const { errors } = require('celebrate')
const cors = require('cors')

const app = express();

app.use(cors()) // Permite que todas as aplicações front-end acessem esse backend
app.use(express.json())
app.use(routes)
app.use(errors())

/**
 * O banco SQLite é salvo como uma extensão de arquivos
 */

/**
 * Para se conectar com banco de dados tem duas formas
 * Query builder: table('users').select('*').where(...)
 * Driver: SELECT * FROM users
 */
module.exports = app