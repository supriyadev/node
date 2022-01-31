// include required packages
const express=require('express');
const fs=require('fs');
const nodemon=require('nodemon');
const mongoose=require('mongoose');
const Joi =require('joi');
const app = express();
const bodyParser=require('body-parser');
const {File,validate}=require('./models/file');
const port = process.env.PORT || 4000;
var url = "mongodb://localhost";
var MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// mongoose.connect('mongodb://localhost/storefile')
// .then(() => console.log('Connected to MongoDB...'))
// .catch(err => console.error('Could not connect to MongoDB...'));

   
// Read users.json file
var data = fs.readFileSync('City.json');
    var City= JSON.parse(data);

// console.log(City);
 
app.get('/api', async(req,res)=>{
    // throw new Error('could not connect');
    var data = fs.readFileSync('City.json');
    var City= JSON.parse(data);
    res.send(City);
  });
app.post('/api/files', async(req,res)=>{
    //using model shema

        // const { error } = validate(req.body); 
        // if (error) return res.status(400).send(error.details[0].message);
      
        // let file = new File({ 
        //     tokenId:req.body.tokenId,
        //   name: req.body.name,
        //   description: req.body.description,
        //   image: req.body.image
        // });
        // file = await file.save();
        
        // res.send(file);


        //direct insert json file 
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("storefile");
            var data = fs.readFileSync('City.json');
            var City= JSON.parse(data);
                // db.collection.createIndex( { name: 1 }, {unique:true} );
            dbo.collection("files").insertOne(City, function(err, res) {
                // db.collection.createIndex( { user: 1, title: 1, Bank: 1 }, {unique:true} )
                
              if (err) throw err;
              console.log("1 document inserted");

              
              db.close();
            });
          });
      });

app.listen(port, () => console.log(`Listening on port ${port}...`));


