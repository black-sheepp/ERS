const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
    rating: {
        type: Number,
    },
    review: {
        type: String,
    },
    senderAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviewer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviewToUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviewDone: {
        type: Boolean,
    }
},{
    timestamps: true,
})


const Review = mongoose.model("Review", rateSchema);
module.exports = Review;
