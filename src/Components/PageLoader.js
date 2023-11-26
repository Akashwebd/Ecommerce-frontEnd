import React from "react";
import { TailSpin } from "react-loader-spinner";

function PageLoader(){
return(
    <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{justifyContent:'center',transform:'translateY(50%)'}}
        wrapperClass=""
        visible={true}
/>
)

}

export default PageLoader