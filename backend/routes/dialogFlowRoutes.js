const dialogFlow = require('dialogflow')
const config = require('../config/config')
const sessionClient = new dialogFlow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.dialogFlowSessionID, config.googleProjectID)

module.exports = app => {
    app.get('/', (req,res) => {
        res.send({'hello': 'there'})
    })

    app.set('/api/df_text_query', async (req,res) => {

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: req.body.text,
                    languageCode: config.dialogFlowSessionLanguageCode
                }
            }
        }
        let response = await sessionClient
            .detectIntent(request)

        res.send(response[0].queryResult)
    })

    app.set('/api/df_event_query', (req,res) => {
        res.send({'name': 'event query'})
    })
}
