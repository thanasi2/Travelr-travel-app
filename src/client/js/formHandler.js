import Geonames from 'geonames.js';
//handles submit from index.html
function handleSubmit(event) {
  event.preventDefault();
  if(document.getElementById('card')) {
      document.getElementById('card').remove();
  }

  function revealCard() {
    var card = document.getElementById('card');
    card.style.display ='flex';
    var countdown = document.getElementById('countdown');
    var tripDate = document.getElementById('date').value;
    var year = tripDate.slice(0,4) + '-'
    var month = tripDate.slice(5,7) + '-'
    var day = tripDate.slice(8,10)
    var newTripDate = new Date(year+month+day+"T00:00:00").getTime();
    var days = newTripDate - (new Date().getTime());
    countdown.textContent = (days/1000/60/60/24).toFixed(0);
  }

  function createCard() {
    var trips = document.getElementById('trips');
    var card = `<div id="card">
      <div class="tripInfo">
      <h3>My Trip to: <span id="where"></span></h3>
      <h3>On: <span id="when"></span></h3>
      <h3>Days Until Trip:  <span id="countdown"></span></h3>
      <h3>Weather forecast: <span id="weather"></span></h3>
      <button class="button" onclick="Client.addTrip(); Client.pageLoad()">+ Save Trip</button>
      <button class="button" onclick="Client.rmvTrip(); Client.pageLoad()">- Remove Trip</button>
      </div>
      <div id="img">
        <a href="https://pixabay.com" target='_blank' ><img id='pixaLogo' src='https://pixabay.com/static/img/logo_square.png' alt='pixabay'></a>
      </div>
    </div>`;
    trips.insertAdjacentHTML('beforeend', card)
  }

 /* es module */
  const Geonames = require('geonames.js');


// gets long + lat coordinates
  const getLoc = async ()=>{
    const baseURL = 'http://api.geonames.org/searchJSON?q='
    const username = '&username=myusername'
    const maxResult = '&maxRows=10'
    const formInput = document.getElementById('formInput').value
    const res = await fetch(baseURL+formInput+maxResult+username)
    try {
      const response = await res.json();
      const data =  response.geonames[0];
      var where = document.getElementById('where');
      where.textContent = data.name;
      return data
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }


// gets weather using long and lat coordinates
  const getWeather = async (locData)=>{
    const corsProxy = "https://cors-anywhere.herokuapp.com/"
    const baseURL = 'https://api.darksky.net/forecast/'
    const key = process.env.DARKSKY_KEY;
    const lat = '/' + locData.lat + ','
    var lng = locData.lng + ','
    var date = document.getElementById('date').value
    var year = date.slice(0,4) + '-'
    var month = date.slice(5,7) + '-'
    var day = date.slice(8,10)
    var time = "T12:00:00"
    const res = await fetch(corsProxy+baseURL+key+lat+lng+year+month+day+time)
    try {
      const weatherData = await res.json()
      var when = document.getElementById('when');
      when.textContent = (month + day + '-' + year.slice(0,4));
      var wthrSummary = document.getElementById('weather');
      var summary = weatherData.daily.data[0].summary;
      var tempHigh = weatherData.daily.data[0].temperatureHigh.toFixed(0);
      var tempLow = weatherData.daily.data[0].temperatureLow.toFixed(0);
      wthrSummary.textContent = `${summary} Temeratures will be a high of ${tempHigh} degrees F and a low of ${tempLow} degrees F`
      return weatherData;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

  // gets picture from pixabay using location as parameters
  const getPic = async (locData)=>{
    const baseURL = 'https://pixabay.com/api/?key='
    const key = process.env.PIXA_KEY;
    const city = locData.name;
    const country =locData.countryName;
    const imgType = 'image_type=photo'
    // function to search results for photo with height atleast 400px but not more then 500px;
    const checkSize = function(imgResults) {
      var hits = imgResults.hits.length;
      var x = 0;
      while (x < hits) {
        if (imgResults.hits[x].webformatHeight > 400 && imgResults.hits[x].webformatHeight < 600) {
          var webIMG = imgResults.hits[x].webformatURL
          var imgContainer = document.getElementById('img');
          imgContainer.insertAdjacentHTML('afterbegin', `<img id='locIMG' src='${webIMG}'>`)
          break;
        }else {
          x++
        }
      }
    }

    var res = await fetch(baseURL + key + '&q=' + city + '+' + country + '&' + imgType)
    try {
      var imgData = await res.json()
      // checks to see if search returns pics, if not searches again with new parameters
      if(imgData.totalHits === 0) {
        const state = locData.adminName1;
        // fetch images from pixabay
        var res = await fetch(baseURL + key + '&q=' + state + '&' + imgType);
        var imgData = await res.json();
        checkSize(imgData);
      }else{
        checkSize(imgData);
      }
    } catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }


  createCard();
  getLoc()
  .then(function(data){
    getWeather(data);
    getPic(data)
    .then(function(){
      setTimeout(revealCard, 1000)
    })

  })
}



export { handleSubmit }
