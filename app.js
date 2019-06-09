const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
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
  res.render('campgrounds', { campgrounds: campgrounds });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, process.env.IP, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
