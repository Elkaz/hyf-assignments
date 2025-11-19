const seriesDurations = [
  {
    title: "This is us",
    days: 3,
    hours: 3,
    minutes: 15,
  },
  {
    title: "Sopranos",
    days: 3,
    hours: 2,
    minutes: 32,
  },
  {
    title: "See",
    days: 0,
    hours: 21,
    minutes: 12,
  },
   {
    title: "Handmaid's Tale",
    days: 2,
    hours: 9,
    minutes: 12,
  },
   {
    title: "Silo",
    days: 0,
    hours: 15,
    minutes: 140,
  },
  {
   title: "Severance",
    days: 0,
    hours: 14,
    minutes: 53,
  }
];


function logOutSeriesText() {
    const leapYears = 20 
    const myLifeTotalDays = (80 - leapYears) * 365 + leapYears * 366 ; // to calculate the leap years.
    const minutesOfMyLife = myLifeTotalDays * 24 * 60; 
   
    const totalPercent= 0
    seriesDurations.forEach(series => {
        const minutesOfSeries =
            series.days * 24 * 60 +
            series.hours * 60 +
            series.minutes;
        const spendTimeOfMyLife = (minutesOfSeries/minutesOfMyLife) * 100;
        totalPercent += spendTimeOfMyLife;
        console.log(`${series.title} took ${spendTimeOfMyLife.toFixed(3)}% of my life.`);
  
    })
  console.log(`In total that is ${totalPercent.toFixed(3)}% of my life.`);
 
}

logOutSeriesText(); 