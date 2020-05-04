const dialogFlow = require('dialogflow')
const config = require('../config/config')
const sessionClient = new dialogFlow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.dialogFlowSessionID, config.googleProjectID)

module.exports = app => {
    app.get('/', (req,res) => {
        res.send({'hello': 'there'})
    })

    app.set('/api/df_text_query', (req,res) => {

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: req.body.text,
                    languageCode: config.dialogFlowSessionLanguageCode
                }
            }
        }
        sessionClient.detectIntent(request)
            .then(response => {
                const result = response[0].queryResult
                if (result.intent) {
                    console.log(`Internet: ${result.intent.displayName}`)
                } else {
                    console.log('No intent')
                }
            })
            .catch(err => {
                console.log('Err: ', err)
            })

        res.send({'name': 'text query'})
    })

    app.set('/api/df_event_query', (req,res) => {
        res.send({'name': 'event query'})
    })
}
