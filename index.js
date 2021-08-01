const movieSelect=document.getElementById("Movies");
const seats=document.querySelectorAll(".seat");
let count=0;
let selectedSeats=[];
let movieName;
intialPopulate();

//----------------Functions---------------------//



function intialPopulate(){
  if(localStorage.getItem("movieName")){
    movieSelect.selectedIndex=JSON.parse(localStorage.getItem("movieName"));
    document.getElementsByClassName("movieName")[0].textContent=movieSelect.options[movieSelect.selectedIndex].textContent.split(" ")[0];
  }

  if(localStorage.getItem("selectedSeats")){
    selectedSeats=JSON.parse(localStorage.getItem("selectedSeats"));
    //console.log(selectedSeats);
    let j=0;
    [...seats].forEach((x,i)=>{
      selectedSeats.forEach((j)=>{
        if(i==j){
          seats[i].classList.add("selected");
          count++;
        }
      })
    });
  }


  bookedSeat();
}


function myMovieName(){
  bookedSeat();
  movieName=movieSelect.options[movieSelect.selectedIndex].textContent;
  localStorage.setItem("movieName",JSON.stringify(movieSelect.selectedIndex));
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
    if((selectedSeats.includes([...seats].indexOf(e.path[0])))){
      selectedSeats.splice(selectedSeats.indexOf([...seats].indexOf(e.path[0])),1);
    }
  }
  else{
    e.path[0].classList.add("selected");
    count++;
    if(!(selectedSeats.includes([...seats].indexOf(e.path[0])))){
      selectedSeats.push([...seats].indexOf(e.path[0]));
    }
  }
  //e.path[0].classList.add("selected");
  //console.log([...seats].indexOf(e.path[0]));
  localStorage.setItem('selectedSeats',JSON.stringify(selectedSeats))
  bookedSeat();
  
}



//---------------Event-Listeners----------------//


movieSelect.addEventListener('click',myMovieName);

seats.forEach(x => {
  x.addEventListener('click',selectSeat);
});