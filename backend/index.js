const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./env')

const port = config.port || 3000

mongoose.connect( config.MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB Connection Successful !')
})
.catch((err) => {
    console.log('Database Connection Error' + err)
})

const routes = require('./routes/index.router')
app.use(express.json())
app.use(cors())
app.use(routes)
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}/`);
})
