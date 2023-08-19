// Rutas de events
// host + /api/events


const { Router } = require('express')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
const { fieldValidator } = require('../middlewares/fieldValidator')
const { isDate } = require('../helpers/isDate')
const { validateJWT } = require('../middlewares/validateJWT')
const { check } = require('express-validator')

const router = Router()

// validar todas las peticiones con el validateJWT
router.use(validateJWT)


router.get('/', getEvents)

router.post('/',
    [
        check('start', 'Start is required').custom(isDate),
        check('end', 'End is required').custom(isDate),
        check('course', 'Course is required').not().isEmpty(),
        check('semester', 'Semester is required').not().isEmpty(),
        check('group', 'Group is required').not().isEmpty(),
        check('teacher', 'Teacher is required').not().isEmpty(),
        fieldValidator
    ],
    createEvent)

router.put('/:id',
    [
        check('start', 'Start is required').custom(isDate),
        check('end', 'End is required').custom(isDate),
        check('course', 'Course is required').not().isEmpty(),
        check('semester', 'Semester is required').not().isEmpty(),
        check('group', 'Group is required').not().isEmpty(),
        check('teacher', 'Teacher is required').not().isEmpty(),
        fieldValidator
    ],
    updateEvent)

router.delete('/:id', deleteEvent)

module.exports = router