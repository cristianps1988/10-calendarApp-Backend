// Ruta de teachers
// host + /api/teacher

const { Router } = require('express')
const { getTeachers, createTeacher, updateTeacher, deleteTeacher, } = require('../controllers/teacher')
const { validateJWT } = require('../middlewares/validateJWT')
const { check } = require('express-validator')
const { fieldValidator } = require('../middlewares/fieldValidator')

const router = Router()

router.use(validateJWT)

router.get('/', getTeachers)

router.post('/', [
    check('name', 'Name is required').notEmpty().trim(),
    check('name', 'Too short').isLength({ min: 3 }),
    check('nationalId', 'Identification is required').notEmpty().trim(),
    check('nationalId', 'Must be a number').isNumeric(),
    check('nationalId', 'Too short').isLength({ min: 5 }),
    fieldValidator
],
    createTeacher)

router.put('/:id', updateTeacher)

router.delete('/:id', deleteTeacher)

module.exports = router