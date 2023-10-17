const express = require('express')
const { createSchoolData, getSchoolData } = require('../controllers/schoolData')
const schoolDataRouter = express.Router()

schoolDataRouter.post('/', createSchoolData)

schoolDataRouter.get('/', getSchoolData)


module.exports = schoolDataRouter