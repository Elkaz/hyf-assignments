const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = new Date();
let today = d.getDay();

function getEventWeekday(daysFromToday){
    const eventDay = (today + daysFromToday) % 7;
    return days[eventDay];
}

console.log(getEventWeekday(5));
console.log(getEventWeekday(9));