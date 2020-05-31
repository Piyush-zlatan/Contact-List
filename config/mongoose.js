const mongoose  = require('mongoose');  //require libraray



mongoose.connect('mongodb://localhost/contact_list_db');    //connect to db

const db = mongoose.connection;         //aquire the connection to check if it is succussfull

//error
db.on('error',console.error.bind(console,'Error connecting to db'));

//if it is up and running print message
db.once('open',function(){
    console.log('Succussfully connected to database');
})
