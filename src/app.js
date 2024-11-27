import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import passportInit from "./passport/passport.js";

// Convert the current file URL to a path for use with the 'path' module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the Express application
const app = express();

// CORS configuration to allow cross-origin requests
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Origin URL from environment variables
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Session configuration for maintaining user sessions
app.use(
  session({
    secret: process.env.SECRET_KEY, // Secret key for session signing
    resave: false, // Do not resave the session if it was not modified
    saveUninitialized: false, // Do not create a session until something is stored
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // Set cookie expiry (1 day)
  })
);

// Initialize passport for user authentication
passportInit(passport); // Initialize passport strategies (e.g., Local, OAuth)
app.use(passport.initialize()); // Initialize passport middleware
app.use(passport.session()); // Use passport session to store user info in the session

// Connect-flash middleware for flash messages (used for showing messages like success, error)
app.use(flash());

// Middleware to parse incoming JSON data (with a limit of 21 KB)
app.use(express.json({ limit: "21kb" }));

// Middleware to parse URL-encoded form data (with a limit of 21 KB)
app.use(express.urlencoded({ extended: true, limit: "21kb" }));

// Cookie parser middleware to parse cookies from HTTP requests
app.use(cookieParser());

// Set EJS as the template engine for rendering views
app.set("view engine", "ejs");

// Set the directory for views (EJS templates)
app.set("views", path.join(__dirname, "views"));

// Define the path for static files (public assets like images, CSS, JS)
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath)); // Serve static files from the 'public' directory

// Define the routes for the application
app.use("/", routes); // All requests starting with '/' will be handled by the routes module

// Export the Express application instance for use in other parts of the app
export { app };
