import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const Timer = ({reset})=>{
    const [count, setCounter] = useState(10)
    const text = useSelector((state) => state?.language)
    
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
        <div role="alert" className="ant-form-item-explain-error" style={{ fontSize: "17px", textAlign: "center"}} >{text["This rate expires in"]} {count} {text["seconds"]}</div>
    )
}


export { Timer}