const bodyParser = require('body-parser')
const express = require('express')
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 2000
const cors = require('cors');
const routes = require('./Routes/appRoutes');
const mongoose = require('mongoose')
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}))
app.use('/api', routes)
const URI = process.env.MONGOS_URI
mongoose.connect(URI, (err)=> {
    {!err ? console.log("Connected Successfully") : console.log(err);}
})
mongoose.Promise = global.Promise;

app.listen(PORT, () => console.log(`You are connected to port ${PORT}`))