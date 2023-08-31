// Ruta de courses
// host + /api/course

const { Router } = require('express')
const { getCourses, createCourse, updateCourse, deleteCourse, } = require('../controllers/course')
const { validateJWT } = require('../middlewares/validateJWT')
const { check } = require('express-validator')
const { fieldValidator } = require('../middlewares/fieldValidator')

const router = Router()

router.use(validateJWT)

router.get('/', getCourses)

router.post('/', [
    check('course', 'Course is required').notEmpty().trim(),
    check('course', 'Too short').isLength({ min: 3 }),
    check('courseCode', 'Course code is required').notEmpty().trim(),
    check('courseCode', 'Too short').isLength({ min: 3 }),
    fieldValidator
],
    createCourse)

router.put('/:id', updateCourse)

router.delete('/:id', deleteCourse)

module.exports = router