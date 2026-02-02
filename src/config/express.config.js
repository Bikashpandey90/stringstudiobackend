const express = require('express')
const apiRouter = require('../router/router')
const cors = require("cors");


require('./db.config')


const app = express()
app.use(cors({
    origin: [
        "https://stringstudio.vercel.app",
        "http://localhost:3000",
        "http://192.168.0.100:3000"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}))


app.use(express.json())
app.use(express.urlencoded(
    {
        extended: true
    }
))

app.use('/api/v1', apiRouter)

app.use((req, res, next) => {
    next({
        code: 404,
        message: "Not found",
        status: "NOT_FOUND"
    })
})

module.exports = app;
