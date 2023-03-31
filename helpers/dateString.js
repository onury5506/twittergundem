export default function dateString(){
    const date = new Date()

    let day = ""+date.getDate()
    if(day.length < 2){
        day = "0"+day
    }

    let month = ""+(date.getMonth()+1)
    if(month.length < 2){
        month = "0"+month
    }

    let h = ""+date.getHours()
    if(h.length < 2){
        h = "0"+h
    }

    let m = ""+date.getMinutes()
    if(m.length < 2){
        m = "0"+m
    }

    let s = ""+date.getSeconds()
    if(s.length < 2){
        s = "0"+s
    }
    
    return `${day}.${month}.${date.getFullYear()} ${h}:${m}:${s}`    
}