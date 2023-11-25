import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function RedirectCountdown(){
const [count,setCount] = useState(5);
const history = useHistory();

useEffect(()=>{
const interval = setInterval(()=>{
setCount(prevcount=>prevcount-1);
},1000);

count === 0 && history.push('/');

return () => clearInterval(interval);

},[count]);

return(
    <div className="container p-5 text-center">
            <h3>Redirect in you {count} seconds</h3>
    </div>
)


}

export default RedirectCountdown;