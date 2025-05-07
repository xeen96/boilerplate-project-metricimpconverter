'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    
    const num = convertHandler.getNum(input); 
    const inU = convertHandler.getUnit(input);
    const oU = convertHandler.getReturnUnit(inU);
    const converted = convertHandler.convert(num, inU);
    const string = convertHandler.getString(num, inU, converted, oU);
    
    if (!num && !oU) {
      res.send("invalid number and unit");
      return;
    }
    else if (!num) {
      res.send("invalid number");
      return;
    }
    else if (!oU){
      res.send("invalid unit");
      return;
    }
    console.log(num, inU, oU, converted, string, req.query.input);
    res
    .json({
      initNum: num,
      initUnit: inU,
      returnNum: converted,
      returnUnit: oU,
      string: string
      }, null, 10);
  })
};
