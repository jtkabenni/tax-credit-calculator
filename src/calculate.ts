export {};

//calculation if there were no QREs in any previous tax years
export function calculateFirstYearRDCredit(QRE: number) {
  // ASC percentage for the R&D Tax Credit calculation
  const ASCPercentage = 0.06;
  // Multiply QRE by 6% to get the current year R&D Tax Credit
  let RDCredit = QRE * ASCPercentage;
  RDCredit = parseFloat(RDCredit.toFixed(2));
  return RDCredit;
}

// calculation if there were QREs in previous tax years
export function calculateRDCredit(
  y1: number,
  y2: number,
  y3: number,
  cy: number
) {
  // Calculate the average QRE from the last three years
  const averageQRE = (y1 + y2 + y3) / 3;

  // Multiply the average QRE by 50%
  const fiftyPercentOfAverage = averageQRE * 0.5;

  // Subtract 50% of the average from the current year QRE
  const remainder = cy - fiftyPercentOfAverage;

  // ASC percentage for the R&D Tax Credit calculation
  const ASCPercentage = 0.14;

  // Multiply the remainder by 14% to get the current year R&D Tax Credit
  let RDCredit = remainder * ASCPercentage;
  RDCredit = parseFloat(RDCredit.toFixed(2));
  return RDCredit;
}
