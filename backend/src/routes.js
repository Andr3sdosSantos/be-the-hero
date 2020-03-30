const { Router } = require('express')
const { celebrate, Segments, Joi } = require('celebrate')


const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = new Router()
// Rota para login
routes.post('/sessions', SessionController.create)
// Rota para listar todas as ONG's
routes.get('/ongs', OngController.index)
// Rota para criar as ONG's
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), OngController.create)
// Rota para listar todos os incidentes
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), IncidentController.index)
// Rota para criar um incidente
routes.post('/incidents', IncidentController.create)
// Rota para deletar UM incidente
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), IncidentController.delete)
// Rota para listar todos os incidentes de uma ONG
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), ProfileController.index)

/**
 * Normalmente as validações são colocadas nas rotas de criação e alteração.
 */

module.exports = routes
