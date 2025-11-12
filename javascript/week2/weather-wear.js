
function temperatureChecker(temperature) {
if (temperature > 15) {
    return `T-shirt is fine!`;
} else if (temperature <= 15 && temperature > 10) {
    return `Wear a jacket.`
} else if (temperature <= 10 && temperature >0) {
    return `Wear an warm coat.`
} else {
    return `Wear all you have :)`
    }
}

const clothesToWear = temperatureChecker(0);
console.log(clothesToWear);