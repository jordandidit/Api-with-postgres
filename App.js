const http = require('http');
const axios = require('axios');
const db = require('./models');
const Api = db.Api; 

const fetchDataFromAPI = async () => {
  console.log("Getting data from API...");
  try {
    
    const response = await axios.get("http://localhost:4000/api/data"); 
    const { data } = response;

 
    if (Array.isArray(data) && data.length > 0) {
      
      for (const item of data) {
        
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
      console.log("No data received from the API.");
    }
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
  }
};


http.createServer(async (req, res) => {
  try {
    
    await fetchDataFromAPI();

    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Data fetched from API and inserted into the database');
    res.end();
  } catch (error) {
    
    console.error('Error processing request:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.write('Internal Server Error');
    res.end();
  }
}).listen(4000, () => {
  console.log('Server is running on port 4000');
});
