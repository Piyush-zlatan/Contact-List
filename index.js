const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());      //It is a middleware
app.use(express.static('assets'));

//middleware1 (next will transfer the control to the next middleware if any else it will send it to next contoller)
// app.use(function(req,res,next){
//     console.log('middleware 1 called');
//     next();
// });

 var contactList = [
     {
        name: "Piyush",
        phone: "111111"
     },
     {  
         name:"Test",
         phone:"98398"
     }

 ]



app.get('/',function(req,res){                      //Controller to get the views with data and show it to user.
    // console.log(__dirname);
    // res.send('It is running');

    Contact.find({},function(err,contacts){

        if(err){
            console.log('error in finding contacts');
            return;
        }
        return res.render('home',{
            title:"My Contacts List",
            contact_List:contacts

        });
    }) 

    


});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "Practice Ejs"
    });

});

app.get('/delete-contact/',function(req,res){
//    console.log(req.query.params);
//get id to find the number and delete
    let id = req.query.id;


    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }

    Contact.findByIdAndDelete(id,function(err){

         if(err){
             console.log('Error in deleting');
             return;
         }
         return res.redirect('back');
    });

   

});

app.post('/create-contact',function(req,res){

   // return res.redirect('/practice');
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    //     });

    Contact.create({
        name:req.body.name,
        phone:req.body.phone

    }, function(err,newContact){

        if(err){
            console.log('Error in creating contact');
            return;
        }
        console.log('*******',newContact);
        return res.redirect('/');
    });

        
});

app.listen(port,function(err){
    if(err){

        console.log('Error in server',err);
    }
    console.log('Server running express on port',port);

});