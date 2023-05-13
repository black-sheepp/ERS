const express = require('express')
const App = express();
const port = 8011;
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require('body-parser')
const db = require('./Config/mongoose')



App.set('view engine', 'ejs');
App.use(express.static("./Assets"));
App.use(expressLayouts);
App.use(bodyParser.urlencoded({ extended: false }))


App.use('/',require('./Routes'))
App.listen(port, ()=>{
    console.log("Server is up and running on port:",port)
})







