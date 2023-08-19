const { response } = require('express');
const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/generateJWT')

const registerUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists'
            })
        }
        user = new User(req.body)

        // encrypt password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ups, something went wrong. Please contact the administrator'
        })
    }

}

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User dont exists'
            })
        }
        // confirm password
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password'
            })
        }

        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })


    } catch (error) {
        console.log(error)
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ups, something went wrong. Please contact the administrator'
        })
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    // generar nuevo JWT
    const token = await generateJWT(uid, name)

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    registerUser,
    loginUser,
    renewToken
}