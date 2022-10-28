const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.get('/:id', userController.getUser)

router.post('/seeker/upload/:user', userController.uploadTheFile)
router.get('/seeker/:fileName', userController.renderFile)

module.exports = router