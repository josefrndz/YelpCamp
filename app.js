const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to YelpCamp!');
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log('Server has started!');
});
