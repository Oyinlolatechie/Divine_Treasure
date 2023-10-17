const { Schema, default: mongoose } = require('mongoose')

const schoolDataSchema = new Schema({
    "teacher": {
        type: Number,
    },
    "number": {
        type: Number
    },
    "pass_rate": {
        type: String
    },
    "years": {
        type: Number
    },
    "students": {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('schooldata', schoolDataSchema)