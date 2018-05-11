var express = require('express');
var fs = require('fs');
var mysql = require('mysql');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var app     = express();

var output;
app.use(bodyParser.json())

app.get('/scrape', function(req, res){
    url = 'https://raitalumni.dypatil.edu/events/?tag=live';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var json = {
                            title : [],
                            date  : [],
                            month : [],
                            venue : [],
                            link : []
                       };
             output = {
                            events : []
                         };

            $('p.event_name').each(function(){
                json.title.push($(this).text());
            });




            $('p.calendar_date').each(function(){
                json.date.push($(this).text());
            });

            $('span.calendar_month').each(function(){
                json.month.push($(this).text());
            });


            //var fulldate = $('p.calendar_date').concat($('p.calendar_day')).text();
            //console.log('all records: ' + fulldate);

            $('p.event_venue').each(function(){
                json.venue.push($(this).text());
            });

        // var title = $('p.event_name').each(function(){$(this).text()});



            for(var i=0; i<json.title.length; i++){
                output.events[i] = {
                    title : json.title[i],
                    date : json.date[i],
                    month : json.month[i],
                    venue : json.venue[i],
                    link : url
                }
            }

         var connection = mysql.createConnection({
        host: 'ducnxdb.ckn50iid6cii.us-east-1.rds.amazonaws.com',
        port: 3306,
        user: 'nxduc123',
        password: 'nxduc123',
        database: 'DATAAPI'
    });


connection.connect(function(error){
   if(!!error){
      console.log('Error');
   }else{
      console.log('Connected to the database!');
   }
});



       var scrape = JSON.stringify(output, null, 4);
       //console.log(scrape);
       console.log(output);

       var query = connection.query("INSERT INTO TESTDATA (title, date, month, venue, link) VALUES ('" + output.title + "', '" + output.date + "', '" + output.month + "', '" + output.venue + "', '" + output.link + "');", scrape, function(err, result) {
     if(err) throw err;
     console.log('data inserted');
});


            fs.writeFile('output4.json', JSON.stringify(output, null, 4), function(err){
                console.log('File successfully written! - Check your project directory for the output.json file');
            })

            res.send('Check your console!')         
        }
        else {
            console.log("Network Error, please try again later")
        }
    })
})


app.listen('8000')
console.log('Server running on port 8081');
exports = module.exports = app; 