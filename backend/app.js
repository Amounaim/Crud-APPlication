const express = require("express");
const app = express();
const db = require("./config/database");
const bodyParser = require("body-parser");
const Product= require('./models/Product');
const port = 3000;

//bring body parser 
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//bring event routes
/* const events = require("./routes/event-routes");
app.use("/api",events); */


//ADD a product
app.post('/api/product' , (req,res,next) => {
    //console.log(req.body); 
    const product = new Product({
         ...req.body
    });
    //La méthode save() renvoie une Promise.
    product.save()
    .then( () => res.status(201).json({message: 'produit enregistré !'}))
    .catch( error => res.status(400).json({error}));

});


// get product By Id
app.get('/api/product/:id', (req, res,next) => {

    Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json(product))
    .catch(error => res.status(400).json({ error }))

});

//Chercher un produit
app.post('/api/product/search' , (req,res,next) => {
    Product.find({ nom: {'$regex': req.body.name + '.*', '$options': 'i' }  })
    .then(product => res.status(200).json(product))
    .catch(error => res.status(400).json({ error }))

});

//app.get('/api/product/')

//Update product
app.put('/api/product/:id', (req, res, next) => {
    
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Produit modifié !'}))
      .catch(error => res.status(400).json({ error }));

});

//Delete product
app.delete('/api/product/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Produit supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });



//Get all producs
app.use('/api/product', (req, res, next) => {

    Product.find()
      .then(products => res.status(200).json(products))
      .catch(error => res.status(400).json({ error }));
});  



app.listen(port , ()=>{
    console.log("working fine!")
});