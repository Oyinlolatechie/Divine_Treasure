require('dotenv').config()

const config = {
    PORT: process.env.PORT,
    MongoDB_URI: process.env.MongoDB_URI
}

module.exports = config