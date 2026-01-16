const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PostSchema = new schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    text: {
        type: String,
        required: true
    },  
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    likes: [    
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        } ],
    comments: [
        { 
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        } 
    ],} ,
    { timestamps: true }
);

module.exports = mongoose.model('post', PostSchema);