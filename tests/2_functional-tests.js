const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Convert a valid input such as 10L to gal', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.isObject(res.body, 'Response should be an object');
        assert.equal(res.body.initNum, 10, 'initNum should be 10');
        assert.equal(res.body.initUnit, 'L', 'initUnit should be L');
        assert.equal(res.body.returnNum, 2.64172, 'returnNum should be 2.64172');
        assert.equal(res.body.returnUnit, 'gal', 'returnUnit should be gal');
        assert.equal(res.body.string, '10 liters converts to 2.64172 gallons', 'String should match expected format');
        done();
      });
  });

  test('Convert an invalid number such as 3/2/3kg', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/2/3kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(res.text, 'invalid number', 'Response should be "invalid number"');
        done();
      });
  });

  test('Convert an invalid unit such as 5xyz', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '5xyz' })
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(res.text, 'invalid unit', 'Response should be "invalid unit"');
        done();
      });
  });

  test('Convert an invalid number and unit such as 3/2/3xyz', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/2/3xyz' })
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(res.text, 'invalid number and unit', 'Response should be "invalid number and unit"');
        done();
      });
  });

  test('Convert with no number such as kg', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.isObject(res.body, 'Response should be an object');
        assert.equal(res.body.initNum, 1, 'initNum should be 1');
        assert.equal(res.body.initUnit, 'kg', 'initUnit should be kg');
        assert.equal(res.body.returnNum, 2.20462, 'returnNum should be 2.20462');
        assert.equal(res.body.returnUnit, 'lbs', 'returnUnit should be lbs');
        assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds', 'String should match expected format');
        done();
      });
  });

  test('Convert a fractional input such as 1/2mi to km', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '1/2mi' })
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.isObject(res.body, 'Response should be an object');
        assert.equal(res.body.initNum, 0.5, 'initNum should be 0.5');
        assert.equal(res.body.initUnit, 'mi', 'initUnit should be mi');
        assert.equal(res.body.returnNum, 0.80467, 'returnNum should be 0.80467');
        assert.equal(res.body.returnUnit, 'km', 'returnUnit should be km');
        assert.equal(res.body.string, '0.5 miles converts to 0.80467 kilometers', 'String should match expected format');
        done();
      });
  });

  test('Convert a case-insensitive unit such as 5GAL to L', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '5GAL' })
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.isObject(res.body, 'Response should be an object');
        assert.equal(res.body.initNum, 5, 'initNum should be 5');
        assert.equal(res.body.initUnit, 'gal', 'initUnit should be gal');
        assert.equal(res.body.returnNum, 18.92705, 'returnNum should be 18.92705');
        assert.equal(res.body.returnUnit, 'L', 'returnUnit should be L');
        assert.equal(res.body.string, '5 gallons converts to 18.92705 liters', 'String should match expected format');
        done();
      });
  });
});