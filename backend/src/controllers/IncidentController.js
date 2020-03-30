const connection = require('../database/connection')

module.exports = {
  /**
   * Fazendo a paginação do site de 5 em 5 e retornando o total de casos
   */
  async index(req, res) {
    const { page = 1 } = req.query

    const [ count ] = await connection('incidents').count()

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // Relaciona dados de 2 tabelas
      .limit(5)
      .offset((page -1) * 5)
      // Pega todos os dados de 'incidents', porém de 'ongs' pegue: name, email...
      .select([
        'incidents.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
      ])

    res.header('X-Total-Count', count['count(*)'])

    return res.json( incidents )
  },

  async create(req, res) {
    const { title, description, value } = req.body
    const ong_id = req.headers.authorization

    const [id] = await connection('incidents').insert({
      title, description, value, ong_id
    })

    return res.json({ id })
  },

  async delete(req, res) {
    const { id } = req.params 
    const ong_id = req.headers.authorization

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first() // Retorna apenas um resultado

      if(incident.ong_id !== ong_id) {
        return res.status(401).json({ error: 'Unauthorization step' })
      }

      await connection('incidents').where('id', id).delete()

      return res.status(204).send()
  }
}