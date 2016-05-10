var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    
    topic_id: String,
    title: String ,
    content: String,
    author: String,
    date: { type: Date, default: Date.now },
    
});
    
module.exports = mongoose.model('post', postSchema);