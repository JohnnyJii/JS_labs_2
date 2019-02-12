if(process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

let express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    http = require('http').Server(app),
    mongoose = require('mongoose'),
    btoa = require('btoa'),
    atob = require('atob'),
    promise,
    connectionString = process.env.connectionString,
    port = process.env.PORT || 8080;

// ExpressJS server start
http.listen(port, function() {
  console.log('Server Started. Listening on *:' + port);
});

// ExpressJS middleware for serving static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

// Base route for front-end
app.get('/', function(req, res) {
  res.sendFile('views/index.html', {
    root: __dirname
  });
});

// Counter Collection Schema
let countersSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  count: { type: Number, default: 0 }
});

let Counter = mongoose.model('Counter', countersSchema);

// URL Collection Schema
let urlSchema = new mongoose.Schema({
  _id: {type: Number},
  url: '',
  created_at: ''
});

// URL Schema pre-save step

urlSchema.pre('save', function(next) {
  console.log('APP: Running pre-save');
  var that = this;
  Counter.findByIdAndUpdate({ _id: 'url_count' }, { $inc: { count: 1 } }, function(err, counter) {
    if(err) {
      console.error('APP: Error while finding and updating counter value');
      return next(err)
    };
    that._id = counter.count;
    that.created_at = new Date();
    next();
  });
});

let URL = mongoose.model('URL', urlSchema);

// Connect to the MongoDB instance
promise = mongoose.connect(connectionString, {
  useMongoClient: true
});

// Reset the app to default values when starting the server

promise.then(function(db) {
  console.log('APP: Connected to MongoDB');
  URL.remove({}, function() {
    console.log('APP: URL collection emptied');
  })
  Counter.remove({}, function() {
    console.log('APP: Counter collection emptied');
    console.log('APP: Initializing Counter collection with a default value');
    let counter = new Counter({_id: 'url_count', count: 10000});
    counter.save(function(err) {
      if(err) {
        console.error('APP: Error while initializing counter');
        return console.error(err);
      }
      console.log('APP: Counter has been initialized');
    });
  });
});

// API for redirection
app.get('/:hash', function(req, res) {
  let baseid = req.params.hash;
  if(baseid) {
    console.log('APP: Hash received: ' + baseid);
    let id = atob(baseid);
    console.log('APP: Decoding Hash: ' + baseid);
    URL.findOne({ _id: id }, function(err, doc) {
      if(doc) {
        console.log('APP: Found ID in DB, redirecting to URL');
        res.redirect(doc.url);
      } else {
        console.log('APP: Could not find ID in DB, redirecting to home');
        res.redirect('/');
      }
    });
  }
});
