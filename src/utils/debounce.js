export function debounce(fn,delay){
    let timer=null
    return function(){
        if(timer!=null){
            clearTimeout(timer)
        }
        timer=setTimeout(()=>{
            fn.apply(this)
            timer=null
        },delay)
    }
}