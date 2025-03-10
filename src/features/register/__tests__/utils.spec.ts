import { CartItem, Shirt } from "../models";
import * as Utils from '../utils'; // Import the entire module

describe("Shirt", () => {
  it('should have valid shirt', () => {
    const shirts: Shirt[] = [
      { material: "bomull", size: "XXL", type: null },
      { material: "funktion", size: "S", type: "Dam" },
    ]
    expect(Utils.hasValidShirt(shirts)).toBeTruthy()
  });

  it('should not have valid shirt', () => {
    expect(Utils.hasValidShirt([{ material: "bomull", size: null, type: "Herr" }])).not.toBeTruthy()
  });

  it('should not have valid shirt', () => {
    expect(Utils.hasValidShirt([{ material: "bomull", size: "XXL", type: null }])).not.toBeTruthy()
  });

  it('should return the correct string for valid shirts', () => {
    const items: CartItem[] = [
      { metadata: { data_id: "funktion" }, quantity: 2, name: "Tshirt funktion", selectedType: "Herr", selectedSize: "M" },
      { metadata: { data_id: "bomull" }, quantity: 1, name: "Tshirt bomull", selectedType: "Dam", selectedSize: "S" },
      { metadata: { data_id: "funktion" }, quantity: 3, name: "Tshirt funktion", selectedType: "Herr", selectedSize: null },
      { metadata: { data_id: "bomull" }, quantity: 1, name: "Tshirt bomull", selectedType: null, selectedSize: "L" },
      { metadata: { data_id: "keps" }, quantity: 1, name: "Tshirt bomull", selectedType: "Herr", selectedSize: "L" },
      { metadata: { data_id: "funktion" }, quantity: 1, name: "Tshirt funktion", selectedType: "Herr", selectedSize: "XXL" }
    ] as unknown as CartItem[];

    const result = Utils.extractShirtsAsString(items);

    expect(result).toBe('2 Tshirt funktion Herr M, 1 Tshirt bomull Dam S, 1 Tshirt funktion Herr XXL');
  });

})

describe('oreToSek', () => {
  it('should convert ore to SEK', () => {
    expect(Utils.oreToSek(150)).toBe(1.5);
    expect(Utils.oreToSek(100)).toBe(1);
    expect(Utils.oreToSek(1)).toBe(0.01);
  });
});
