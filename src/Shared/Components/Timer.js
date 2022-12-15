import { useEffect, useState } from "react"


const Timer = ({reset})=>{
    const [count, setCounter] = useState(10)
    
    useEffect(()=>{
       
        const interval = setInterval(
            ()=> setCounter(count -1)
            
            , 1000)

        return () => clearInterval(interval)
    }, [count])

    if(count ===0){
        reset()
    }
    
    return(
        <div role="alert" className="ant-form-item-explain-error" style={{ fontSize: "17px", textAlign: "center"}} >This rate expires in {count} seconds</div>
    )
}


export { Timer}