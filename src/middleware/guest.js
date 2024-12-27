// This function ensures that only authenticated users can access specific routes
const isLoggedIn = (req, res, next) => {
  // Check if the user is authenticated using the `req.isAuthenticated` method
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next(); 
  }
  // If the user is not authenticated, redirect them to the signin page
  res.redirect("/signin"); 
};

// Export the middleware for use in other parts of the application
export default isLoggedIn;
