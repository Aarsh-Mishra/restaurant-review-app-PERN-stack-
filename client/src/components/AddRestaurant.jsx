import React from "react";
import { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const { addRestaurants } = React.useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post('/', {
        name,
        location,
        priceRange
      });

      addRestaurants(response.data.data.restaurant);
      console.log('Restaurant added:', response.data);
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  }

  return (
    <div className="mb-4">
      <form>
        
        <div className="row align-items-center">
          
          <div className="col">
            <input value = {name} onChange = {(e)=>{setName(e.target.value)}} type="text" className="form-control" placeholder="Name" />
          </div>
          <div className="col">
            <input value = {location} onChange = {(e)=>{setLocation(e.target.value)}} className="form-control" placeholder="Location" />
          </div>
          <div className="col">
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="form-select">
              <option defaultValue="">Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>

          <div className="col-auto">
            <button onClick={handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
