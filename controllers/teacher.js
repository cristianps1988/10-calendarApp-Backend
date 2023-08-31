const { response } = require('express');
const Teacher = require('../models/Teacher');

const getTeachers = async (req, res = response) => {
    const teachers = await Teacher.find().populate('user', 'name')
    let myTeachers = []
    teachers.forEach(event => {
        const isMyTeacher = event.user.name === req.name
        if (isMyTeacher) {
            myTeachers.push(event)
        }
    });

    res.json({
        ok: true,
        teachers: myTeachers
    })
}
const createTeacher = async (req, res = response) => {
    const teacher = new Teacher(req.body)
    try {
        teacher.user = req.uid
        const teacherSaved = await teacher.save()
        res.json({
            ok: true,
            teacher: teacherSaved
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contact the administrator'
        })
    }
}

const updateTeacher = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'updateTeacher'
    })
}

const deleteTeacher = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteTeacher'
    })
}

module.exports = {
    getTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher,
}