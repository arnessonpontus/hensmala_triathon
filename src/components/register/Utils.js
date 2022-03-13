 // Stringify the shirt selection for easier storage
export function shirtArrayToString (shirts){
  let shirtStr = ""
  let numConverted = 0;
  shirts.forEach((shirt) => {
    if (shirt.size !== null && shirt.amount !== null) {
      if (numConverted++ === 0) {
        shirtStr += shirt.amount + shirt.size;
      } else {
        shirtStr += ", " + shirt.amount + shirt.size;
      }
    }
  });
  return shirtStr;
}