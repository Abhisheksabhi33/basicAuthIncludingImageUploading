// Import required models and utilities
const User = require("../models/UserModel");
const Photo = require("../models/PhotoModel");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;
require("dotenv").config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});


// Controller function to register a new user
const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate input fields
    if (!(firstName && lastName && email && password)) {
      return res.status(400).send("All inputs are required");
    }

    // Validate email format
    const validEmail = /\S+@\S+\.\S+/;
    if (!validEmail.test(email)) {
      return res.status(400).send("Invalid email format");
    }

    // Validate password length
    if (password.length < 8) {
      return res
        .status(400)
        .send("Password must be at least 8 characters long");
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });

    // If user exists, return a conflict response
    if (userExists) {
      return res.status(409).send("User already exists");
    }

    // Hash the user's password
    const hashedPassword = hashPassword(password);

    // Create a new user and API key
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      photos: [],
    });

    // Generate and set the authentication token as a cookie
    res
      .cookie(
        "access_token",
        generateAuthToken(user._id, user.firstName, user.lastName, user.email),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "development",
          sameSite: "strict",

        }
      )
      .status(201)
      .json({
        success: "User created successfully",
        userCreated: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          apiKey: user.apiKey,
        },
      });
  } catch (error) {
    next(error);
  }
};

// Controller function to log in a user
const loginUser = async (req, res, next) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Validate input fields
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    // Find the user by email and verify password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Email not exists");
    }

    // If the user exists and password is correct, set the authentication token as a cookie
    if (user && comparePasswords(password, user.password)) {
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
        'Access-Control-Allow-Origin': 'http://localhost:8000',
      };

      return res
        .cookie(
          "access_token",
          generateAuthToken(user._id, user.name, user.lastName, user.email),
          cookieParams
        )
        .json({
          success: "User logged in",
          userLoggedIn: {
            _id: user._id,
            name: user.firstName,
            lastName: user.lastName,
            email: user.email,
            apiKey: user.apiKey,
            token: generateAuthToken(user._id, user.firstName, user.lastName, user.email),
          },
        });
    } else {
      // If the user or password is incorrect, return an unauthorized response
      return res.status(401).send("Wrong credentials");
    }
  } catch (error) {
    // Pass any errors to the next middleware for handling
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    // Assuming you have stored the user ID in req.user after login
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user details
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      // Add any other user details you want to send
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

const uploadImage = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { file } = req;

    if (!title || !description || !file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newImage = new Photo({title, description});
    newImage.user = req.user._id;

    const uploadRes = await cloudinary.uploader.upload(file.path);
    newImage.image = {
      url: uploadRes.secure_url,
      public_id: uploadRes.public_id,
    };

    await newImage.save();
    return res.status(201).json({
      success: "Photo uploaded successfully",
      newImage,
    });

  } catch (error) { 
    next(null);
  }

};

const getImages = async (req, res, next) => {
  try {
    const images = await Photo.find({ user: req.user._id });

    if (!images) {
      return res.status(404).json({ message: "No images found" });
    }

    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
}
  

// Export the controller functions for use in other parts of the application
module.exports = { registerUser, loginUser, getUser, uploadImage, getImages };
