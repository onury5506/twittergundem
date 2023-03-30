import summaries from './summaries.js';
import render from './view/render.js';
import fs from 'fs'

export default async function renderIndex(){
    const trendSummaries = await summaries()

    const trendRenders = await Promise.all(trendSummaries.map(async (sum) => {
        return render("./view/trend.html",sum)
    }))
    
    const index = await render("./view/index.html",{
        trends:trendRenders.join("\n")
    })
    let now = Date.now()
    fs.writeFileSync("./public/index.html",index)
    console.log(Date.now()-now)
}