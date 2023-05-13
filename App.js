const express = require('express')
const App = express();
const port = 8011;
const expressLayouts = require("express-ejs-layouts");


App.set('view engine', 'ejs');
App.use(express.static("./Assets"));
App.use(expressLayouts);

App.use('/',require('./Routes'))
App.listen(port, ()=>{
    console.log("Server is up and running on port:",port)
})







