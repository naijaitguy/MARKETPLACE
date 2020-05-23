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



exports.GetAllMarket = (req,res)=>{

    var Sql=" SELECT * FROM market ";
    DbCon.query(Sql, (err, Result) =>{ 
    if(err){ res.status(404).json("Query Error")}
    else{ 
        if(Result.length > 0){
        
        res.status(200).json(Result); }
         else{  res.status(404).json("No Market Found") }

        }
     });

}

exports.GetMarketById = (req,res)=>{
const Id = req.params.id;
    joi.validate(Id, Helper.ValidateInteger(), (err, Result)=>{
        if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join('/')})}
        else{
            var Sql=" SELECT * FROM market WHERE MarketId = ?";
            DbCon.query(Sql,[Id], (err, Result) =>{ 
            if(err){ res.status(404).json("Query Error")}
            else{ 
                if(Result.length > 0){
                
                res.status(200).json(Result); }
                 else{  res.status(404).json("No Market Found") }
        
                }
             });
            
        }


    });
 
}

exports.UpdateMarket = (req,res)=>{

   var MarketName = req.body.MarketName;
    var Location = req.body.Location;
    var Category = req.body.Category;
    var Discription = req.body.Discription;
    var Id = req.params.id;
    joi.validate(Id, Helper.ValidateInteger(), (err, Result)=>{
        if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join('/')})}
        else{
           
            joi.validate(req.body,Helper.ValidateUpdateMaketModel() ,(err, result)=>{

                if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join('/')})}

                    else { var Sql=" SELECT * FROM market WHERE MarketId = ?";
                    DbCon.query(Sql,[Id], (err, Result) =>{ 
                    if(err){ res.status(404).json("Query Error")}
                    else{ 
                        if(Result.length > 0){
                        
                       var SQL = "Update market Set Name = ?, Location=?,Category=?,Discription=? WHERE MarketId = ? ";

                       DbCon.query( SQL,[MarketName,Location,Category,Discription,Id],(err, UpdateResult)=>{
                        if(err){ res.status(404).json("Query Error")}

                      else{
                        if(UpdateResult){
                        
                        res.status(200).json("Update Successful");}else 
                        { 
                            console.log(err)
                            res.status(404).json("Update Failed")}


                      }

                       } );

                    
                    }
                        else{  res.status(404).json("No Market Found") }

                        }
                    });

                    }

            });
        }
    });
}

exports.DeleteMarket = (req,res)=>{


    const Id = req.params.id;
    joi.validate(Id, Helper.ValidateInteger(), (err, Result)=>{
        if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join('/')})}
        else{
            var Sql=" SELECT * FROM market WHERE MarketId = ?";
            DbCon.query(Sql,[Id], (err, Result) =>{ 
            if(err){ res.status(404).json("Query Error")}
            else{ 
                if(Result.length > 0){
                
                  const DeleteQuery= " DELETE FROM market WHERE MarketId = ? ";
                    DbCon.query(DeleteQuery,[Id],(err, DeleteResult)=>{
                        if(err){ res.status(404).json("Query Error")}
                        else{ 
                            if(DeleteResult){  res.status(200).json("Market Removed Successfully");


                            }

                            else{  res.status(403).json("Cold Not Delete Market");


                            }
                        }

                    });

              
                  }

                 else{  res.status(404).json("No Market Found") }

        
             }
             });
            
        }


    });
 

}

exports.GetMarketByLocation = (req,res)=>{


    joi.validate(req.body.Location, Helper.ValidateString(), (err, Result)=>{
        if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join('/')})}
        else{
            var Sql=" SELECT * FROM market WHERE Location = ?";
            DbCon.query(Sql,[req.body.Location], (err, Result) =>{ 
            if(err){ res.status(404).json("Query Error")}
            else{ 
                if(Result.length > 0){
                
                res.status(200).json(Result); }
                 else{  res.status(404).json("No Market Found") }
        
                }
             });
            
        }


    });

}

exports.GetMarketByCategory = (req,res)=>{


    joi.validate(req.body.Category, Helper.ValidateString(), (err, Result)=>{
        if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join('/')})}
        else{
            var Sql=" SELECT * FROM market WHERE Category = ?";
            DbCon.query(Sql,[req.body.Category], (err, Result) =>{ 
            if(err){ res.status(404).json("Query Error")}
            else{ 
                if(Result.length > 0){
                
                res.status(200).json(Result); }
                 else{  res.status(404).json("No Market Found") }
        
                }
             });
            
        }


    });
}

exports.GetMarketByName = (req,res)=>{


    joi.validate(req.body.MarketName, Helper.ValidateString(), (err, Result)=>{
        if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join('/')})}
        else{
            var Sql=" SELECT * FROM market WHERE Name = ?";
            DbCon.query(Sql,[req.body.MarketName], (err, Result) =>{ 
            if(err){ res.status(404).json("Query Error")}
            else{ 
                if(Result.length > 0){
                
                res.status(200).json(Result); }
                 else{  res.status(404).json("No Market Found") }
        
                }
             });
            
        }


    });
}

exports.AddMarket = (req,res)=>{

    joi.validate(req.body,Helper.ValidateMaketModel() ,(err, result)=>{

        var Market = {

    Location: req.body.Location,
    CreatedDate: new Date(),
    UserId: req.user.sub,

      Category: req.body.Category,

      Name:req.body.MarketName,

      Discription: req.body.Discription,

      Image1: req.body.Image1,
      Image2: req.body.Image2,
      Image3: req.body.Image3,

        };

        if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join('/')})}

            else { var Sql="INSERT INTO market SET ? ";
            DbCon.query(Sql,[Market], (err, Result) =>{ 
            if(err){ res.status(404).json("Query Error"); console.log(err)}
            else{ 
                if(Result){
                    res.status(200).json("Market Added Successfully");
               
            
            }
                else{  res.status(404).json("Fail to Add ") }

                }
            });

            }

    });

}

exports.Upload = ()=>{}