const firstWords = 
[ "Bright", "Green", "Bloom", "Elegant", "Clearway", "Everline", "Kindle", "Truepath", "Golden", "Prime"];

const secondWords 
= [ "Wave", "Field", "Park", "Pulse", "Pixel", "Forge", "Swift", "Holdings", "Hub", "Solutions"];

const  randomFirst = Math.floor(Math.random() * 10);
const  randomSecond = Math.floor(Math.random() * 10);

const startupName = `${firstWords[randomFirst]} ${secondWords[randomSecond]}`;
console.log();console.log(`The startup: "${startupName}" contains ${startupName.length} characters.`);
