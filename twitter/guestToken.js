import variables from "./variables.js"

const url = "https://api.twitter.com/1.1/guest/activate.json"

let lastGuestToken = ""
let guestTokenCounter = 0

export default async function guestToken(){
    if(guestTokenCounter > 0){
        guestTokenCounter--
        return lastGuestToken
    }
    guestTokenCounter = 5
    let res = await fetch(url,{
        method:"post",
        headers:{
            authorization:variables.Bearer
        }
    })
    res = await res.json()
    return res.guest_token
}