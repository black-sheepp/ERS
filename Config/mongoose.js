const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://shivamERS:bMEGDTOPGg0TiZ9A@cluster0.kjanyoy.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected!'));