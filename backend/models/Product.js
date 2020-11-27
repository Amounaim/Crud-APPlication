const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    nom           : {type: String , required: true},
    prix          : {type: Number , required: true},
    quantite      : {type: Number , required: true},
    
});

module.exports = mongoose.model('Product',productSchema,"products");