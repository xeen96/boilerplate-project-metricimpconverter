const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('getNum should correctly read a whole number input', function() {
    assert.strictEqual(convertHandler.getNum('5km'), 5, 'Whole number input should return 5');
  });

  test('getNum should correctly read a decimal number input', function() {
    assert.strictEqual(convertHandler.getNum('5.5km'), 5.5, 'Decimal number input should return 5.5');
  });

  test('getNum should correctly read a fractional input', function() {
    assert.strictEqual(convertHandler.getNum('3/2km'), 1.5, 'Fractional input 3/2 should return 1.5');
  });

  test('getNum should return null for invalid double fraction input', function() {
    assert.isNull(convertHandler.getNum('3/2/3km'), 'Double fraction 3/2/3 should return null');
  });

  test('getNum should default to 1 when no numerical input is provided', function() {
    assert.strictEqual(convertHandler.getNum('km'), 1, 'No numerical input should default to 1');
  });

  test('convert should correctly convert gal to L', function() {
    assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541, '1 gal should convert to 3.78541 L');
  });

  test('convert should correctly convert km to mi', function() {
    assert.strictEqual(convertHandler.convert(1, 'km'), 0.62137, '1 km should convert to 0.62137 mi');
  });

  test('getUnit should correctly read valid units case-insensitively', function() {
    assert.strictEqual(convertHandler.getUnit('10KG'), 'kg', 'KG should return kg');
    assert.strictEqual(convertHandler.getUnit('5Gal'), 'gal', 'Gal should return gal');
  });

  test('getUnit should return null for invalid unit', function() {
    assert.isNull(convertHandler.getUnit('5xyz'), 'Invalid unit xyz should return null');
  });

  test('getString should return correct conversion string', function() {
    const num = 5;
    const unit = 'km';
    const converted = convertHandler.convert(num, unit);
    const returnUnit = convertHandler.getReturnUnit(unit);
    const expected = '5 kilometers converts to 3.10686 miles';
    assert.strictEqual(convertHandler.getString(num, unit, converted, returnUnit), expected, 'String should match expected format');
  });

  // New Tests Start Here
  test('convert should correctly convert lbs to kg', function() {
    assert.strictEqual(convertHandler.convert(1, 'lbs'), 0.45359, '1 lbs should convert to 0.45359 kg');
  });

  test('convert should correctly convert kg to lbs', function() {
    assert.strictEqual(convertHandler.convert(1, 'kg'), 2.20462, '1 kg should convert to 2.20462 lbs');
  });

  test('convert should correctly convert L to gal', function() {
    assert.strictEqual(convertHandler.convert(1, 'L'), 0.26417, '1 L should convert to 0.26417 gal');
  });

  test('convert should correctly convert mi to km', function() {
    assert.strictEqual(convertHandler.convert(1, 'mi'), 1.60934, '1 mi should convert to 1.60934 km');
  });

  test('getNum should correctly read a decimal fraction input', function() {
    assert.strictEqual(convertHandler.getNum('2.5/2km'), 1.25, 'Decimal fraction 2.5/2 should return 1.25');
  });

  test('getNum should return null for division by zero', function() {
    assert.isNull(convertHandler.getNum('5/0km'), 'Fraction with zero denominator should return null');
  });

  test('getReturnUnit should return correct unit for valid input', function() {
    assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal', 'L should return gal');
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs', 'kg should return lbs');
  });

  test('spellOutUnit should return correct spelled-out unit', function() {
    assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters', 'L should return liters');
    assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds', 'lbs should return pounds');
  });

  test('convert should handle zero input correctly', function() {
    assert.strictEqual(convertHandler.convert(0, 'gal'), 0, '0 gal should convert to 0 L');
  });
});