const mongoose = require('mongoose');
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
            .populate('_hirestatus')
            .populate('_region')
            .populate('_campus')
            .populate('_leader')
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
            .populate('_vendor')
            .populate('_type')
            .populate('_hirestatus')
            .populate('_region')
            .populate('_campus')
            .populate('_leader')
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
            _vendor,
            _type,
            _hirestatus,
            _region,
            _campus,
            _leader,
            buddy,
            seat,
            cwID,
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
            _vendor,
            _type,
            _hirestatus,
            _region,
            _campus,
            _leader,
            buddy,
            seat,
            cwID,

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
