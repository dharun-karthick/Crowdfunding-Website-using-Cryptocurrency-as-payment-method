const router = require('express').Router({ mergeParams: true })
const authRouter = require('./auth.router')
const projectRouter = require('./project.router')
const userRouter = require('./user.router')
const transactionRouter = require('./transaction.router')

router.use('/auth', authRouter)
router.use('/project', projectRouter)
router.use('/user', userRouter)
router.use('/transaction', transactionRouter)

module.exports = router 