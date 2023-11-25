import React from "react";
import StarRating from 'react-star-ratings';

function Rating({starClick,numberOfStars}){
return(
    <StarRating
    changeRating={()=>starClick(numberOfStars)}
    numberOfStars={numberOfStars}
    starDimension="20px"
    starSpacing="2px"
    starHoverColor="red"
    starEmptyColor="red"
    />
)

}

export default Rating;