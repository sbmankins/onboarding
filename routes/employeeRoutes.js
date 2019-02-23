const mongoose = require('mongoose');
const Admin = mongoose.model('admins');
const Employee = mongoose.model('employees');
const Manager = mongoose.model('managers');
const Status = mongoose.model('statuses');
const Team = mongoose.model('teams');
const Role = mongoose.model('roles');

module.exports = app => {
    app.get('/api/roles', async (req, res) => {
        const roles = await Roles.find();
        console.log(roles);
        res.send(roles);
    });

    app.get('/api/admins', async (req, res) => {
        const admins = await Admin.find();
        res.send(admins);
    });

    app.get('/api/teams', async (req, res) => {
        const teams = await Team.find();
        res.send(teams);
    });

    app.get('/api/managers', async (req, res) => {
        const managers = await Manager.find();
        res.send(managers);
    });

    app.get('/api/statuses', async (req, res) => {
        const statuses = await Status.find();
        res.send(statuses);
    });

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

        res.json(json);
    });

    app.get('/api/employees', async (req, res) => {
        const employees = await Employee.find()
            .populate('_admin')
            .populate('_manager')
            .populate('_status')
            .populate('_role')
            .sort({
                dateStart: 'ascending',
                _status: 'ascending',
                lastName: 'ascending',
                _manager: 'ascending',
                _admin: 'ascending',
            });

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
                .exec();
            res.send(employee);
            console.log(employee);
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
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
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
            .sort({
                dateStart: 'ascending',
                lastName: 'ascending',
            })
            .exec();

        res.send(employees);
    });

    app.post('/api/employees', async (req, res) => {
        const {
            firstName,
            lastName,
            dateStart,
            _admin,
            _manager,
            _status,
            _team,
            _role,
            buddy,
            seat,
        } = req.body;

        const employee = new Employee({
            firstName,
            lastName,
            dateStart,
            _admin,
            _manager,
            _status,
            _team,
            _role,
            buddy,
            seat,

            dateCreated: Date.now(),
        });

        try {
            await employee.save();

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
        try {
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
