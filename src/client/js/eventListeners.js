
function eventListen(){
 var sbmt = document.getElementById('submit');
 sbmt.addEventListener('click', ()=>{
   Client.handleSubmit(event);
   alert('clicked!')
 })
}
eventListen();


export { eventListen }
