const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength:150
    },
    body: {
        type: String,
        required: true,
        minlength:4,
        maxlength:2000

    },
    photo: {
        data: Buffer,
        contentType: String
    },
    //relationship btwn post and user
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    likes: [{type: ObjectId, ref: "User"}],
    comments: [
        {
            text: String,
            created: {type: Date, default: Date.now},
            postedBy: {type: ObjectId, ref:"User"}
        }
    ]

});

module.exports = mongoose.model("Post",postSchema);