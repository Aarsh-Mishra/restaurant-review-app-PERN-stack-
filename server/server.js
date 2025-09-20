import express from 'express'
import dotenv from 'dotenv';
import { query } from './db/index.js';
import cors from 'cors';
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3001;

app.get('/api/restaurants', async (req, res) => {
  try {
    // This new query joins the tables and then groups them, guaranteeing one row per restaurant.
    const results = await query(`
      SELECT 
        restaurants.*, 
        COUNT(reviews.id) AS count, 
        TRUNC(AVG(reviews.rating), 1) AS avg 
      FROM 
        restaurants 
      LEFT JOIN 
        reviews ON restaurants.id = reviews.restaurant_id 
      GROUP BY 
        restaurants.id;
    `);

    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: { 
        restaurants: results.rows,
      }
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/restaurants/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) as count, TRUNC(AVG(rating),1) as avg FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1', [id]);

    const reviews = await query('SELECT * FROM reviews WHERE restaurant_id = $1', [id]);

    res.status(200).json({
        status: 'success',
        data: { 
                restaurant: restaurant.rows[0], 
                reviews: reviews.rows 
        },
    });

  
    
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/restaurants', async (req, res) => {
  const { name, location, priceRange } = req.body;

  try {
    const result = await query(
      'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *',
      [name, location, priceRange]
    );
    
    res.status(201).json({
      status: 'success',
      data: { restaurant: result.rows[0] },
    });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/restaurants/:id', async (req, res) => {
  const { id } = req.params;
  const { name, location, price_range } = req.body;

  try {
    const result = await query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *',
      [name, location, price_range, id]
    );
    
    res.status(200).json({
      status: 'success',
      data: { restaurant: result.rows[0] },
    });
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/restaurants/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);
    
    res.status(200).json({
      status: 'success',
      data: { restaurant: result.rows[0] },
    });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/restaurants/:id/reviews', async (req, res) => {
  const { id } = req.params;  
  const { name, rating, review } = req.body;

  try {
    const result = await query(
      'INSERT INTO reviews (restaurant_id, name, rating, review) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, name, rating, review]
    );

    res.status(201).json({
      status: 'success',
      data: { review: result.rows[0] },
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
