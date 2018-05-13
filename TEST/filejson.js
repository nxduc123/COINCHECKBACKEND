var fs = require('fs');
const request = require('request');
 
request('https://api.coinmarketcap.com/v2/ticker/?limit=10', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body.url);
 // console.log(body.explanation);
  console.info(body);
  var obj;
  var json = {
    name:  [],
    symbol : [],
    month : [],
    venue : [],
    link : []
};

  fs.writeFile('data/output4.json', JSON.stringify(body, null, 4), function(err){
    obj = JSON.parse(data);
    console.log('File successfully written! - Check your project directory for the output.json file');
    })


});