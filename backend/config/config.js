API_KEY = '810291d8ca8e4ca4a2c98896d2602eb4'
DEV_ACCESS_TOKEN = 'f417e12cd43d42f488f11a84b644aa84'

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}
