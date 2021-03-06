const express = require('express'),
  router = express.Router(),
  Campground = require('../models/campground'),
  middleware = require('../middleware/');

//INDEX
router.get('/', (req, res) => {
  //Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {
        campgrounds: allCampgrounds
      });
    }
  });
  //res.render('campgrounds', { campgrounds: campgrounds });
});

//CREATE
router.post('/', middleware.isLoggedIn, (req, res) => {
  //get data from form
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  //add to campgrounds array
  var newCampground = {
    name: name,
    price: price,
    image: image,
    description: desc,
    author: author
  };
  //Create a new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect('/campgrounds');
    }
  });
});

//NEW
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

//SHOW - shows more info about one campground
router.get('/:id', (req, res) => {
  Campground.findById(req.params.id)
    .populate('comments')
    .exec((err, foundCampground) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(foundCampground);
        //render 'show' template with that campground
        res.render('campgrounds/show', { campground: foundCampground });
      }
    });
});

//EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render('campgrounds/edit', { campground: foundCampground });
  });
});

//UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  //find and update correct campground
  Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    (err, updatedCampground) => {
      if (err) {
        res.redirect('/campgrounds');
      } else {
        res.redirect('/campgrounds/' + req.params.id);
      }
    }
  );
});

//DESTROY
router.delete('/:id/', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;
