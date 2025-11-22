const activities = [];
const usageLimit = 60; 

//Adding an activity

function addActivity(date, activity, duration) {
    let totalTime = 0;
    for (let i =0; i < activities.length; i++) {
        totalTime += activities[i].duration;
    }
    
   //Usage limit : I could't find the right place for usage limit. I know I have to check it before the push but
   // I get the limit reached error before getting the status. 

    if (totalTime + duration > usageLimit) {
        console.log(`You have reached your limit, no more smart phoning for you!`)
        return;
    }

     activities.push({
        date: date,
        activity: activity,
        duration: duration
    });
}

//Show my status

function showStatus(activities) {
    if (activities.length === 0) {
        console.log(`Add some activities before calling showStatus.`);
        return;

    }
    let totalTime = 0;
    for (let i = 0; i < activities.length; i++) {
    totalTime += activities[i].duration;
    }
   
    const numberOfActivity = activities.length;
    console.log(`You have added ${numberOfActivity} activities. They amount to ${totalTime} min. of usage.`);

}

addActivity("23/7-18", "Youtube", 30);
addActivity("23/7-18", "TikTok", 10);
addActivity("23/7-18", "Instagram", 20);
addActivity("23/7-18", "Apple music", 30);


showStatus(activities); 
console.log(activities);








 