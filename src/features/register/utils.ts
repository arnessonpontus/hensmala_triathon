import { Shirt } from "./models";

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

export const calcShirtPrice = (shirts: Shirt[], cottonShirtPrice: number, functionShirtPrice: number) => {
  const shirtAmount = shirts.reduce((acc, shirt) => {
    if (shirt.size && shirt.type && shirt.material) {
      if (shirt.material === 'bomull') {
        return acc + cottonShirtPrice;
      } else {
        return acc + functionShirtPrice
      }
    } else {
      return acc;
    }
  }, 0);
  return shirtAmount;
}

export const calcTotalRegisterPrice = (
  cottonPrice: number | null,
  functionPrice: number | null,
  capPrice: number | null,
  registerPrice: number | null,
  numCaps: number,
  shirts: Shirt[],
  donation: number,
  isAllowedCompanyEntered: boolean
) => {
  if (
    !cottonPrice ||
    !functionPrice ||
    !capPrice ||
    !registerPrice
  ) {
    return null;
  }

  const shirtsCost = calcShirtPrice(shirts, cottonPrice, functionPrice);
  const capsCost = numCaps * capPrice;

  if (isAllowedCompanyEntered) {
    return donation + shirtsCost + capsCost;
  }
  return registerPrice + donation + shirtsCost + capsCost;
}

export const oreToSek = (ore: number) => {
  return ore / 100;
}
