function priceCheck(wide, deep, high, gardenSizeInM2){
    const volumeInMeters = wide * deep * high;
    return volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300; 
}

const peterHouseIdealPrice = priceCheck(8,10,10,100);
const juliaHouseIdealPrice = priceCheck(5,11,8,70);

const peterHRealPrice = 2500000;
const juliaHRealPrice = 1000000;

console.log(`Peter:`)
peterHRealPrice <= peterHouseIdealPrice ? 
                console.log(`It's a Fair price, BUY IT.`) : 
                console.log(`\x1b[31m[✖]\x1b[0m It's expensive, DON'T BUY IT.`);

//Just for practicing other type of if condition
console.log(`\nJulia:`)
if (juliaHRealPrice<= juliaHouseIdealPrice){
    console.log(`\x1b[32m✔\x1b[0m It's a Fair price, BUY IT.`);}
else {
    console.log(`\x1b[31m[✖]\x1b[0m It's expensive, DON'T BUY IT.`);}