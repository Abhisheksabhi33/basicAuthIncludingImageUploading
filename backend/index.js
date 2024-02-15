const express = require("express");
const cookieParser = require("cookie-parser");
const apiRoutes = require('./routes/apiRoutes');
const connectDB = require('./config/db');
require("dotenv").config();
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies

//check the connection
app.get("/", (req, res) => {
    res.json({ message: "server running..." });
});

// Use API routes defined in apiRoutes.js
app.use(apiRoutes);


// Database connection and server startup
const startServer = async () => {
  try {
    // Connect to the MongoDB database
    await connectDB();
    // Start the server on the specified port
    app.listen(PORT, () => {
      console.log(`Main Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

// Start the server
startServer();
