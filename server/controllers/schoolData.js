const schoolDataModel = require('../models/schoolDataModel')

exports.createSchoolData = async (req, res, next) => {
    const { teacher, number, pass_rate, years, students } = req.body

    try {
        const newSchoolData = new schoolDataModel({
            teacher,
            number,
            pass_rate,
            years,
            students
        })

        const savedData = await newSchoolData.save()

        res.status(201).json({
            status: "success",
            data: savedData,
            message: "data successful created"
        })

    } catch (error) {
        next(error)
    }
}


exports.getSchoolData = async (req, res, next) => {

    try {
        const schoolData = await schoolDataModel.find()

        res.status(200).json({
            status: "success",
            data: schoolData,
            message: "data fecthed successfully"
        })
    } catch (error) {
        next(error)
    }
}