const dialogFlow = require('dialogflow')
const config = require('../config/config')
const sessionClient = new dialogFlow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.dialogFlowSessionID, config.googleProjectID)


module.exports = {
    textQuery: async (text, paramaters = {}) => {
        let self = module.exports
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: req.body.text,
                    languageCode: config.dialogFlowSessionLanguageCode
                }
            },
            queryParams: {
                payload: {
                    data: paramaters
                }
            }
        }
        let responses = await sessionClient
            .detectIntent(request)
        responses = await self.handleAction(responses)
        return responses
    },

    handleAction: (responses) => {
        return responses
    }
}
