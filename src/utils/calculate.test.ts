import {
  calculateTotal,
  calculateFirstYearRDCredit,
  calculateRDCredit,
} from "./calculate";

describe("calculateTotal", () => {
  it("calculates the total of nums array", () => {
    expect(calculateTotal([1, 2, 3])).toEqual(6);
    expect(calculateTotal([1, 2, -3])).toEqual(0);
    expect(calculateTotal([30000, 2000234234, 8989])).toEqual(2000273223);
  });

  it("returns 0 if given empty array", () => {
    expect(calculateTotal([])).toEqual(0);
  });
});

describe("calculateFirstYearRDCredit", () => {
  it("returns the correct credit for positive QRE value", () => {
    expect(calculateFirstYearRDCredit(4000)).toEqual(240);
    expect(calculateFirstYearRDCredit(1000000)).toEqual(60000);
  });
  it("returns 0 if QRE value is negative", () => {
    expect(calculateFirstYearRDCredit(-1000)).toEqual(0);
  });
  it("returns 0 if QRE value is 0", () => {
    expect(calculateFirstYearRDCredit(0)).toEqual(0);
  });
});

describe("calculateRDCredit", () => {
  it("returns the correct RDCredit value for positive QRE values", () => {
    expect(calculateRDCredit(4000, 4000, 4000, 4000)).toEqual(280);
    expect(calculateRDCredit(25000, 20000, 30000, 25000)).toEqual(1750);
  });
  it("returns 0 if RDCredit value is negative", () => {
    expect(calculateRDCredit(25000, 20000, 30000, 10000)).toEqual(0);
    expect(calculateRDCredit(2500, 2000, 3000, 1200)).toEqual(0);
  });
});
