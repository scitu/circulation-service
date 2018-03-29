var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // var date = [ "วันจันทร์" ," วันอังคาร" ,"วันพุธ", "วันพฤหัส" ,"วันศุกร์"]
  // var date = { date : ["mon","tues","wed"] }

  var dates = {
    date: ["วันจันทร์", " วันอังคาร", "วันพุธ", "วันพฤหัส", "วันศุกร์"],
    item: ["computer01", "computer02", "computer03", "computer04",
      "computer05", "computer06", "computer07", "computer08",
      "computer09", "computer10", "music01", "music02",
      "switch01", "switch02", "switch03", "projector01",
      "projector02", "projector03", "projector04", "projector05",],
      amountclick : 10,
      amountperiod : 5
  }



  res.render('index.ejs', {
    title: 'Express',
    dates: dates
  });
});

module.exports = router;
