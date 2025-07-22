import React from 'react'
import StarRating from './StarRating'

const Reviews = ({ reviews }) => {
  return (
    <div className='row row-cols-3 mb-2 gap-3'>

    {reviews.map((review) => {
        return (
        <div className='card text-white bg-primary mb-3 mr-4' style={{ maxWidth: '30%' }} key={review.id}>
        <div className='card-header d-flex justify-content-between align-items-center'>
            <span>{review.name}</span>
            <span>
            <StarRating rating={review.rating} />
            </span>
        </div>
        <div className='card-body'>
            <p className='card-text'>{review.review}</p>
        </div>
    </div>
    )
  })}

    
    {/* <div className='card text-white bg-primary mb-3 mr-4' style={{ maxWidth: '30%' }}>
        <div className='card-header d-flex justify-content-between align-items-center'>
            <span>Review Title</span>
            <span>
            <StarRating rating={4} />
            </span>
        </div>
        <div className='card-body'>
            <p className='card-text'>This is a review description.</p>
        </div>
    </div>

     <div className='card text-white bg-primary mb-3 mr-4' style={{ maxWidth: '30%' }}>
        <div className='card-header d-flex justify-content-between align-items-center'>
            <span>Review Title</span>
            <span>
            <StarRating rating={4} />
            </span>
        </div>
        <div className='card-body'>
            <p className='card-text'>This is a review description.</p>
        </div>
    </div>

    <div className='card text-white bg-primary mb-3 mr-4' style={{ maxWidth: '30%' }}>
        <div className='card-header d-flex justify-content-between align-items-center'>
            <span>Review Title</span>
            <span>
            <StarRating rating={4} />
            </span>
        </div>
        <div className='card-body'>
            <p className='card-text'>This is a review description.</p>
        </div>
    </div>

    <div className='card text-white bg-primary mb-3 mr-4' style={{ maxWidth: '30%' }}>
        <div className='card-header d-flex justify-content-between align-items-center'>
            <span>Review Title</span>
            <span>
            <StarRating rating={4} />
            </span>
        </div>
        <div className='card-body'>
            <p className='card-text'>This is a review description.</p>
        </div>
    </div> */}
    
    </div>
  )
}

export default Reviews