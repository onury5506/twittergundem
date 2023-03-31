import tokenCount from './tokenCount.js'

export const chatGPT = {
    sendMessage: null,
}

chatGPT.sendMessage = async function (prompt) {

    const tokens = tokenCount(prompt)
    const MAX_TOKENS = 2000

    const messages = [
        {
            role: "system",
            content: "Verilen twitter trendi için özet yaz. Kendin uyurma bilgi ekleme! Özetler Türkçe olmak zorunda!"
        },
        {
            role: "user",
            content: prompt
        }
    ]

    const data = {
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: MAX_TOKENS - tokens
    }

    let res = await fetch("https://api.openai.com/v1/chat/completions",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify(data)
        })
    res = await res.json()
    if (res.error) {
        console.error(res)
    }

    return {
        text: res.choices[0].message.content.trim(),
        usage: res.usage,
        tokens
    }
}