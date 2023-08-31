const { response } = require('express');
const Group = require('../models/Group');

const getGroups = async (req, res = response) => {
    const groups = await Group.find().populate('user', 'name')
    let myGroups = []
    groups.forEach(event => {
        const isMyGroup = event.user.name === req.name
        if (isMyGroup) {
            myGroups.push(event)
        }
    });

    res.json({
        ok: true,
        groups: myGroups
    })
}
const createGroup = async (req, res = response) => {
    const group = new Group(req.body)
    try {
        group.user = req.uid
        const groupSaved = await group.save()
        res.json({
            ok: true,
            group: groupSaved
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contact the administrator'
        })
    }

}

const updateGroup = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'updateGroup'
    })
}

const deleteGroup = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteGroup'
    })
}

module.exports = {
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup,
}