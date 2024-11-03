import { Shirt } from "./models";
import { SHIRT_PRICE_COTTON, SHIRT_PRICE_FUNCTIONAL } from "./service/registerService";

// Stringify the shirt selection for easier storage
export function shirtArrayToString(shirts: Shirt[]) {
    return shirts.filter(s => s.type && s.size).map(shirt => `${shirt.type} ${shirt.size} ${shirt.material}`).join(', ')
  }
  
  // Checks if at lease one shirt is selected
  export function isShirtSelected(shirts: Shirt[]) {
    for (let shirt of shirts) {
      if (shirt.size !== null && shirt.type !== null) {
        return true;
      }
    }
    return false
  }
  
  export function scrollToInfo(elementID: string) {
    const yOffset = -30;
    const element = document.getElementById(elementID);
    const y = (element?.getBoundingClientRect().top ?? 0) + window.pageYOffset + yOffset;
  
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  
  export const calcShirtPrice = (shirts: Shirt[]) => {
    const shirtAmount = shirts.reduce((acc, shirt) => {
      if (shirt.size && shirt.type && shirt.material) {
        if (shirt.material === 'bomull') {
          return acc + SHIRT_PRICE_COTTON;
        } else {
          return acc + SHIRT_PRICE_FUNCTIONAL
        }
      } else {
        return acc;
      }
    }, 0);
    return shirtAmount;
  }