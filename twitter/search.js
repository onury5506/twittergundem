import variables from "./variables.js"
import guestToken from "./guestToken.js"

export default async function search(query){
    const url = `https://api.twitter.com/1.1/search/tweets.json?q=${query}&count=50&result_type=trend`

    let res = await fetch(url,{
        headers:{
            authorization:variables.Bearer,
            "x-guest-token": await guestToken()
        }
    })
    res = await res.json()
    return res.statuses
}