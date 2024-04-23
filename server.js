const express = require('express');
const db = require('./models');
const data = require('./source'); 
const Api = db.Api; 

const app = express();

const fetchDataFromAPI = async () => {
  console.log("Getting data from source...");
  try {
    
    const responseData = data; 

    
    if (Array.isArray(responseData) && responseData.length > 0) {
      
      for (const item of responseData) {
        
        const { id, name, data: itemData } = item;
        const { generation, price, capacity } = itemData || {};

        
        await Api.create({
          id,
          name,
          generation,
          price,
          capacity
        });
      }

      console.log("Data inserted into the database successfully.");
    } else {
      console.log("No data received from the source.");
    }
  } catch (error) {
    console.error("Error fetching data from source:", error.message);
  }
};


app.get('/api/data', async (req, res) => {
  try {
    
    await fetchDataFromAPI();

   
    res.json({ message: 'Data fetched from source and inserted into the database' });
  } catch (error) {
    
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
