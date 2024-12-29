// Importing required modules
import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import passportInit from "./passport/passport.js";

// This converts the file URL to a path and gets the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create an Express application instance
const app = express();

// Session configuration
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// Flash middleware
app.use(flash());

// Middleware to parse JSON requests with a maximum body size of 21kb
app.use(express.json({ limit: "21kb" }));

// Middleware to parse URL-encoded data with extended syntax, also limited to 21kb
app.use(express.urlencoded({ extended: true, limit: "21kb" }));

// Middleware to parse cookies
app.use(cookieParser());

// Setting up the template engine as EJS and Setting the views directory for template files
app.set("view engine", "ejs").set("views", path.join(__dirname, "views"));

// Serving static files from the "assets" directory
app.use(express.static(path.join(__dirname, "../public")));

// Defining routes for the application, with all routes starting from the root
app.use("/", routes);

// Exporting the app instance for use in other files
export { app };
