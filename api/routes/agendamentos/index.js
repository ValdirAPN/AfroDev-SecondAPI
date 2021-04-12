const router = require('express').Router()
const TabelaAgendamento = require('../../agendamentos/TabelaAgendamento')
const Agendamento = require('../../agendamentos/Agendamento')
const { SerializarAgendamento }= require('../../Serializar')

router.get('/agendamentos', async (req, res) => {
    try {
        const results = await TabelaAgendamento.listar()
        const serializador = new SerializarAgendamento(
            res.getHeader('Content-Type'),
            ['nome_servico', 'status']
        )
        agendamentos = serializador.transformar(results)
        res.status(200).send(agendamentos)
    } catch (error) {
        res.send(error)
    }
})

router.post('/agendamentos', async (req, res) => {
    const reqAgendamento = req.body
    const agendamento = new Agendamento(reqAgendamento)
    await agendamento.criar()
    res.send(JSON.stringify(agendamento))
})

router.get('/agendamentos/:idAgendamento', async (req, res) => {
    try {
        const id = req.params.idAgendamento
        const agendamento = new Agendamento({id:id})
        await agendamento.buscar()
        res.send(JSON.stringify(agendamento))
    } catch (error) {
        res.send(JSON.stringify({
            message: error.message
        }))
    }
})

router.delete('/agendamentos/:idAgendamento', async (req, res) => {
    try {
        const id = req.params.idAgendamento
        const agendamento = new Agendamento({id:id})
        await agendamento.remover()
        res.status(204).send(JSON.stringify({
            message: 'Removido com sucesso'
        }))
    } catch (error) {
        res.send(JSON.stringify({
            message: error.message
        }))
    }
})

router.put('/agendamentos/:idAgendamento', async (req, res) => {
    try {
        const id = req.params.idAgendamento
        const dadosBody = req.body
        const dados = Object.assign({}, dadosBody, {id:id})
        const agendamento = new Agendamento(dados)
        await agendamento.atualizar()

        res.status(204).send(JSON.stringify(agendamento))
    }
    catch(error) {() => {
            res.send(JSON.stringify({
                message: error.message
            }))
        }
    }
})

module.exports = router