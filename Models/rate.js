const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
    rating_1: {
        type: String,
    },
    rating_2: {
        type: String,
    },
    rating_3: {
        type: String,
    },
    rating_4: {
        type: String,
    },
    rating_5: {
        type: String,
    },
    rating_6: {
        type: String,
    },
    rating_7: {
        type: String,
    },
    rating_8: {
        type: String,
    },
    rating_9: {
        type: String,
    },
    rating_10: {
        type: String,
    },
    rating_total: {
        type: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true,
})

const Rate = mongoose.model("Rate", rateSchema);
module.exports = Rate;
