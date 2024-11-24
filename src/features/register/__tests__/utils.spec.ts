import { Shirt } from "../models";
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

  it('shoud give correct shirt string', () => {
    const shirts: Shirt[] = [
      { material: "bomull", size: "XXL", type: null },
      { material: "funktion", size: "S", type: "Dam" },
      { material: "bomull", size: "XXL", type: "Herr" },
      { material: "bomull", size: "XS", type: "Herr" },
    ]
    expect(Utils.shirtArrayToString(shirts)).toBe("Dam S funktion, Herr XXL bomull, Herr XS bomull")
  });
})

describe("Shirt price", () => {
  const cottonShirtPrice = 100;
  const functionShirtPrice = 150;

  it('calculates the total price for valid cotton shirts', () => {
    const shirts: Shirt[] = [
      { size: 'M', type: 'Dam', material: 'bomull' },
      { size: 'L', type: 'Herr', material: 'bomull' },
    ];

    const result = Utils.calcShirtPrice(shirts, cottonShirtPrice, functionShirtPrice);
    expect(result).toBe(200); // 2 shirts * 100
  });

  it('calculates the total price for valid functional shirts (Herr)', () => {
    const shirts: Shirt[] = [
      { size: 'M', type: 'Herr', material: 'funktion' },
      { size: 'L', type: 'Herr', material: 'funktion' },
    ];

    const result = Utils.calcShirtPrice(shirts, cottonShirtPrice, functionShirtPrice);
    expect(result).toBe(300); // 2 shirts * 150 (functional shirts)
  });

  it('returns 0 for empty array', () => {
    const shirts: Shirt[] = [];

    const result = Utils.calcShirtPrice(shirts, cottonShirtPrice, functionShirtPrice);
    expect(result).toBe(0);
  });

  it('ignores invalid shirts without size, type, or material', () => {
    const shirts: Shirt[] = [
      { size: 'M', type: 'Dam', material: 'bomull' }, // Valid
      { type: 'Herr', material: 'funktion', size: null }, // Missing size
      { size: 'L', material: 'bomull', type: null },  // Missing type
    ];

    const result = Utils.calcShirtPrice(shirts, cottonShirtPrice, functionShirtPrice);
    expect(result).toBe(100); // Only one valid shirt
  });
})

describe("Shirt", () => {
  const cottonPrice = 100;
  const functionPrice = 150;
  const capPrice = 50;
  const registerPrice = 200;
  const numCaps = 3;
  const donation = 30;
  const shirts: Shirt[] = [
    { size: 'M', type: 'Dam', material: 'bomull' },
    { size: 'L', type: 'Herr', material: 'funktion' },
  ];

  beforeEach(() => {
    jest.spyOn(Utils, 'calcShirtPrice').mockReturnValue(250); // Mock the return value of calcShirtPrice
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Clean up mocks after each test
  });

  it('should return null if any price is null', () => {
    expect(Utils.calcTotalRegisterPrice(null, functionPrice, capPrice, registerPrice, numCaps, shirts, donation, true)).toBeNull();
    expect(Utils.calcTotalRegisterPrice(cottonPrice, null, capPrice, registerPrice, numCaps, shirts, donation, true)).toBeNull();
    expect(Utils.calcTotalRegisterPrice(cottonPrice, functionPrice, null, registerPrice, numCaps, shirts, donation, true)).toBeNull();
    expect(Utils.calcTotalRegisterPrice(cottonPrice, functionPrice, capPrice, null, numCaps, shirts, donation, true)).toBeNull();
  });

  it('should calculate the total when isAllowedCompanyEntered is false', () => {
    const result = Utils.calcTotalRegisterPrice(
      cottonPrice,
      functionPrice,
      capPrice,
      registerPrice,
      numCaps,
      shirts,
      donation,
      false
    );
    expect(result).toBe(registerPrice + donation + 250 + 150); // 200 (register) + 250 (shirts) + 150 (caps) + 30 (donation)
  });

  it('should handle the case when numCaps is 0', () => {
    const result = Utils.calcTotalRegisterPrice(
      cottonPrice,
      functionPrice,
      capPrice,
      registerPrice,
      0, // No caps
      shirts,
      donation,
      false
    );
    expect(result).toBe(registerPrice + donation + 250 + 0); // Register + donation + shirts cost (no caps)
  })

  it('should return the correct total if there is no donation', () => {
    const result = Utils.calcTotalRegisterPrice(
      cottonPrice,
      functionPrice,
      capPrice,
      registerPrice,
      numCaps,
      shirts,
      0, // No donation
      false
    );
    expect(result).toBe(registerPrice + 0 + 250 + 150); // Register + no donation + shirts cost + caps cost
  });

  it('should calculate the total when isAllowedCompanyEntered is true', () => {
    const result = Utils.calcTotalRegisterPrice(
      cottonPrice,
      functionPrice,
      capPrice,
      registerPrice,
      numCaps,
      shirts,
      donation,
      true
    );
    expect(result).toBe(donation + 250 + 150); // No register fee
  });
})

describe('oreToSek', () => {
  it('should convert ore to SEK', () => {
    expect(Utils.oreToSek(150)).toBe(1.5);
    expect(Utils.oreToSek(100)).toBe(1);
    expect(Utils.oreToSek(1)).toBe(0.01);
  });
});
