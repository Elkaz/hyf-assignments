const candyPrice = {
    "Sweet": 0.5,
    "Chocolate": 0.7,
    "Toffee" : 1.1, 
    "Chewing-gum": 0.03
};

const boughtCandyPrices =[];

function addCandy(candyType, weight){
    const pricePerGram = candyPrice[candyType];
    const totalPrice = pricePerGram * weight;

boughtCandyPrices.push(totalPrice);

}
addCandy("Sweet", 50);
addCandy("Toffee", 35);
addCandy("Chocolate", 10);
addCandy("Chewing-gum", 200);

console.log(`${boughtCandyPrices} DKK`);


const amountToSpend = Math.random() * 100;

function canBuyMoreCandy() {
    let total = 0 ;
    for (let i =0; i < boughtCandyPrices.length; i++){
        total += boughtCandyPrices[i];
}
    return total < amountToSpend;
}

 if (canBuyMoreCandy()) {
        console.log(`You can buy more, so please do!`)
    } else {
        console.log (`Enough candy for you!`)   } 

