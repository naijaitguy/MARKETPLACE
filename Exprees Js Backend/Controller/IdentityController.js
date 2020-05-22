const express = require('express');
const App = express();
const DbCon = require('../Dbconfig')
//const route = express()
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const joi = require('joi');
//const session = require('express-session');
const Helper = require('../Assets/Helper');




exports.AuthenticateUser = (req, res)=>{

    var Eamil = req.body.Email;
    var Password = req.body.Password;



};



exports.RegisterUser = (req, res)=>{


    
    var Eamil = req.body.Email;
    var Password = req.body.Password;
    var UserName = req.body.UserName;
    var FullName = req.body.FullName;
    var Phone = req.body.Phone;
    var Address = req.body.Address;

};



exports.GetAllUser = (req, res) =>{ 

    const Query = " SELECT * FROM Users ";

 DbCon.query( Query, (err, Result) => {
if(err){  console.log(err);}

else{

   // console.log(Result);
   res.status(200).json(Result);

   } 



   } );
}

exports.PageNotFound = (req, res) => {   
    res.render('404');

}



