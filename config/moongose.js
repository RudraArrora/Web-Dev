const mongoose  = require ('mongoose');


mongoose.connect(
  "mongodb+srv://rudra:arora@cluster0.xiuoi.mongodb.net/revContactList"
);


const db = mongoose.connection;
db.on("error", console.error.bind(console, "error in connecting to db"));
// is up and running then print the message
db.once("open", function () {
  console.log("succesfully connected to data base");
});