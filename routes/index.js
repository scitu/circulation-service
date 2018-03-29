var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var credentials = require('../credentials.json');
var fetch = require('node-fetch');
var formurlencoded = require('form-urlencoded');
router.use(session({
    secret: credentials.secretSession,
    resave: true,
    saveUninitialized: true
}));
// parse application/json
router.use(bodyParser.json())

// const apiUrl = "https://api.tu.ac.th";
const apiUrl = "http://api.tu.ac.th";

var auth = function(req, res, next) {
  if(!req.session.auth)
    res.redirect(apiUrl+'/o/authorize/?client_id='+credentials.clientId+'&response_type=code&state=random_state_string')
  else
    next()
}
/* GET home page. */
router.get('/', auth, function(req, res, next) {
  
  res.render('index', { title: 'Express' });
});

router.get('/auth/complete', function(req, res, next) {
  let state = req.query.state;
  let code = req.query.code;
  req.session.auth = true;
  
  var bodyJSON = {
    "grant_type": "authorization_code",
    "client_id": credentials.clientId,
    "client_secret": credentials.clientSecret,
    "code": code,
    "redirect_uri": credentials.redirectUri
  }
  
  let oTokenUrl = apiUrl+"/o/token/";
  // fetch(oTokenUrl, {
  //   method: 'POST',
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   },
  //   // body: JSON.stringify(bodyJSON)
  //   body: JSON.stringify(bodyJSON)
  // }).then(res => {
  //   console.log('res: ', res)
  //   // res.json().then(json => { console.log('Response from :', json)})
  // })
  console.log('code: ', code)
  res.json({
    state: state,
    code: code
  })
});

router.get('/auth/token', function(req, res, next) {
  console.log('/auth/token req.')
  console.log(req.query)
  res.json({
    message: "test"
  })
});

router.post('/test', function(req, res, next) {
  console.log('/test POST req.')
  console.log('query.body: ', req.body)
  res.json({
    status: true,
    message: "clean"
  })
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/')
});
module.exports = router;
