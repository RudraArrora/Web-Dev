const express = require ('express');
const path = require('path');
const { config } = require('process');

const port = 8000;
const db = require("./config/moongose");
const Contact = require('./model/contact');
const app  = express();


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));


app.use(express.urlencoded());
app.use(express.static('assets'));
var contactList = [
  {
    name: "Arpan",
    phone: "9812345",
  },
  {
    name: "Rudra",
    phone: "9812345",
  },
  {
    name: "Ritesh",
    phone: "9812345",
  },
];

app.get('/',function(req,res){
   return res.render('home',{
    contact:contactList
   });
})

app.post('/createContact',async function(req,res){
  try {
      await Contact.create({
        name: req.body.name,
        phone: req.body.phone,
      });
      console.log(req.body);
        res.redirect("/");
  } catch (error) {
        console.log("Error in populating the DB",error);
          res.redirect("/");
  }

    // contactList.push({
    //     name:req.body.name,
    //     phone: req.body.phone
    // });
    // res.redirect('/');
});

app.get("/deleteContact",function(req,res){
    console.log(req.query);
    let phone= req.query.phone;
    let indx = contactList.findIndex(contact => contact.phone == phone);
    console.log(indx);
    if (indx!=-1){
        contactList.splice(indx,1);
    }
    return res.redirect('/');
});

app.listen (port,function(err){
    if (err){
        console.log("Err in running the server",err);
    }
    console.log("Yup the server is running on port 8000");
})