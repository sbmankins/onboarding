const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const daysBetween = require('./daysBetween');
const { WebClient } = require('@slack/client');
const schedule = require('node-schedule');

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

// USED FOR AUTOMATIC SLACK NOTIFICATIONS//
//Used by slack web client
const token = keys.slackAPI;
const conversationID = keys.conversationID;
const web = new WebClient(token);

//Creates rerurrence reule for node-schedule
const rule = new schedule.RecurrenceRule();
rule.hour = 4;
rule.minute = 5;

const Employee = mongoose.model('employees');
// Used to determine what daily messages to post to slack based on employee start date - used for scheduled messages
const job = async function fetchEmployees() {
    const empl = await Employee.find()
        .populate('_admin')
        .populate('_manager')
        .populate('_status')
        .sort({
            dateStart: 'ascending',
        })
        .exec();

    const result = await empl.filter(
        employee => employee._status.name !== 'Complete'
    );
    await result.forEach(employee => {
        let start = new Date();
        start = employee.dateStart;
        let dayString;
        let days = daysBetween.daysBetween(start);
        let message;
        if (days <= 7) {
            if (days < 0) {
                message = `${employee.firstName} ${
                    employee.lastName
                } is past due and is not marked complete.
              Manager: ${employee._manager.name}
              Admin: ${employee._admin.name}`;
            } else if (days === 0) {
                message = `${employee.firstName} ${
                    employee.lastName
                } starts today and is not marked complete.
                Manager: ${employee._manager.name}
                Admin: ${employee._admin.name}`;
            } else if (days > 0 && days <= 7) {
                days === 1 ? (dayString = 'day') : (dayString = 'days');
                message = `${employee.firstName} ${
                    employee.lastName
                } starts in ${days} ${dayString} and is not marked complete.
                Manager: ${employee._manager.name}
                Admin: ${employee._admin.name}`;
            }
            web.chat.postMessage({
                channel: conversationID,
                username: 'Onboarding Bot',
                text: message,
            });
        }
    });
    console.log('daily task ran');
    return result;
};

//Runs fetchEmployees at the time specified in the rule
schedule.scheduleJob(rule, job);

//////////////////////////////////////////////////////////////////

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
