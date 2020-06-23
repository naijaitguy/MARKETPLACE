const Express = require('express');
var multer  = require('multer');
const Route = Express.Router();
const Helper = require('../Assets/Helper');
const MarketController = require('../Controller/MarketController');
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

/////////////////////////////
Route.get('/', Helper.Authorization(), MarketController.GetAllMarket);
Route.get('/GetAllMarket', Helper.Authorization(), MarketController.GetAllMarket);
Route.get('/GetMarketById/:id', Helper.Authorization(), MarketController.GetMarketById);
Route.put('/UpdateMarket/:id', Helper.Authorization("Admin"), MarketController.UpdateMarket);
Route.post('/AddMarket', Helper.Authorization("Admin"), MarketController.AddMarket);
Route.delete('/DeleteMarket/:id', Helper.Authorization("Admin"), MarketController.DeleteMarket);
Route.post('/GetMarketByLocation', Helper.Authorization(),  MarketController.GetMarketByLocation);
Route.post('/GetMarketByCategory',Helper.Authorization(),  MarketController.GetMarketByCategory);
Route.post('/GetMarketByName', Helper.Authorization(),  MarketController.GetMarketByName);
Route.post('/upload', upload.single('file'), MarketController.Upload) 


module.exports = Route;