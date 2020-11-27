const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/rctCfldsDB' ,{ useUnifiedTopology: true }  , (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('connected to db is successfuly ...')
    }
})