
function eventListen(){
  // listens for when the submit button is clicked
 const sbmt = document.getElementById('submit');
 sbmt.addEventListener('click', ()=>{
   Client.handleSubmit(event);
 });
// listens for a change in the dropdown list
 const tripChange = document.getElementById('savedTrips');
 tripChange.addEventListener('change', ()=>{
   Client.retrieve();
 });
// will reset the search for when clicked
 const newSearch = document.getElementById('formInput');
 newSearch.addEventListener('click', ()=>{
   newSearch.value = "";
 })
}

eventListen();


export { eventListen }
