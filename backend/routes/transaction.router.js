const router = require('express').Router()
const transactionController = require('../controllers/transaction.controller')

//investor is user id
router.get('/:investor', transactionController.fetchDetails)

router.post('/add', transactionController.addTransaction)

module.exports = router