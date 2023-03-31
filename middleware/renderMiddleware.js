import renderIndex from '../renderIndex.js'

let rendering = false;
let lastRender = null;
let tmr = null

function startRender() {
    if(rendering){
        return;
    }

    rendering = true
    if(tmr){
        clearTimeout(tmr)
        tmr = null
    }
    renderIndex().then(() => {
        rendering = false
        lastRender = Date.now()
        tmr = setTimeout(startRender,86400000)
    })
}

startRender()

export default function renderMiddleware(req, res, next) {
    if (!rendering && Date.now() - lastRender > 3600000) {
        startRender()
    }

    next()
}