const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const middleware=require("../middleware/auth")


router.post("/register", userController.createUser)


router.post("/login",userController.login)

router.post("/books",middleware.authentication,middleware.authorizationCreateBook,bookController.createBook)


router.get("/books",middleware.authentication,bookController.getBookByQuery)

router.get("/books/:bookId",middleware.authentication,bookController.getBookByParam)

router.put("/books/:bookId",middleware.authentication,bookController.updateBook)

router.delete("/books/:bookId",middleware.authentication,middleware.authorization,bookController.deleteBook)

// router.post("/books/:bookId/review",)
// router.put("/books/:bookId/review/:reviewId")
// router.delete("/books/:bookId/review/:reviewId")


module.exports = router;