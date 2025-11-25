const activities = [];
const usageLimit = 60;

//Adding an activity

function addActivity(date, activity, duration) {
  activities.push({
    date: date,
    activity: activity,
    duration: duration,
  });
}

//Show my status

function showStatus() {
  if (!activities.length) {
    console.log("Add some activities before calling showStatus");
    return;
  }

  const numberOfActivities = activities.length;

  let totalDuration = 0;
  for (let i = 0; i < activities.length; i++) {
    totalDuration = totalDuration + activities[i].duration;
  }

  if (totalDuration > usageLimit) {
    return `You have reached your limit, no more smart phoning for you!`;
  }

  return `You have added ${numberOfActivities} activities. They amount to ${totalDuration} min. of usage.`;
}

console.log(activities);

addActivity("23/7-18", "Youtube", 30);
addActivity("23/7-18", "TikTok", 10);
console.log(showStatus());
addActivity("23/7-18", "Instagram", 20);
addActivity("23/7-18", "Apple music", 30);
console.log(showStatus());
