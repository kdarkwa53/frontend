import { useState } from "react";



const TimerLive =()=>{
    const [count, setCount] = useState(0);

    setInterval(() => {
        setCount(prevCount => prevCount + 1);
        console.log(count)
    }, 1000)

    return(
     <div role="alert" class="ant-form-item-explain-error" style={{ fontSize: "13px" }} >This rate expires in {count} seconds</div>
    )
}

export default TimerLive