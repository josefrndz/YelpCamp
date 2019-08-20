const express = require('express'),
  router = express.Router({ mergeParams: true }),
  Campground = require('../models/campground'),
  Comment = require('../models/comment'),
  middleware = require('../middleware');

// --------------------
// Comments Routes
// --------------------

//Comments New
router.get('/new', middleware.isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground: campground });
    }
  });
});

//Comments Create
router.post('/', middleware.isLoggedIn, (req, res) => {
  //lookup campground using id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          req.flash('error', 'Comment Was Unable to Be Created');
        } else {
          // add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash('success', 'Comment Posted Successfully!');
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});

//Comment edit
router.get(
  '/:comment_id/edit',
  middleware.checkCommentOwnership,
  (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect('back');
      } else {
        res.render('comments/edit', {
          campground_id: req.params.id,
          comment: foundComment
        });
      }
    });
  }
);

//Commment update
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body.comment,
    (err, updatedComment) => {
      if (err) {
        res.redirect('back');
      } else {
        res.redirect('/campgrounds/' + req.params.id);
      }
    }
  );
});

//Comment destroy
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, err => {
    if (err) {
      req.flash('error', 'Comment Not Found');
      res.redirect('back');
    } else {
      req.flash('success', 'Comment Successfully Deleted!');
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

module.exports = router;
