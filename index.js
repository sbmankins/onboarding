const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const schedule = require('node-schedule');
const slackJob = require('./jobs/slackJob');

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
require('./models/Archive');

//Connect statement for local mongodb
// mongoose.connect(
//     'mongodb://localhost:27017/onboardingDB',
//     { useNewUrlParser: true },
//     () => console.log('Mongodb connected on port 27017')
// );
//Connect statement for MLab mongodb

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

const job = slackJob.job;
//Creates rerurrence rule for node-schedule
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(1, 5)];
rule.hour = 6;
rule.minute = 6;

//Runs slackJob at the time specified in the rule
schedule.scheduleJob(rule, job);

if (process.env.NODE_ENV === 'production') {
    //Express will serve main.js, main.css, etc
    app.use(express.static('client/build'));
    //Express will serve index.html if route unrecognized(hand off to react router)
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
