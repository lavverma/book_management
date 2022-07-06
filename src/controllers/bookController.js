const bookModel = require("../models/bookModel");

const valid = function (value) {
    if (typeof (value) === 'undefined' || value === null) return false 
    if (typeof (value) === "string" && value.trim().length == 0) return false
    return true
}


const createBook = async function (req, res) {
    try {
      const data = req.body;
  
      if (Object.keys(data).length == 0)
        return res.status(400).send({ status: false, message: "please provide data" });
  
      const { title, excerpt, ISBN, category, subcategory, releasedAt } = data;
  
      if (! valid(title))
        return res.status(400).send({ status: false, message: "please provide title" });
      
        const checkTitle = await bookModel.findOne({title: title,isDeleted: false,});
      if (checkTitle)
        return res.status(409).send({ status: false, message: "book already exist with this title" });
  
      if (! valid(excerpt))
        return res.status(400).send({ status: false, message: "please provide excerpt" });
  
      if (! valid(ISBN))
        return res.status(400).send({ status: false, message: "please provide ISBN" });
     
        const ISBNregex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
      if (!ISBNregex.test(ISBN))
        return res.status(400).send({ status: false, message: "please provide valid ISBN" });
      
        const checkISBN = await bookModel.findOne({ISBN: ISBN,isDeleted: false,});
      if (checkISBN)
        return res.status(409).send({ status: false, message: "book alredy exist with this ISBN" });
  
      if (! valid(category))return res.status(400).send({ status: false, message: "please provide category" });
      if (!subcategory)
        return res.status(400).send({ status: false, message: "please provide subcategory" });
      
        if (! valid(releasedAt))
        return res.status(400).send({ status: false, message: "please provide releasedAt" });
      const dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
      if (!dateRegex.test(releasedAt)) {
        return res.status(400).send({status: false,message: `Release date must be in "YYYY-MM-DD" format only And a "Valid Date"`,});}
     
     
        const saveData = await bookModel.create(data);
      return res.status(201).send({
        status: true,
        message: "Success",
        data: saveData,
      });
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };

  module.exports.createBook=createBook