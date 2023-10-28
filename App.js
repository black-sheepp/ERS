const express = require("express");
const path = require('path')
const App = express();
const port = 8011;
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const db = require("./Config/mongoose");
const passport = require("passport");
const session = require("express-session");
const passportLocal = require("./Config/passport-local-strategy");
const mongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMWare = require("./Config/middleware");
const passportGoogle = require("./Config/passport-google-oauth2-strategy");

App.set("view engine", "ejs");
App.set('views', path.join(__dirname) + '/Views');
App.use(express.static("./Assets"));
App.use("/Uploads", express.static(__dirname + "/Uploads"));
App.use(expressLayouts);
App.use(bodyParser.urlencoded({ extended: false }));
App.use(require("cookie-parser")());
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
			mongoUrl: "mongodb+srv://shivamERS:bMEGDTOPGg0TiZ9A@cluster0.kjanyoy.mongodb.net/?retryWrites=true&w=majority",
			autoRemove: "disabled", // Default
		}),
	})
);
// This is the basic express session({..}) initialization.
App.use(passport.initialize());
// init passport on every route call.
App.use(passport.session());
App.use(passport.setAuthenticatedUser);
App.use(flash());
App.use(customMWare.setFlash);

App.use("/", require("./Routes"));
App.listen(port, () => {
	console.log("Server is up and running on port:", port);
});
