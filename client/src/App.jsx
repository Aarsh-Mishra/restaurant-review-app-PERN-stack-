import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './routes/Home.jsx';
import RestaurantDetailPage from './routes/RestaurantDetailPage.jsx';
import UpdatePage from './routes/UpdatePage.jsx';
import { RestaurantsContextProvider } from './context/RestaurantsContext.jsx';
  
function App() {
  

  return (
    <RestaurantsContextProvider>
    <div className='container'>
       <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
            <Route path="/update/:id" element={<UpdatePage />} />
          </Routes>
        </Router>
    </div>
    </RestaurantsContextProvider> 
  )
}

export default App
