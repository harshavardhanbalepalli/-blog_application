const {Schema, model} = require('mongoose');
const User = require('./user');

const blogShema = new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String, 
        required:true,
    },
    coverImageUrl:{
        type:String,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
    ref: "User" 
    }

},{timestamps:true});

const Blog = model("blog", blogShema);

module.exports = Blog;