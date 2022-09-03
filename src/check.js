import { Timer } from "./Shared/Components/Timer"


const Check = ()=>{
  const count = Timer()
  return (
    <h2>
      {count}
    </h2>
  )
}


export default Check