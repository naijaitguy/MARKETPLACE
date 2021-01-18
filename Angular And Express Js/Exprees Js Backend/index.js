const express = require('express');
const App = express();
const bodyparser = require('body-parser');
const Helper = require('./Assets/Helper');
const cors = require('cors');
const path = require('path');
const MarketRoute = require('./Routes/MarketRoute');
const IdentityRoute = require('./Routes/IdentityRoute');
App.use(express.static( path.join(__dirname,'Assets')));

App.set('Port', process.env.PORT|| 4000);
App.use(bodyparser.urlencoded({extended : true}));
App.use(bodyparser.json());
App.use(cors());
App.use('/Api/Market', MarketRoute);
App.use('/Api/Identity', IdentityRoute);
App.use(Helper.ErrorHandler)

/////////////////////////////////////////////////////////////////////
App.get('*', function(req, res){ res.status(404).json("404 Not found ")})
App.post('*', function(req, res){ res.status(404).json("404 Not found ")})
App.put('*', function(req, res){ res.status(404).json("404 Not found ")})
App.delete('*', function(req, res){ res.status(404).json("404 Not found ")})

//////////////////custome 4040--------------
App.listen(4000, (err) =>
{ if (err) { console.log('server failed ')}
 else{console.log(' SERVER IS OPERATIONAL on Port 4000')} });