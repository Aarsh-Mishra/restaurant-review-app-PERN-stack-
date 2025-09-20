import React from 'react'
import { useEffect } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useContext } from 'react';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useParams } from 'react-router-dom';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';

const RestaurantDetailPage = () => {

  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data);
       console.log(response.data.data.restaurant);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    fetchRestaurantDetails();
  }, []);


  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className='text-center display-1'>{selectedRestaurant.restaurant.name}</h1>
          
          <div className='text-center'>
            { selectedRestaurant.restaurant.avg > 0? <StarRating rating={selectedRestaurant.restaurant.avg} /> : <span className='text-warning ml-1'>No Ratings yet!</span>}
            <br />
            {selectedRestaurant.restaurant.count > 0 ? (
              <span className='text-warning ml-1'>Reviews : {selectedRestaurant.restaurant.count}</span>
            ) : (
              <span className='text-warning ml-1'>Reviews : 0</span>
            )}
          </div>

          <div className='mt-3'>
            <Reviews reviews={selectedRestaurant.reviews} />
            <AddReview />
          </div>
        </>
      )}
    </div>
  );


}

export default RestaurantDetailPage