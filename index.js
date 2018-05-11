const axios = require('axios');
 
axios.get('https://api.coinmarketcap.com/v2/ticker/?limit=1')
  .then(response => {
    //console.log(response.data);
  
    const info = response.data;

    function* values(response) {
      for (let prop of Object.keys(info)) // own properties, you might use
                                         // for (let prop in obj)
          yield info[prop];
    }
    let arr = Array.from(values(response.data.quotes));
 //   var arr1 = JSON.parse(arr);
    console.log(JSON.stringify(arr));
  //  console.log(arr1.quotes);
    console.log(JSON.stringify(response.data.name));
    console.log(response.data.name);
    console.log(response.data.symbol);
  
  })
    .catch(error => {
      console.log(error);
    
    });

