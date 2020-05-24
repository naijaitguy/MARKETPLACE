const express = require('express');
const App = express();
const DbCon = require('./Dbconfig')
//const route = express()
//const partials = require('express-partials');
const bodyparser = require('body-parser');
const Helper = require('./Assets/Helper');
const cors = require('cors');
const path = require('path');
const joi = require('joi');

App.use(express.static( path.join(__dirname,'Assets')));

App.set('Port', process.env.PORT|| 4000);
App.use(bodyparser.urlencoded({extended : true}));
App.use(bodyparser.json());
App.use(cors());
//App.use(partials());

const UserRoute = require('./Controller/UserController');
const IdentityRoute = require('./Controller/IdentityController');
const AdminRoute = require('./Controller/AdminController');
const MarketRoute = require('./Controller/MarketController');


/////////////////////////////



var multer  = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './Assets/image');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage: storage});

//////////////////////////////Identity Route ------------------------//////////////////

App.get('/Api/Identity/GetAllUsers', Helper.Authorization("Admin"), IdentityRoute.GetAllUser);
App.get('/Api/Identity/GetUserById/:id', Helper.Authorization(), IdentityRoute.GetUserByID);
App.post('/Api/Identity/RegisterUser',IdentityRoute.RegisterUser);
App.post('/Api/Identity/RegisterUserAdmin', Helper.Authorization("Admin"), IdentityRoute.RegisterUserAdmin);
App.post('/Api/Identity/AuthenticateUser',IdentityRoute.AuthenticateUser);
App.post('/Api/Identity/GetUserByEmail',   IdentityRoute.GetUserByEmail);

App.post('/Api/Identity/GetUserByUserName', IdentityRoute.GetUserByUserName);

/////////////////////////////////////////////////////////////////////////////////////////

          ///-------Market Route --------------////////////////////

          App.get('/Api/Market/GetAllMarket',  MarketRoute.GetAllMarket);
          App.get('/Api/Market/GetMarketById/:id', Helper.Authorization(), MarketRoute.GetMarketById);
          App.put('/Api/Market/UpdateMarket/:id', Helper.Authorization("Admin"), MarketRoute.UpdateMarket);
          App.post('/Api/Market/AddMarket', Helper.Authorization("Admin"), MarketRoute.AddMarket);
          App.delete('/Api/Market/DeleteMarket/:id', Helper.Authorization("Admin"), MarketRoute.DeleteMarket);
          App.post('/Api/Market/GetMarketByLocation', Helper.Authorization(),  MarketRoute.GetMarketByLocation);
          App.post('/Api/Market/GetMarketByCategory',Helper.Authorization(),  MarketRoute.GetMarketByCategory);
          App.post('/Api/Market/GetMarketByName', Helper.Authorization(),  MarketRoute.GetMarketByName);
          App.post('/Api/Market/upload', upload.single('file'), function(req, res, next) {
            console.log(req.file);
            if(!req.file) {
              res.status(404).json(err);
              return next(err);
            }
            res.json({ fileUrl: 'http://localhost:4000/image/' + req.file.filename });
          });
          


 ////////////////////////////////////////////////////////////////////////////////////////      
 
 


 /////////////////////////////////////////////////////////////////////////////////////////

          ///-------User Route --------------////////////////////



 ////////////////////////////////////////////////////////////////////////////////////////   



App.use(Helper.ErrorHandler)
App.get('*', function(req, res){ res.status(404).json("404 Not found ")})
App.post('*', function(req, res){ res.status(404).json("404 Not found ")})
App.put('*', function(req, res){ res.status(404).json("404 Not found ")})
App.delete('*', function(req, res){ res.status(404).json("404 Not found ")})

//////////////////custome 4040--------------
App.listen(4000, (err) =>
{ if (err) { console.log('server failed ')}
 else{console.log(' SERVER IS OPERATIONAL on Port 4000')} });
