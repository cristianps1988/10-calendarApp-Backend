const { response } = require('express');
const Course = require('../models/Course');

const getCourses = async (req, res = response) => {
    const courses = await Course.find().populate('user', 'name')
    let myCourses = []
    courses.forEach(event => {
        const isMyCourse = event.user.name === req.name
        if (isMyCourse) {
            myCourses.push(event)
        }
    });

    res.json({
        ok: true,
        courses: myCourses
    })
}
const createCourse = async (req, res = response) => {
    const course = new Course(req.body)
    try {
        course.user = req.uid
        const courseSaved = await course.save()
        res.json({
            ok: true,
            course: courseSaved
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contact the administrator'
        })
    }

}

const updateCourse = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'updateCourse'
    })
}

const deleteCourse = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteCourse'
    })
}

module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
}