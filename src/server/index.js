
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')


const app = express()

app.use(express.static('dist'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
const port = 8080;
app.listen(port, function () {
    console.log(`running on localhost: ${port}`)
})

app.get('/test', function (req, res) {
    res.send({'url':'http://testurl.com'})
});

const data = [];

// adds trip data
app.post('/addTrip', function(req, res) {
  let newData = req.body;
  let newEntry = {
    location: newData.location,
    weather: newData.weather,
    date: newData.date,
    picURL: newData.picURL,
  }
  data.unshift(newEntry);
  console.log(newEntry)
  res.send(data);
})

// removes trip data
app.post('/rmvTrip', function(req, res) {
  let rmvData = req.body;
  for (var x = 0; x < data.length; x++) {
    if (data[x].location === rmvData.location && data[x].date === rmvData.date) {
      data.splice(x,1);
      console.log("Trip deleted");
      break;
    }else{
      console.log('Could not delete trip')
    }
  }
  res.send(data);
})

app.get('/trips', function (req, res) {
    res.send(data);
});
