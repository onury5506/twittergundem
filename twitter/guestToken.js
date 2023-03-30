import variables from "./variables.js"

const url = "https://api.twitter.com/1.1/guest/activate.json"

export default async function guestToken(){
    let res = await fetch(url,{
        method:"post",
        headers:{
            authorization:variables.Bearer
        }
    })
    res = await res.json()
    return res.guest_token
}