import fs from "fs/promises"

export default async function render(templatePath,data){

    let html = (await fs.readFile(templatePath)).toString()
    const dataKeys = Object.keys(data)

    dataKeys.forEach((key)=>{
        const regex = new RegExp(`\\[\\[${key}\\]\\]`,"g")
        html = html.replace(regex,data[key])
    })

    return html
}