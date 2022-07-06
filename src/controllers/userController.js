const userModel = require("../models/userModel");


const valid = function (value) {

    if (typeof (value) === 'undefined' || value === null) return false 
    if (typeof (value) === "string" && value.trim().length == 0) return false

    return true
}

const createUser=async function(req,res){
    try {
 let {title,name,phone,email,password,address}=req.body
  
 if(!valid(title))return res.status(400).send({status:false,message:"Please give title"})
 if(title!="Mr" || title!="Mrs" || title!="Miss")return res.status(400).send({status:false,message:"please give correct enum input"})

 if(!valid(name))return res.status(400).send({status:false,message:"Please give name"})

 if(!valid(phone))return res.status(400).send({status:false,message:"Please give phone"})

 if(!valid(email))return res.status(400).send({status:false,message:"Please give email"})

 if(!valid(password))return res.status(400).send({status:false,message:"Please give password"})


} catch (err) { return res.status(500).send({ status: false, message: err.message }) }

}
module.exports.createUser=createUser