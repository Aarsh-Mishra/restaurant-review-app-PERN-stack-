import React from 'react'
import { useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useParams } from 'react-router-dom';


const AddReview = () => {

    
    const { id } = useParams();

    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');

  

    const handleSubmit = async (e) => {   

        

        e.preventDefault();
        if (!name || !rating || !review) {
            alert('Please fill in all fields');
            return;
        }

        // Here you would typically send the review data to your backend API
        try{

            const response = await RestaurantFinder.post(`/${id}/reviews`, {
                name,
                rating,
                review
            });

             window.location.reload();


        }catch(err){
            console.error('Error submitting review:', err);
            alert('Failed to submit review. Please try again later.');
        }
       
    };

  return (
    <div className="mb-2">
    <form onSubmit={handleSubmit}>
        
        <div className="row g-3 mb-3">
         
            <div className="col-md-6">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    placeholder="name"
                    type="text"
                    className="form-control"
                />
            </div>

            
            <div className="col-md-6">
                <label htmlFor="rating" className="form-label">Rating</label>
                <select
                   value={rating}
                   onChange={(e) => setRating(e.target.value)}
                    id="rating"
                    className="form-select" 
                >
                    <option disabled>Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>

        
        <div className="mb-3">
            <label htmlFor="Review" className="form-label">Review</label>
            <textarea
               value={review}
               onChange={(e) => setReview(e.target.value)}
                id="Review"
                className="form-control"
            ></textarea>
        </div>
             <button
                type="submit"
                className="btn btn-primary btn-lg"
            >
                Submit
            </button>
       </form>
</div>
  )
}

export default AddReview