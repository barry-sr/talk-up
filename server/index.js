const express = require('express') 
const app = express()
const port = 5000
const  bodyParser = require('body-parser')
const mongoose = require('mongoose')
const users = require('./routes/users.js')
const dotenv = require('dotenv').config()

app.get('/', (req, res)=> res.send('welcome to the backend server'))

//DB connection
mongoose.connect(process.env.DB_CONNECT,
 {useNewUrlParser: true, useUnifiedTopology: true},)
 .then( ()=> console.log('connected to DB'))
 .catch(error => console.log("Db connection error", error))


//Body parser
app.use(bodyParser.json())

//Route
app.use('/api/', users)

app.listen(port, ()=> console.log(`server running on ${port}`))