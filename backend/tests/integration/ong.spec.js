const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(() => {
    connection.destroy()
  })

  it('should be able to create a new ONG', async () => {
    const res = await request(app)
      .post('/ongs')
      .send({
        name: "Rocketseat",
        email: "rocket@contato.com.br",
        whatsapp: "2400000000",
        city: "Rio do Sul",
        uf: "SC"
      })

      expect(res.body).toHaveProperty('id') // Espera retornar o 'id'
      expect(res.body).toHaveLength(8) // Espera que o 'id' tenha 8 caracteres
  })
})