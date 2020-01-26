
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const apiResponse = require('./API.js')


const app = express()

app.use(express.static('dist'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

console.log(__dirname)

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

// app.get('/api', apiResponse.apiRes)
//
// module.exports = app;
