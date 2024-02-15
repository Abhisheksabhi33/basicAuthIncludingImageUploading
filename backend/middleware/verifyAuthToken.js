// Import the JSON Web Token (JWT) library
const jwt = require("jsonwebtoken");

// Middleware function to verify if the user is logged in
const verifyIsLoggedIn = (req, res, next) => {
    try {
        // Get the token from the request cookies
        const token = req.cookies.access_token;

        // If no token is present, return a forbidden response
        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }

        try {
            // Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            // Attach the decoded user information to the request object
            req.user = decoded;

            // Move to the next middleware or route handler
            next();
        } catch (err) {
            // If the token is invalid, return an unauthorized response
            return res.status(401).send("Unauthorized. Invalid Token");
        }
    } catch (err) {
        // Pass any errors to the next middleware for handling
        next(err);
    }
}

// Export the middleware for use in other parts of the application
module.exports = { verifyIsLoggedIn };
