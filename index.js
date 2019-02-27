const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/Employee');
require('./models/Admin');
require('./models/Manager');
require('./models/Status');
require('./models/Team');
require('./models/Role');
require('./models/Vendor');
require('./models/Type');
require('./models/Hirestatus');
require('./models/Region');
require('./models/Campus');
require('./models/Leader');
require('./models/Platform');
require('./models/Computer');

// mongoose.connect(
//     'mongodb://localhost:27017/onboardingDB',
//     { useNewUrlParser: true },
//     () => console.log('Mongodb connected on port 27017')
// );

mongoose.connect(
    keys.mongoURI,
    {
        useNewUrlParser: true,
    }
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to oboarding app');
});

require('./routes/employeeRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
