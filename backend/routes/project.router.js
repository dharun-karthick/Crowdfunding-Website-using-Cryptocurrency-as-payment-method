const router = require('express').Router()
const projectController = require('../controllers/project.controller')

router.get('/all', projectController.fetchAll)
router.get('/:id', projectController.fetchProject)

//create project for testing purpose without file handling
router.post('/create', projectController.createProject)
router.post('/upload/:project', projectController.uploadPhoto)
router.post('/sanction', projectController.completeSanction)

module.exports = router