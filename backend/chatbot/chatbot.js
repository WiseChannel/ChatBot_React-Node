const dialogFlow = require('dialogflow')
const structjson = require('./structjson')
const config = require('../config/config')
const sessionClient = new dialogFlow.SessionsClient();

const projectID = config.googleProjectID

const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivetKey
}

const sessionPath = sessionClient({ projectID, credentials })


module.exports = {
    eventQuery: async (event, paramaters = {}) => {
        let self = module.exports
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    paramaters: structjson.jsonToStructProto(paramaters),
                    languageCode: config.dialogFlowSessionLanguageCode
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
