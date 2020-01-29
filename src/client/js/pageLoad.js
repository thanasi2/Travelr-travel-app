function pageLoad(){
  const reset = function(){
    const myTrips = document.getElementById('savedTrips');
    myTrips.innerHTML = '<option></option>'
  }
  const checkSavedTrips = async (url = 'http://localhost:8080/trips')=>{
    const res = await fetch(url)
    try {
      const savedTripData = await res.json();
      console.log("trip data retrieved")
      console.log(savedTripData);
      const myTrips = document.getElementById('savedTrips');
      if(savedTripData.length === 0) {
        console.log("no saved trips");
      }else {
        console.log(`you have ${savedTripData.length} saved trips`)
        for(var x = 0; x < savedTripData.length; x++){
          var place = savedTripData[x].location;
          var date = savedTripData[x].date;
          myTrips.insertAdjacentHTML('beforeend', `<option data-place="${place}" data-date="${date}">${place} ${date}</option>`)
        }
      }

      return savedTripData;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }
  reset();
  checkSavedTrips();
}
window.onload = pageLoad()

export { pageLoad }
