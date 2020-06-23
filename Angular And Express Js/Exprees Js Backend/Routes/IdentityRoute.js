const Express = require('express');
const Route = Express.Router();
const Helper = require('../Assets/Helper');
const IdentityController = require('../Controller/IdentityController');

//////////////////////////////Identity Route ------------------------//////////////////

Route.get('/GetAllUsers', Helper.Authorization("Admin"), IdentityController.GetAllUser);
Route.get('/GetUserById/:id', Helper.Authorization(), IdentityController.GetUserByID);
Route.post('/RegisterUser',IdentityController.RegisterUser);
Route.post('/RegisterUserAdmin', Helper.Authorization("Admin"), IdentityController.RegisterUserAdmin);
Route.post('/AuthenticateUser',IdentityController.AuthenticateUser);
Route.post('/GetUserByEmail',   IdentityController.GetUserByEmail);
Route.post('/GetUserByUserName', IdentityController.GetUserByUserName);


module.exports = Route;