var mongoose = require('mongoose');

//connect mongoose to the mongod server we have running
mongoose.connect('mongodb://localhost:27017/cat_app', {
  useNewUrlParser: true
});

// - This is just a pattern that says every class has a name, age, and temperament
var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

// - makes collection called "Cat"
var Cat = mongoose.model('Cat', catSchema);

//add a cat to the DB
var Jack = new Cat({
  name: 'Jack',
  age: 4,
  temperament: 'calm'
});

Jack.save(function(err, cat) {
  if (err) {
    console.log('There was an error!');
  } else {
    console.log('Cat added to DB');
    console.log(cat);
  }
});

//retrieve all cats from DB and console.log them

Cat.find({}, function(err, cat) {
  if (err) {
    console.log('Error!');
  }
});
