const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var campgrounds = [
  {
    name: 'Inwood Creek',
    image: 'https://www.nycgovparks.org/photo_gallery/full_size/9730.jpg'
  },
  {
    name: 'Washington Top',
    image:
      'https://www.nycgovparks.org/pagefiles/107/inwood-hill-park-map-rock-formations__57d2ba470ac0e.jpg'
  },
  {
    name: 'Payson Hill',
    image: 'https://www.nycgovparks.org/photo_gallery/full_size/9711.jpg'
  }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', { campgrounds: campgrounds });
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/campgrounds', (req, res) => {
  //get data from form
  var name = req.body.name;
  var image = req.body.image;
  //add to campgrounds array
  var newCampground = { name: name, image: image };

  campgrounds.push(newCampground);
  //redirect back to campgrounds page
  res.redirect('/campgrounds');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, process.env.IP, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
