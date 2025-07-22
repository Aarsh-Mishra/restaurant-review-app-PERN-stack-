import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  console.log('Updating restaurant with ID:', id);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      console.log('Fetched restaurant data:', response.data);
      const data = response.data.data.restaurant;
      setName(data.name);
      setLocation(data.location);
      setPriceRange(data.price_range);
    };
    fetchRestaurant();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateRestaurant = async () => {
      const response = await RestaurantFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange
      });
      console.log('Updated restaurant data:', response.data);
    };

    updateRestaurant();

   Navigate(`/`);

  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input value = {name} onChange = {(e) => setName(e.target.value)} type="text" className="form-control" id="name" />
            </div>
            <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input value = {location} onChange = {(e) => setLocation(e.target.value)} type="text" className="form-control" id="location" />
            </div>
            <div className="mb-3">
                <label htmlFor="price_range" className="form-label">Price Range</label>
                <input value = {priceRange} onChange = {(e) => setPriceRange(e.target.value)} type="number" className="form-control" id="price_range" />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    </div>
  )
}

export default UpdateRestaurant