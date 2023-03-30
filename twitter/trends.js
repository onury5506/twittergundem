import guestToken from "./guestToken.js"
import variables from "./variables.js"

const url = "https://api.twitter.com/1.1/trends/place.json?id=23424969"

export default async function trends(){
    let res = await fetch(url,{
        headers:{
            authorization:variables.Bearer,
            "x-guest-token": await guestToken()
        }
    })
    res = await res.json()
    return res[0].trends;
}