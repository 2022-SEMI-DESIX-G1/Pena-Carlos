const express = require('express')
const app = express()
const routes = require('./network')
const cors = require('cors')

app.use(cors());
app.use('',routes);

app.listen(3000, success => {
    console.log("ok")
})