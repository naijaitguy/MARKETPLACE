const express = require('express');
const App = express();
const jwt = require('jsonwebtoken');
const DbCon = require('../Dbconfig')
//const route = express()
const bodyparser = require('body-parser');
const cryptr = require('cryptr');
const path = require('path');
const joi = require('joi');
//const session = require('express-session');
const Helper = require('../Assets/Helper');
const bcrypt = require('bcrypt');
const config = require('../Config.json');





exports.AuthenticateUser = (req, res)=>{

    var Email = req.body.Email;
    var Password = req.body.Password; 


    joi.validate(req.body,Helper.ValidateAuthenticationInput(req.body), (err,result)=>{

        if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join('/')})}

        else{

            var SQL= "SELECT * FROM Users WHERE Email = ?";
            DbCon.query(SQL,Email, (err, Result)=>{

             if(err){ res.status(403).json({mgs:"Db Error"})}

                else{
   if(Result.length > 0){


      hash =  Result[0].Password;
       bcrypt.compare(Password, hash, function(err, result) {

        if(result == true) 
         { 
            const token = jwt.sign({ sub:Result[0].UserId , role: Result[0].Role }, config.secret);
            
           

             res.status(200).json({token:token,Id:Result[0].UserId ,UserName: Result[0].UserName });
            
            
            
            }
         else { res.status(404).json({mgs:"Invalid Login"}); }

         
        // result == true
    });


   }

   else{ res.status(403).json({mgs:"User not found"});}

                }
            });
        }
    });
 

};



exports.RegisterUser = (req, res)=>{

joi.validate(req.body,Helper.ValidateRegInput(req.body),(err, result)=>{
if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join('/')})}
else{
    var Password = req.body.Password
    var RegDate =  new  Date();
    var Role = "User";

   

             bcrypt.hash(Password, 10, function(err, hash) {
                // Store hash in your password DB.
                var User = {Email:req.body.Email, Password:hash,
                    Role: Role, Date:RegDate, 
                    Address: req.body.Address,
                     Phone :req.body.PhoneNumber,
                      UserName:req.body.UserName,
                        FullName :req.body.FullName}


                        var Sql = "INSERT INTO Users SET ? ";
                        DbCon.query(Sql,User,(err, Result)=>{
                    
                            if(err){ res.status(403).json({mgs:"failed to create account"})}
                            else{
                                res.status(200).json({mgs:"Registeration successful"})
                            }
                        });
                    
                        
                    

            });

   
   
}

});



  

};



exports.RegisterUserAdmin = (req, res)=>{

    joi.validate(req.body,Helper.ValidateRegInput(req.body),(err, result)=>{
    if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join('/')})}
    else{
        var Password = req.body.Password
        var RegDate =  new  Date();
        var Role = "Admin";
    
       
    
                 bcrypt.hash(Password, 10, function(err, hash) {
                    // Store hash in your password DB.
                    var User = {Email:req.body.Email, Password:hash,
                        Role: Role, Date:RegDate, 
                        Address: req.body.Address,
                         Phone :req.body.PhoneNumber,
                          UserName:req.body.UserName,
                            FullName :req.body.FullName}
    
    
                            var Sql = "INSERT INTO users SET ? ";
                            DbCon.query(Sql,User,(err, Result)=>{
                        
                                if(err){ res.status(403).json({mgs:"failed to create account"})}
                                else{
                                    res.status(200).json({mgs:"Registeration successful"})
                                }
                            });
                        
                            
                        
    
                });
    
       
       
    }
    
    });
    
    
    
      
    
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

exports.GetUserByID = (req,res)=>{

    const Id = req.params.id;
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== "Admin") {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    joi.validate(Id,Helper.ValidateInteger(),(err, result)=>{

        if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join('/')})}

        else{  
var Sql ="SELECT * FROM Users WHERE UserId = ? ";
DbCon.query( Sql,[Id],(err, Result)=>{

    if(err){ res.status(404).json({Mgs:" Query Error"});}

    else{ 

        if(Result.length > 0){ res.status(200).json(Result);}

        else{ res.status(404).json({Mgs:" ID Not Found"});}
    }
});

        }
    });
    
}


exports.GetUserByEmail = (req, res) =>{ 

    const Email = req.body.Email;
joi.validate(req.body,Helper.ValidateEmail(req.body),( err, result ) =>{

    if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join('/')})}
else{

    const Query = " SELECT * FROM Users where Email=? ";

    DbCon.query( Query,[Email], (err, Result) => {
   if(err){ res.status(404).json({Mgs:" Query Error"});}
   
   else{
   
    if(Result.length > 0) {    // console.log(Result);
        res.status(200).json(Result);}
        
        else{ res.status(404).json({Mgs:" Email Not Found"});}
  
   
      } 
   
   
   
      } );

}
});


   
}

exports.GetUserByUserName = (req, res)=>{

    const UserName = req.body.UserName;
    joi.validate(req.body,Helper.ValidateUserName(req.body),( err, result ) =>{
    
        if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join('/')})}
    else{
    
        const Query = " SELECT * FROM Users where UserName=? ";
    
        DbCon.query( Query,[UserName], (err, Result) => {
       if(err){ res.status(404).json({Mgs:" Query Error"});}
       
       else{
       
        if(Result.length > 0) {    // console.log(Result);
            res.status(200).json(Result);}
            
            else{ res.status(404).json({Mgs:" UserName Not Found"});}
      
       
          } 
       
       
       
          } );
    
    }
    });
    
}


exports.PageNotFound = (req, res) => {   
    res.render('404');

}



