// Middleware to check if the user is logged in (authenticated)
const isLoggedIn = (req, res, next) => {
  // Check if the user is authenticated using the passport 'isAuthenticated' method
  if (req.isAuthenticated && req.isAuthenticated()) {
    // If authenticated, allow the request to proceed to the next middleware or route handler
    return next();
  }

  // If not authenticated, redirect the user to the login (signin) page
  res.redirect("/signin");
};

// Export the middleware for use in other parts of the application
export default isLoggedIn;
