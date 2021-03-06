const mongoose = require('mongoose');
const keys = require('../config/keys');
const Admin = mongoose.model('admins');
const Employee = mongoose.model('employees');
const Manager = mongoose.model('managers');
const Status = mongoose.model('statuses');
const Team = mongoose.model('teams');
const Role = mongoose.model('roles');
const Vendor = mongoose.model('vendors');
const Type = mongoose.model('types');
const Hirestatus = mongoose.model('hirestatuses');
const Region = mongoose.model('regions');
const Campus = mongoose.model('campuses');
const Leader = mongoose.model('leaders');
const Platform = mongoose.model('platforms');
const Computer = mongoose.model('computers');
const Archive = mongoose.model('archives');
const { WebClient } = require('@slack/client');

const token = keys.slackAPI;
const conversationID = keys.conversationID;
const web = new WebClient(token);

module.exports = app => {
    app.get('/api/form1selects', async (req, res) => {
        var json = {};
        const admins = await Admin.find().sort({ name: 1 });
        json.admins = admins;

        const managers = await Manager.find().sort({ name: 1 });
        json.managers = managers;

        const statuses = await Status.find().sort({ name: 1 });
        json.statuses = statuses;

        const teams = await Team.find().sort({ name: 1 });
        json.teams = teams;

        const roles = await Role.find().sort({ name: 1 });
        json.roles = roles;

        const vendors = await Vendor.find().sort({ name: 1 });
        json.vendors = vendors;

        const types = await Type.find().sort({ name: 1 });
        json.types = types;

        const hirestatuses = await Hirestatus.find().sort({ name: 1 });
        json.hirestatuses = hirestatuses;

        const regions = await Region.find().sort({ name: 1 });
        json.regions = regions;

        const campuses = await Campus.find();
        json.campuses = campuses;

        const leaders = await Leader.find().sort({ name: 1 });
        json.leaders = leaders;

        const platforms = await Platform.find().sort({ name: 1 });
        json.platforms = platforms;

        const computers = await Computer.find().sort({ name: 1 });
        json.computers = computers;

        res.json(json);
    });

    app.get('/api/employees', async (req, res) => {
        const employees = await Employee.find()
            .populate('_admin')
            .populate('_manager')
            .populate('_status')
            .populate('_role')
            .populate('_vendor')
            .populate('_type')
            .populate('_region')
            .populate('_team')
            .populate('_hirestatus')
            .populate('_campus')
            .populate('_leader')
            .populate('_platform')
            .populate('_computer')
            .sort({
                dateStart: 'ascending',
                _status: 'ascending',
                lastName: 'ascending',
                _manager: 'ascending',
                _admin: 'ascending',
            })
            .exec();

        res.send(employees);
    });

    app.get('/api/:id', async (req, res) => {
        try {
            const employee = await Employee.findById(req.params.id)
                .populate('_admin')
                .populate('_manager')
                .populate('_status')
                .populate('_team')
                .populate('_role')
                .populate('_vendor')
                .populate('_type')
                .populate('_hirestatus')
                .populate('_region')
                .populate('_campus')
                .populate('_leader')
                .populate('_platform')
                .populate('_computer')
                .exec();
            res.send(employee);
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).send(
                    new MyError('Duplicate key', [err.message])
                );
                console.log(err.name);
            }
            res.status(500).send(err);
            console.log(err.name);
        }
    });

    app.put('/api/:id', async (req, res) => {
        try {
            const manager = await Manager.findById(req.body._manager);
            const admin = await Admin.findById(req.body._admin);
            const start = new Date(req.body.dateStart).toLocaleDateString(
                'en-US',
                {
                    timeZone: 'UTC',
                }
            );
            const employee = await Employee.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                await web.chat.postMessage({
                    channel: conversationID,
                    username: 'Onboarding Bot',
                    text: `${req.body.firstName} ${
                        req.body.lastName
                    } was edited in the Onboarding App
                Start Date: ${start}
                Manager: ${manager.name}
                Admin: ${admin.name}`,
                }),

                console.log('Message posted!'),
                function(err, response) {
                    if (err) {
                        console.log(err);
                    }
                }
            );

            const employees = await Employee.find()
                .populate('_admin')
                .populate('_manager')
                .populate('_status')
                .populate('_team')
                .populate('_role')
                .populate('_vendor')
                .populate('_type')
                .populate('_hirestatus')
                .populate('_region')
                .populate('_campus')
                .populate('_leader')
                .populate('_platform')
                .populate('_computer')
                .sort({
                    dateStart: 'ascending',
                    lastName: 'ascending',
                })
                .exec();

            res.send(employees);
        } catch (error) {
            console.log(error);
        }
    });

    app.post('/api/employees', async (req, res) => {
        const {
            firstName,
            lastName,
            dateStart,
            buddy,
            seat,
            cwID,
            comments,
            _admin,
            _manager,
            _status,
            _team,
            _role,
            _vendor,
            _type,
            _hirestatus,
            _region,
            _campus,
            _leader,
            _platform,
            _computer,
            neID,
            newHireReHire,
            newHireReHireDate,
            macTicket,
            macTicketDate,
            laptopDelivered,
            buddyMail,
            welcomeMail,
            dlPdOrg,
        } = req.body;

        const employee = new Employee({
            firstName,
            lastName,
            dateStart,
            buddy,
            seat,
            cwID,
            comments,
            _admin,
            _manager,
            _status,
            _team,
            _role,
            _vendor,
            _type,
            _hirestatus,
            _region,
            _campus,
            _leader,
            _platform,
            _computer,
            neID,
            newHireReHire,
            newHireReHireDate,
            macTicket,
            macTicketDate,
            laptopDelivered,
            buddyMail,
            welcomeMail,
            dlPdOrg,
            dateCreated: Date.now(),
        });

        const manager = await Manager.findById(employee._manager);
        const admin = await Admin.findById(employee._admin);
        const start = new Date(dateStart).toLocaleDateString('en-US', {
            timeZone: 'UTC',
        });

        try {
            await employee.save();
            await web.chat.postMessage({
                channel: conversationID,
                username: 'Onboarding Bot',
                text: `${firstName} ${lastName} was added to the Onboarding App
                Start Date: ${start}
                Manager: ${manager.name}
                Admin: ${admin.name}`,
            });

            console.log('Message posted!');

            res.status(201).send({ response: 'Employee created' });
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).send(
                    new MyError('Duplicate key', [err.message])
                );
                console.log(err.name);
            }
            res.status(500).send(err);
            console.log(err.name);
        }
    });

    app.delete('/api/:id', async (req, res) => {
        const archive = await Employee.findById(req.params.id).exec();
        const {
            firstName,
            lastName,
            dateStart,
            buddy,
            seat,
            cwID,
            comments,
            _admin,
            _manager,
            _status,
            _team,
            _role,
            _vendor,
            _type,
            _hirestatus,
            _region,
            _campus,
            _leader,
            _platform,
            _computer,
            neID,
            newHireReHire,
            newHireReHireDate,
            macTicket,
            macTicketDate,
            laptopDelivered,
            buddyMail,
            welcomeMail,
            dlPdOrg,
            dateCreated,
        } = archive;

        const archiveEmployee = new Archive({
            firstName,
            lastName,
            dateStart,
            buddy,
            seat,
            cwID,
            comments,
            _admin,
            _manager,
            _status,
            _team,
            _role,
            _vendor,
            _type,
            _hirestatus,
            _region,
            _campus,
            _leader,
            _platform,
            _computer,
            neID,
            newHireReHire,
            newHireReHireDate,
            macTicket,
            macTicketDate,
            laptopDelivered,
            buddyMail,
            welcomeMail,
            dlPdOrg,
            dateCreated,
        });

        try {
            await archiveEmployee.save();
            await Employee.deleteOne({ _id: req.params.id });
            res.status(200).send({ response: 'Employee Deleted' });
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).send(
                    new MyError('Duplicate key', [err.message])
                );
                console.log(err.name);
            }
            res.status(500).send(err);
            console.log(err.name);
        }
    });
};
