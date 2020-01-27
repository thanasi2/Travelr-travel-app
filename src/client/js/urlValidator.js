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
      for(var x = 0; x < newData.length; x++){
        const myTrips = document.getElementById('savedTrips');
        var place = newData[x].location;
        var date = newData[x].date;
        myTrips.insertAdjacentHTML('beforeend', `<option>${place} on ${date} </option>`);
      }
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

export { addTrip }
