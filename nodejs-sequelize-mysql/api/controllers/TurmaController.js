const database = require('../models')

class TurmaController {
    static async pegaTodasAsTurmas(req, res) {
        try {
            const todasAsTurmas = await database.Turmas.findAll()
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async pegaUmaTurma(req, res) {
        try {
            const { id } = req.params;
            const turma = await database.Turmas.findOne(
                { 
                    where: 
                    { 
                        id: Number(id)
                    }
                });
            return res.status(200).json(turma);
        } catch(error) {
            return res.status(500).json(error.message);
        }
      }
      static async criaTurma(req, res) {
          const novaTurma = req.body;
          try {
              const novaTurmaCriada = await database.Turmas.create(novaTurma);
              return res.status(200).json(novaTurmaCriada);
          } catch(error) {
              return res.status(500).json(error.message);
          }
      }
      static async atualizaTurma(req, res) {
          const { id } = req.params;
          const atualizaTurma = req.body;
          try {
              await database.Turmas.update(
                atualizaTurma, {where:{id: Number(id)}});
              const turma = await database.Turmas.findOne(
                  {where:{id: Number(id)}});
              return res.status(200).json(turma);
          } catch(error) {
              return res.status(500).json(error.message);
          }
      }
      static async apagaTurma(req, res) {
          const { id } = req.params;
          try {
              await database.Turmas.destroy({where:{id: Number(id)}});
              return res.status(200).json({ mensagem: `id ${id} deletado` });
          } catch(error) {
              return res.status(500).json(error.message);
          }
      }
}

module.exports = TurmaController;