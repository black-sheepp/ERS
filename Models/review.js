const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
    rating: {
        type: String,
    },
    review: {
        type: String,
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reciever:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviewToUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true,
})


const Review = mongoose.model("Review", rateSchema);
module.exports = Review;
