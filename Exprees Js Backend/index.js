const express = require('express');
const App = express();
const DbCon = require('./Dbconfig')
//const route = express()
//const partials = require('express-partials');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const joi = require('joi');

App.use(express.static( path.join(__dirname,'Assets')));


App.set('Port', process.env.PORT|| 4000);
App.use(bodyparser.urlencoded({extended : true}));
App.use(bodyparser.json());
//App.use(partials());

const UserRoute = require('./Controller/UserController');
const IdentityRoute = require('./Controller/IdentityController');
const AdminRoute = require('./Controller/AdminController');

//////////////////////////////

App.get('/Api/GetAllUsers', IdentityRoute.GetAllUser);







App.get('*', function(req, res){ res.status(404).json("not found ")})

//////////////////custome 4040--------------
App.listen(4000, (err) =>
{ if (err) { console.log('server failed ')}
 else{console.log(' SERVER IS OPERATIONAL on Port 4000....')} });
