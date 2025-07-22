import React from 'react'

const StarRating = ({rating}) => {

    const stars = [];

    for(let i = 1; i<=5; i++){
        if (i <= rating) {
            stars.push(<i key = {i} className="fa-solid fa-star text-warning"></i>);
        }else if(i === Math.ceil(rating) && rating % 1 !== 0) {
            stars.push(<i key = {i} className="fa-solid fa-star-half text-warning"></i>);
        } else {
            stars.push(<i key = {i} className="fa-regular fa-star text-warning"></i>);
        }
    }

  return (
    <div>{stars}</div>
  )
}

export default StarRating