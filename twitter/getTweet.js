import guestToken from "./guestToken.js"
import variables from "./variables.js"

export default async function getTweet(id){
    const url = `https://api.twitter.com/1.1/statuses/show.json?simple_quoted_tweet=true&include_entities=true&tweet_mode=extended&include_cards=1&id=${id}`
    let res = await fetch(url,{
        headers:{
            authorization:variables.Bearer,
            "x-guest-token": await guestToken()
        }
    })
    res = await res.json()
    return res
}