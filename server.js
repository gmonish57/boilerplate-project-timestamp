// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser=require('body-parser')
app.use((req,res,next)=>{
  console.log(req.method+","+req.path+" - "+req.ip);
  next();
})

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
  let dateString=new Date(req.params.date_string)
  if(req.params.date_string==undefined){
    res.json({"unix":new Date().getTime(), "utc":new Date().toUTCString()});
  }else
  
  if(dateString=="Invalid Date"){
    dateString=new Date(req.params.date_string*1000)
    if (dateString=="Invalid Date"){
      res.json({"error":"Invalid Date"})
    }
  }
  else{
  res.json({"unix":dateString.getTime(),"utc":dateString.toUTCString()});
  }
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
