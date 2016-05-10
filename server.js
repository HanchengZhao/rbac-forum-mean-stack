var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/forum');

//topics

var genericSchema = new mongoose.Schema({}, { strict: false });

var createDoc = function(document, collection, callback){
  var Model = mongoose.model('Model', genericSchema, collection);
  Model.create(document, function(err, document){
    if(!err){
      callback(document);
    }
  });
};

var findDocs = function(collection, filter, callback){
  var Model = mongoose.model('Model', genericSchema, collection);
  Model.find(filter).exec(function(err, documents){
    if (!err){
      callback(documents);
    }
  });
};

var updateDoc = function(collection, id, changes, callback){
  var Model = mongoose.model('Model', genericSchema, collection);
  Model.update({_id: id}, {$set: changes}, function(err, document){
    if (!err){
      callback(document);
    }
  });
};

var deleteDoc = function(collection, id, callback){
  var Model = mongoose.model('Model', genericSchema, collection);
  Model.findByIdAndRemove(id, function(err, document){
    if (!err){
      callback(document);
    }
  });
};

// Posts
// var postSchema = new mongoose.Schema({
//   topic_id: String,
//   author: String,
//   body:   String,
//   date: { type: Date, default: Date.now },
//   strict: false ,
// });

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var router = express();
var server = http.createServer(router);
router.use(bodyParser.json());

router.use(express.static(path.resolve(__dirname, 'public')));



//passport-login


require('./config/passport')(passport); // pass passport for configuration

// set up our express application
router.use(morgan('dev')); // log every request to the console
router.use(cookieParser()); // read cookies (needed for auth)
router.use(bodyParser()); // get information from html forms

router.set("views", path.join(__dirname, "views"));
router.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
router.use(session({ secret: 'rbachanchengzhao' })); // session secret
router.use(passport.initialize());
router.use(passport.session()); // persistent login sessions
router.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(router, passport); // load our routes and pass in our app and fully configured passport

router.get('/:collection', function(req, res){
  var collection = req.params.collection;
  findDocs(collection, {}, function(docs){
    res.json(docs);
  });
})
.get('/:collection/:id', function(req, res){
  var collection = req.params.collection;
  var id = req.params.id;
  findDocs(collection, {_id: id}, function(docs){
    res.json(docs);
  });
})
.post('/:collection', function(req, res){
  var collection = req.params.collection;
  createDoc(req.body, collection, function(document){
    res.json(document);
  });
})
.put('/:collection/:id', function(req, res){
  var collection = req.params.collection;
  var id = req.params.id;
  updateDoc(collection, id, req.body, function(document){
    res.json(document);
  });
})
.delete('/:collection/:id', function(req, res){
  var collection = req.params.collection;
  var id = req.params.id;
  deleteDoc(collection, id, function(document){
    res.json(document);
  });
});



var postSchema = new mongoose.Schema({
    
    topic_id: String,
    title: String ,
    content: String,
    author: String,
    date: { type: Date, default: Date.now },
    
});
var Posts = mongoose.model('Posts', postSchema);

router.get('/posts/show/:topic_id', function(req, res){
  var id = req.params.topic_id;
  Posts.find({topic_id : id }).exec(function(err, documents) {
    if(!err){
            res.json(documents);
    }else {
          res.end('Error in get' + err);
    }
  });
})
router.get('/posts/show/:topic_id/:post_id', function(req, res){
  var topic_id = req.params.topic_id;
  var post_id = req.params.post_id;
  Posts.find({_id : post_id}).exec(function(err, documents) {
    if(!err){
            res.json(documents);
    }else {
          res.end('Error in get post' + err);
    }
  });
})

router.post('/posts/show/:topic_id', function(req, res){
	var id = req.params.topic_id;
	var post;
	
	post = new Posts({
		topic_id: id,
		title:req.body.title,
		content:req.body.content,
		author:req.body.author,
		date: { type: Date, default: Date.now }
	});
	
	post.save(function (err) {
		if (!err) {
			console.log("created1");
			res.json(post);
		} else {
			console.log(err);
		}
	});
});

router.delete('/posts/show/:topic_id/:post_id', function(req, res){
  var topic_id = req.params.topic_id;
  var post_id = req.params.post_id;
  Posts.findByIdAndRemove(post_id, function(err, document){
    if (!err){
      console.log(document);
      res.json(document);
    }else{
      console.log(err);
    }
  });
});


var commentSchema = new mongoose.Schema({
  
    post_id: String,
    content: String,
    author: String,
    date: { type: Date, default: Date.now },
    
});

var Comments = mongoose.model('comments', commentSchema);

router.get('/comments/show/:topic_id/:post_id', function(req, res){
  var post_id = req.params.post_id;
  Comments.find({post_id : post_id}).exec(function(err, documents) {
    if(!err){
            res.json(documents);
    }else {
          res.end('Error in get comments' + err);
    }
  });
})

router.get('/comments/show/:topic_id/:post_id/:comment_id', function(req, res){
  var post_id = req.params.post_id;
  var comment_id = req.params.comment_id;
  Comments.find({_id : comment_id}).exec(function(err, documents) {
    if(!err){
            res.json(documents);
    }else {
          res.end('Error in get comments' + err);
    }
  });
})

router.post('/comments/show/:topic_id/:post_id', function(req, res){
	var id = req.params.post_id;
	var comment;
	
	comment = new Comments({
		post_id: id,
		content:req.body.content,
		author:req.body.author,
		date: { type: Date, default: Date.now }
	});
	
	comment.save(function (err) {
		if (!err) {
			console.log("comment created");
			console.log(comment.content);
			res.json(comment);
		} else {
			return console.log(err);
		}
	});
});

router.delete('/comments/show/:topic_id/:post_id/:comment_id', function(req, res){
  var post_id = req.params.post_id;
  var comment_id= req.params.comment_id;
  Comments.findByIdAndRemove(comment_id, function(err, document){
    if (!err){
      console.log(document);
      res.json(document);
    }else{
      console.log(err);
    }
    
  });
});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Rbac forum backend listening at", addr.address + ":" + addr.port);
});