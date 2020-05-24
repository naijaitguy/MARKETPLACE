const Joi = require('joi');
const expressJwt = require('express-jwt');
const { secret } = require('../Config.json');




exports.ValidateRegInput = ( data)=>{

   const schema = Joi.object().keys({

      // email is required
      // email must be a valid email string
      Email: Joi.string().email().required().trim(),

      // phone is required
      // and must be a string of the format XXX-XXX-XXXX
      // where X is a digit (0-9)
      PhoneNumber: Joi.string().required(),

      // birthday is not required
      // birthday must be a valid ISO-8601 date
      // dates before Jan 1, 2014 are not allowed
      FullName: Joi.string().required().trim(),

      Password: Joi.string().required(),
      ConfirmPassword: Joi.string().required(),

      UserName: Joi.string().required(),

      Address: Joi.string().required(),

  });

  return schema;

}


exports.ValidateAuthenticationInput = ( data)=>{

   const schema = Joi.object().keys({

      // email is required
      // email must be a valid email string
      Email: Joi.string().email().required().trim(),

     

      Password: Joi.string().required(),

     

  });

  return schema;

}

exports.ValidateEmail = (data)=>{


   const schema = Joi.object().keys({

      // email is required
      // email must be a valid email string
      Email: Joi.string().email().required().trim(),
 

  });

  return schema;
}

exports.ValidateUserName = (data)=>{


   const schema = Joi.object().keys({

      // email is required
      // email must be a valid email string
      UserName: Joi.string().required().trim(),
 

  });

  return schema;
}


exports.ValidateInteger = ()=>{


   const schema =  Joi.number().required();
 

 
  return schema;
}



exports.Authorization = (roles = [])=> {


   // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
      roles = [roles];
  }

  return [
      // authenticate JWT token and attach user to request object (req.user)
      expressJwt({ secret }),

      // authorize based on user role
      (req, res, next) => {
          if (roles.length && !roles.includes(req.user.role)) {
              // user's role is not authorized
              return res.status(401).json({ message: 'Unauthorized' });
          }

          // authentication and authorization successful
          next();
      }
  ];

}

exports.ErrorHandler =  (err, req, res, next) => {
   if (typeof (err) === 'string') {
       // custom application error
       return res.status(400).json({ message: err });
   }

   if (err.name === 'UnauthorizedError') {
       // jwt authentication error
       return res.status(401).json({ message: 'Invalid Token' });
   }

   // default to 500 server error
   return res.status(500).json({ message: err.message });
}


exports.ValidateMaketModel = ( data)=>{

   const schema = Joi.object().keys({

      // email is required
      // email must be a valid email string
    

      Location: Joi.string().required(),

      Category: Joi.string().required(),

      MarketName: Joi.string().required(),

      Discription: Joi.string().required(),

      Image1: Joi.string().required(),
      Image2: Joi.string().required(),
      Image3: Joi.string().required(),

     

  });

  return schema;

}

exports.ValidateUpdateMaketModel = ( data)=>{

   const schema = Joi.object().keys({

      // email is required
      // email must be a valid email string
    

      Location: Joi.string().required(),

      Category: Joi.string().required(),

      MarketName: Joi.string().required(),

      Discription: Joi.string().required(),

      

     

  });

  return schema;

}

exports.ValidateString = ()=>{


   const schema =  Joi.string().required().trim(); 

 
  return schema;
}

