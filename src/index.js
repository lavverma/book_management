const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();
const multer=require("multer")
const {AppConfig}=require("aws-sdk")

app.use(bodyParser.json());


mongoose.connect("mongodb+srv://lavverma:8573007234@cluster0.hdldl.mongodb.net/group34Database?retryWrites=true&w=majority", { 
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected succsessfully"))
.catch ( err => console.log(err) )

app.use('/', route);

app.use(multer().any())


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});