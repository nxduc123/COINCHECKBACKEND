var MongoClient = require('mongodb').MongoClient,
request = require('request');

MongoClient.connect('mongodb://ducnx:vinatti123@ds131320.mlab.com:31320/ducnxcloud', function(err,db){
    if(err) throw err;
    request('https://api.coinmarketcap.com/v2/ticker/?limit=1600', function(error, response, body){
        if (!error && response.statusCode == 200){
         //   var obj = JSON.parse(body);
            
           const info = JSON.parse(body);
    
           function* values(info) {
               for (let prop of Object.keys(info)) // own properties, you might use
                                                  // for (let prop in obj)
                   yield info[prop];
           }
           let arr = Array.from(values(info.data));

           console.log(arr)
            var stories = arr.map(function(story){ return story; })
            console.log(stories[1])
            db.collection('coindata').drop();
            db.collection('coindata').insert(stories, function(err, data){
                if(err) throw err;
                console.dir(data);
                db.close()
            })
        }
    })

})





/* var MongoClient = require('mongodb').MongoClient,
request = require('request');

MongoClient.connect('mongodb://localhost:27017/ducnx', function(err,db){
    if(err) throw err;
    request('https://www.reddit.com/r/technology/.json', function(error, response, body){
        if (!error && response.statusCode == 200){
            var obj = JSON.parse(body);
            var stories = obj.data.children.map(function(story){ return story.data; })
            console.log(stories)
          
            db.collection('testmongo').insert(stories, function(err, data){
                if(err) throw err;
                console.dir(data);
                db.close()
            })
        }
    })

}) */