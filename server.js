const axios = require('axios');
 
axios.get('https://api.coinmarketcap.com/v2/ticker/?limit=1')
  .then(response => {
    console.log(response.data);
    console.log(response.data.name);
    console.log(response.data.symbol);
  })
  .catch(error => {
    console.log(error);
   
  });
