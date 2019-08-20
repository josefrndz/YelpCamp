const Campground = require('../models/campground'),
  Comment = require('../models/comment');

const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err) {
        req.flash('error', 'Campground Not Found');
        res.redirect('back');
      } else {
        if (!foundCampground) {
          req.flash('error', 'Item not found.');
          return res.redirect('back');
        }

        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'Sorry, You Do Not Have Permission For That Action');
    res.redirect('back');
  }
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        req.flash('error', 'Campground Not Found');
        res.redirect('back');
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash(
            'error',
            'Sorry, You Do Not Have Permission For That Action'
          );
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'Please Log In');
    res.redirect('back');
  }
};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please Log In');
  res.redirect('/login');
};

module.exports = middlewareObj;
