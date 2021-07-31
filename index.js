const movieSelect=document.getElementById("Movies");
const seats=document.querySelectorAll(".seat");
let count=0;



//----------------Functions---------------------//


function myMovieName(){
  bookedSeat();
  //console.log(movieSelect.value,movieSelect.selectedIndex,movieSelect.options[movieSelect.selectedIndex].textContent);
  document.getElementsByClassName("movieName")[0].textContent=movieSelect.options[movieSelect.selectedIndex].textContent.split(" ")[0];
}



function bookedSeat(){
  const noOfSeat=document.getElementById("noSeats");
  const cost=document.getElementById("Cost");
  noOfSeat.textContent=count; 
  cost.textContent=count*movieSelect.value;
}
function selectSeat(e){
  if(e.path[0].classList.contains("Li"))
    return;
  if(e.path[0].classList.contains("occupied")){
    return;
  }
  else if(e.path[0].classList.contains("selected")){
    e.path[0].classList.remove("selected");
    count--;
  }
  else{
    e.path[0].classList.add("selected");
    count++;
  }
  //e.path[0].classList.add("selected");
  bookedSeat();
}



//---------------Event-Listeners----------------//


movieSelect.addEventListener('click',myMovieName);

seats.forEach(x => {
  x.addEventListener('click',selectSeat);
});