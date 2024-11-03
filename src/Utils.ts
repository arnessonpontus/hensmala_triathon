import { Shirt } from "./components/register/models";

export const SHIRT_PRICE_COTTON = 220;
export const SHIRT_PRICE_FUNCTIONAL = 290;
export const CAP_PRICE = 250;

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

export const spaceToDash = (str: string) => {
  return str.replace(/\s+/g, '-');
}

export const appendZero = (str: string) => {
  return parseInt(str) < 10 ? "0" + str : str;
}