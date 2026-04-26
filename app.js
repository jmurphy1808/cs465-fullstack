var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var hbs = require("hbs");
require("dotenv").config();

// Load database FIRST
require("./app_api/models/db");

// Then load Passport
var passport = require("passport");
require("./app_api/config/passport");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var travelRouter = require("./app_server/routes/index");
var apiRouter = require("./app_api/routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "app_server", "views", "partials"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS block
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Static files + Passport initializer
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

// Routes
app.use("/", indexRouter);
app.use("/", travelRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Catch unauthorized error and create 401
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: err.name + ": " + err.message });
  } else {
    next(err);
  }
});

// regular error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);

  // If request is for API, return JSON error
  if (req.originalUrl.startsWith("/api")) {
    res.json({ message: err.message });
  } else {
    res.render("error");
  }
});

module.exports = app;
