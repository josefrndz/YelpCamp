const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true
});

//Schema Set Up
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campgound = mongoose.model('Campground', campgroundSchema);
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  //Get all campgrounds from DB
  Campgound.find({}, (err, allCampgrounds) => {
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
  Campgound.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      //render 'show' template with that campground
      res.render('show', { campground: foundCampground });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, process.env.IP, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
