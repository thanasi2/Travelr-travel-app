// adds trip to server
function addTrip(){
  const saveTrip = async (url = '', data = {})=>{
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    try {
      const newData = await res.json();
      alert('Trip Saved!');
    }catch(error) {
      console.log('error', error);
    }
  }
  var loc = document.getElementById('where').innerText;
  var date = document.getElementById('when').innerText;
  var weather = document.getElementById('weather').innerText;
  var pic = document.getElementById('img').innerHTML;

  saveTrip('http://localhost:8080/addTrip', {
    location: loc,
    weather: weather,
    date: date,
    picURL: pic,})
}
// removes trip from server
function rmvTrip(){
  const deleteTrip = async (url = '', data = {})=>{
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    try {
      const newData = await res.json();
      alert('Trip Deleted!');
      document.getElementById('card').remove()
    }catch(error) {
      console.log('error', error);
    }
  }
  var loc = document.getElementById('where').innerText;
  var date = document.getElementById('when').innerText;
  deleteTrip('http://localhost:8080/rmvTrip', {
    location: loc,
    date: date,
})
}
// retrieves stored trips from server
function retrieve() {
  const getTrip = async (url = '')=>{
    const res = await fetch(url)
    try {
      const tripData = await res.json();
      var trips = document.getElementById('savedTrips');
      var where = trips.options[trips.selectedIndex].dataset.place;
      var when = trips.options[trips.selectedIndex].dataset.date;
      for (var x = 0; x < tripData.length; x++) {
        if (where === tripData[x].location && when === tripData[x].date) {
          createCard();
          var newWeather = tripData[x].weather;
          var newDate = tripData[x].date;
          var newLoc = tripData[x].location;
          var newPic = tripData[x].picURL;
          document.getElementById('where').innerText = newLoc;
          document.getElementById('weather').innerText = newWeather;
          document.getElementById('when').innerText = newDate;
          document.getElementById('img').innerHTML = newPic;
          revealCard(tripData[x].date);
          break;
        }else {
          if (document.getElementById('card')) {
            document.getElementById('card').remove();
          }
        }
      }

      return tripData;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }
  getTrip('http://localhost:8080/trips')
}

function revealCard(savedDate) {
  var card = document.getElementById('card');
  card.style.display ='flex';
  var countdown = document.getElementById('countdown');
  var year = savedDate.slice(6,10) + '-'
  var month = savedDate.slice(0,2) + '-'
  var day = savedDate.slice(3,5)
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

export { addTrip, rmvTrip, retrieve }
