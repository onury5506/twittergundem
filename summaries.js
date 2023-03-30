import { chatGPT } from './chatgpt/chatgpt.js';
import tokenCount from './chatgpt/tokenCount.js';

import getTweet from "./twitter/getTweet.js";
import search from "./twitter/search.js";
import trends from "./twitter/trends.js";

const MAX_TOKENS = 1000

export default async function summaries() {
    const trendsList = await trends()
    let max = Math.min(trendsList.length, 10)
    let summaries = []
    let totalTokens = 0
    for (let i = 0; i < max; i++) {
        const trend = trendsList[i]
        console.log(trend.name,i)
        const trendTweets = await search(trend.query)
        const tweets = await Promise.all(trendTweets.map(async (t) => {
            let id = t.id_str
            if (t.retweeted_status) {
                id = t.retweeted_status.id_str
            }

            return (await getTweet(id)).full_text
        }))
        let prompt = `Trend : ${trend.name}\n\n`

        for (let i = 0; i < tweets.length; i++) {
            let tweet = "[tweet start]\n" + tweets[i] + "\n[tweet end]\n"

            if (tokenCount(prompt + tweet) >= MAX_TOKENS) {
                break;
            }

            prompt += tweet
        }

        let res = await chatGPT.sendMessage(prompt)

        if(res.error)continue;
        console.log(`${res.usage.total_tokens} tokens used for ${trend.name}`)
        totalTokens+= res.usage.total_tokens
        summaries.push({
            name:trend.name,
            summary:res.text
        })
    }
    console.log(`Summary costs ${(totalTokens/1000)*0.002}$`)
    return summaries
}