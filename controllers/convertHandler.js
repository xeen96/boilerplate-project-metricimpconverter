function ConvertHandler() {
  const units = {
    km: 'mi',
    kg: 'lbs',
    gal: 'L',
    mi: 'km',
    lbs: 'kg',
    L: 'gal',
  };
  const findUnit = (input) => {
    input = input.toLowerCase();
    for (let unit in units) {
      if (input.endsWith(unit.toLowerCase())) {
        return unit;
      }
      if (input.endsWith(units[unit].toLowerCase())){
        return units[unit];
      }
    }
    return null;
  };

  this.getNum = function(input) {
    const numPart = input.match(/^[\d./]+/)?.[0];
    if (!numPart) return 1;
    if (numPart.match(/\//g)?.length > 1) return null; 
    const fractionRegex = /^(\d*\.?\d+)(\/(\d*\.?\d+))?$/;
    const match = numPart.match(fractionRegex);
    if (!match) return null;
    let num = parseFloat(match[1]);
    let denom = match[3] ? parseFloat(match[3]) : 1;
    return denom !== 0 ? num / denom : null; 
  };
  
  this.getUnit = function(input) {
    return findUnit(input);
  };
  
  this.getReturnUnit = function(initUnit) {
    return units[initUnit] || null;
  };

  this.spellOutUnit = function(unit) {
    const spellUnits = {
      km: 'kilometers',
      kg: 'kilograms',
      L: 'liters',
      mi: 'miles',
      lbs: 'pounds',
      gal: 'gallons'
    };
    return spellUnits[unit] || null;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return null;
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${Number(returnNum)} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
