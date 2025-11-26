function formatCreditCardNumber(number) {
  const numberString = number.toString();
  let formatted = "";
  for (let i = 0; i < numberString.length; i++) {
    formatted += numberString[i];
    if ((i + 1) % 4 === 0 && i !== numberString.length - 1) {
      formatted += " ";
    }
  }
  return {
    original: number,
    formatted: formatted,
  };
}

console.log(formatCreditCardNumber(123456789));
console.log(formatCreditCardNumber(1456783647897864));
