const travelInformation = {
  speed: 50,
  destinationDistance: 432,
};
function arrivalTime(){
    const timeInH = travelInformation.destinationDistance / travelInformation.speed;
    
    const hours = Math.floor(timeInH);
    const minutes = Math.round((timeInH - hours) * 60);

    return `${hours} hours and ${minutes} minutes`;
}

const travelTime = arrivalTime(travelInformation);
console.log(travelTime);