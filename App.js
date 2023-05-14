const express = require('express')
const App = express();
const port = 8011;
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require('body-parser')
const db = require('./Config/mongoose')
const passport = require("passport");
const session = require("express-session");
const passportLocal = require("./Config/passport-local-strategy");
const mongoStore = require("connect-mongo");



App.set('view engine', 'ejs');
App.use(express.static("./Assets"));
App.use(expressLayouts);
App.use(bodyParser.urlencoded({ extended: false }))
App.use(require('cookie-parser')());
App.use(
    session({
         name: "ERS",
         secret: "secret",
         resave: false,
         saveUninitialized: true,
         cookie: {
              maxAge: 1000 * 60 * 100 * 10,
         },
         store: mongoStore.create({
              mongoUrl: "mongodb://127.0.0.1:27017/ERS_DEV",
              autoRemove: "disabled", // Default
         }),
    })
);
// This is the basic express session({..}) initialization.
App.use(passport.initialize());
// init passport on every route call.
App.use(passport.session());
App.use(passport.setAuthenticatedUser);




App.use('/',require('./Routes'))
App.listen(port, ()=>{
    console.log("Server is up and running on port:",port)
})







