const joi = require('joi');

exports.LoginValidation= function(req, res){

    const Email = req.Email;
    const Password = req.Password;

    const bodyschema = joi.object().keys({
       
    
        Email: joi.string().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required().error(errors => {errors.forEach(err =>{
           
        switch(err.type){
     case "any.empty": err.message = "Email Address is Required ";
     break;
     case "string.regex.base": err.message =" Email Address Not Valid";
     
    break;
    default: break;
    
       }} ); return errors; }),
        Password: joi.string().trim().min(6).max(12).required().error(errorsp => {errorsp.forEach(err =>{
           
                switch(err.type){
                case "any.empty": err.message = "Password  is Required ";
                break;
                case "string.min": err.message = " Password Can Not Be Less than six character";
                break;
    
                case "string.max": err.message = " PAssword can not be more than 12 character";
                break;
                default: break;
                
                   }} ); return errorsp;
                
                }),
    
    } );


    return bodyschema;
}


