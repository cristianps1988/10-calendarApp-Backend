// Ruta de group
// host + /api/group

const { Router } = require('express')
const { getGroups, createGroup, updateGroup, deleteGroup, } = require('../controllers/group')
const { validateJWT } = require('../middlewares/validateJWT')
const { check } = require('express-validator')
const { fieldValidator } = require('../middlewares/fieldValidator')

const router = Router()

router.use(validateJWT)

router.get('/', getGroups)

router.post('/', [
    check('semester', 'Semester is required').notEmpty(),
    check('group', 'Group is required').notEmpty().trim(),
    fieldValidator
],
    createGroup)

router.put('/:id', updateGroup)

router.delete('/:id', deleteGroup)

module.exports = router