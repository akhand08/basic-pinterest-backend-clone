

const mongoose = require("mongoose")
// const plm = require("passport-local-mongoose");


// mongoose.connect("mongodb://127.0.0.1:27017/pinterest");


const postSchema = new mongoose.Schema({
    postText: {
        type: String,
        require: true
    },
    images: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    likes: {
        type: Array,
        default: []
    }

})

module.exports = mongoose.model("posts", postSchema);
