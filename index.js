import 'dotenv/config'
import express from 'express'
import renderMiddleware from './middleware/renderMiddleware.js'


const app = express()

app.use(renderMiddleware)
app.use(express.static('public'))

app.listen(8080)