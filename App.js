const express = require('express')
const App = express();
const port = 8011;

App.set('view engine', 'ejs');

App.use('/',require('./Routes'))
App.listen(port, ()=>{
    console.log("Server is up and running on port:",port)
})







