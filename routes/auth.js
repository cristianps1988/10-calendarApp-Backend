// Rutas de usuario / auth
// host + /api/auth

const { Router } = require('express')
const { check } = require('express-validator')
const { registerUser, loginUser, renewToken } = require('../controllers/auth')
const { fieldValidator } = require('../middlewares/fieldValidator')
const { validateJWT } = require('../middlewares/validateJWT')
const router = Router()

router.post(
    '/new',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('name', 'Too short').isLength({ min: 3 }),
        check('email', 'Email is required').isEmail(),
        check('password', 'The password must have at least 6 characters').isLength({ min: 6 }),
        fieldValidator
    ],
    registerUser)

router.post('/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'The password must have at least 6 characters').isLength({ min: 6 }),
        fieldValidator
    ],
    loginUser)

router.get('/renew', validateJWT, renewToken)

module.exports = router;