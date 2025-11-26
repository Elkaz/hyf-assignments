function getCardInfo(number) {
  const numberString = number.toString();
  const firstNumber = numberString[0];
  const secondNumber = numberString[1];
  if (firstNumber === "4") {
    return `"visa"`;
  }
  if (["2", "5"].includes(firstNumber)) {
    return `"MasterCard"`;
  }

  if (firstNumber === "3" && ["4", "7"].includes(secondNumber)) {
    return '"American Express"';
  }
}

console.log(getCardInfo(4781321334789876));
console.log(getCardInfo(2881321334789876));
console.log(getCardInfo(3781321334789876));
console.log(getCardInfo(5681321334789876));
