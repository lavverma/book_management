const userModel = require("../models/userModel");
const bookModel = require("../models/bookModel");
const jwt = require("jsonwebtoken");

let authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
 
    if (!token)return res.status(400).send({ status: false,message: "Please give TOKEN in request"});

    
    jwt.verify(token, "BOOK-MANAGEMENT",function(err,decodedToken){
        if(err){
            return res.status(400).send({ status: false, message: err.message })
        }
        else{
            // req.userId=decodedToken.userId
           next()
        }
    });
   
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.authentication = authentication;

/////////////////////////////////////////////////////////////////////////////////////////////

const authorization = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];

    let decodedToken = jwt.verify(token, "BOOK-MANAGEMENT");

    let bookId = req.params.bookId;
    let user = await bookModel.findOne({ _id: bookId });

    if(!user)return res.status(404).send({status:false,message:"book is not present"})

    if (user.userId != decodedToken.userId)return res.status(400).send({ status: false, message: "user can't be manupilate someone else..!" });

    next()

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.authorization = authorization;


const authorizationCreateBook=async function(req,res,next){
    try {
        let token = req.headers["x-api-key"];

    let decodedToken = jwt.verify(token, "BOOK-MANAGEMENT");

    if(req.body.userId!=decodedToken.userId)return res.status(400).send({ status: false, message: "users only use their profile.." });

    next()

} catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}
module.exports.authorizationCreateBook=authorizationCreateBook