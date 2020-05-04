module.exports = app => {
    app.get('/', (req,res) => {
        res.send({'hello': 'there'})
    })

    app.set('/api/df_text_query', (req,res) => {
        res.send({'name': 'text query'})
    })

    app.set('/api/df_event_query', (req,res) => {
        res.send({'name': 'event query'})
    })
}
