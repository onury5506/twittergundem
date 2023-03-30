import 'dotenv/config'
import express from 'express'
import renderIndex from './renderIndex.js'

const app = express()

app.use(express.static('public'))

async function renderIndexLoop(){
    await renderIndex()
    setTimeout(renderIndexLoop,1000*60*15)
} 
renderIndexLoop()

app.listen(8080)