const connection = require('mysql');

const DbCon = connection.createConnection({

    host: 'localhost',
    user: 'root',
    password : '', 
    database : 'MarketHub'
});

DbCon.connect( function(err){  
    if (err){ console.log("could not connect to db"); 
    
}
 else{
     console.log("Connection Successful")
    }
});

module.exports = DbCon;
