function toFixedNumber(num: number, digits: number, base: number = 10){
  var pow = Math.pow(base, digits);
  return parseFloat((Math.round(num * pow) / pow).toFixed(digits));
}

export default toFixedNumber;
