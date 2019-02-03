const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./models/Employee');
require('./models/Manager');
require('./models/Admin');

const PORT = 5000;


mongoose.connect(
  'mongodb://localhost:27017/onboardingDB',
  { useNewUrlParser: true },
  () => console.log('Mongodb connected on port 27017')
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to oboarding app');
});

require('./routes/employeeRoutes')(app);

if(process.env.NODE_ENV === 'production'){
  //Express will serve main.js, main.css, etc
  app.use(express.static('client/build'));
  //Express will serve index.html if route unrecognized(hand off to react router)
  const path = require('path');
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
