import React from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { useEffect } from 'react';
import { useContext } from 'react';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

const RestaurantList = (props) => {

    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData =  async ()=>{
            try{
                const response = await RestaurantFinder.get('/');
                setRestaurants(response.data.data.restaurants);

                console.log('Fetched restaurants:', response.data.data.restaurants);
                
            }catch(err){
                console.error('Error fetching restaurants:', err);
            }
        };
        fetchData();
    }, []);




const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.avg} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    );
  };

const handleUpdate = (e, id) =>{
        e.stopPropagation();
        navigate(`/update/${id}`);
    }

const handleClick = (id) => {
        navigate(`/restaurant/${id}`);
    }

  return (
    <div className='list-group'>
        <table className = "table table-hover table-dark">
            <thead>
                <tr className='bg-primary'>
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>

                {restaurants &&
                    restaurants.map((restaurant) => {
                    return (
                        <tr
                        onClick={() => handleClick(restaurant.id)}
                        key={restaurant.id}
                        >
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>{renderRating(restaurant)}</td>
                        <td>
                            <button
                            onClick={(e) => handleUpdate(e, restaurant.id)}
                            className="btn btn-warning"
                            >
                            Update
                            </button>
                        </td>
                        <td>
                            <button
                            onClick={(e) => handleDelete(e, restaurant.id)}
                            className="btn btn-danger"
                            >
                            Delete
                            </button>
                        </td>
                        </tr>
              );
            })}
                {/* <tr>
                <td>mcdonalds</td>
                <td>New York</td>
                <td>$$</td>
                <td>4.5</td>
                <td>
                    <button className='btn btn-warning'>Update</button>
                </td>
                <td>
                    <button className='btn btn-danger'>Delete</button>
                </td>
                </tr> */}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList