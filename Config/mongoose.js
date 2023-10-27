const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://fullstackmerndevelop:<password>@cluster0.3wruxeu.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected!'));