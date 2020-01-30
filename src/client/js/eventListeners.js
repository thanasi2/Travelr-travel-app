
function eventListen(){
 const sbmt = document.getElementById('submit');
 sbmt.addEventListener('click', ()=>{
   Client.handleSubmit(event);
 });

 const tripChange = document.getElementById('savedTrips');
 tripChange.addEventListener('change', ()=>{
   Client.retrieve();
 });
}

eventListen();


export { eventListen }
