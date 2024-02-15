const express = require('express')
const router = express.Router()
const {verifyIsLoggedIn} = require('../middleware/verifyAuthToken');
const {uploadingImage} = require('../middleware/multer');
// const {registerUser,loginUser, createCandidate, getCandidates} = require("../controllers/userController")
const {registerUser,loginUser, getUser, uploadImage, getImages} = require("../controllers/userController")




// Route for user registration
router.post("/register", registerUser)
// // Route for user login
router.post("/login", loginUser)

// Routes that require the user to be logged in (protected routes)
 router.use(verifyIsLoggedIn); 
 router.post("/user/upload-image", uploadingImage.single('image') ,uploadImage)

 router.get("/user/getUser",getUser);
 router.get("/user/getImages",getImages);


// // Route to create a candidate (available only for logged-in users)
// router.post('/candidate', createCandidate);

// // Route to get candidates (available only for logged-in users)
// router.get('/candidate', getCandidates);


module.exports = router
