var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Campground = require('./models/campground'),
  seedDB = require('./models/seeds');

mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

seedDB();

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  //Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { campgrounds: allCampgrounds });
    }
  });
  //res.render('campgrounds', { campgrounds: campgrounds });
});

app.post('/campgrounds', (req, res) => {
  //get data from form
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  //add to campgrounds array
  var newCampground = { name: name, image: image, description: desc };
  //Create a new campground and save to DB
  Campgound.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect('/campgrounds');
    }
  });
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

//SHOW - shows more info about one campground
app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id)
    .populate('comments')
    .exec((err, foundCampground) => {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        //render 'show' template with that campground
        res.render('show', { campground: foundCampground });
      }
    });
});

// --------------------
// Comments Routes
// --------------------

app.get('/campgrounds/:id/comments/new', (req, res) => {});

app.listen(process.env.PORT || 5000, process.env.IP, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
