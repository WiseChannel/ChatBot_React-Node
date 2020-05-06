const chatbot = require('../chatbot/chatbot')

module.exports = app => {
    app.get('/', (req,res) => {
        res.send({'hello': 'there'})
    })

    app.set('/api/df_text_query', async (req,res) => {
        let response = await chatbot.textQuery(req.body.text, req.body.parameters)
        res.send(response[0].queryResult)
    })

    app.set('/api/df_event_query', async (req,res) => {
        let response = await chatbot.eventQuery(req.body.event, req.body.parameters)
        res.send({'name': 'event query'})
    })
}
