module.exports = {
    //const Employee = mongoose.model('employees');

    // Used to determine what daily messages to post to slack based on employee start date - used for scheduled messages
    job: async function() {
        const keys = require('../config/keys');
        const mongoose = require('mongoose');
        const daysBetween = require('./daysBetween');
        const { WebClient } = require('@slack/client');
        const Employee = mongoose.model('employees');
        const token = keys.slackAPI;
        const conversationID = keys.conversationID;
        const web = new WebClient(token);

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
            let days = daysBetween.days(start);
            let message;
            //Determines message to display
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
                //posts messsage to slack
                web.chat.postMessage({
                    channel: conversationID,
                    username: 'Onboarding Bot',
                    text: message,
                });
            }
        });
    },
};
