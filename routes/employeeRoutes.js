const mongoose = require('mongoose');
const Admin = mongoose.model('admins');
const Employee = mongoose.model('employees');

module.exports = app => {
    app.get('/api/admins', async (req, res) => {
        const admins = await Admin.find();
        res.send(admins);
    });

    app.get('/api/employees', async (req, res) => {
        const employees = await Employee.aggregate([
            {
                $lookup: {
                    localField: '_admin',
                    from: 'admins',
                    foreignField: '_id',
                    as: 'admin',
                },
            },
            { $sort: { 'admin.name': -1 } },
        ]).sort({
            dateStart: 'ascending',
            lastName: 'ascending',
            manager: 'ascending',
        });

        res.send(employees);
    });

    app.get('/api/:id', async (req, res) => {
        try {
            const employee = await Employee.findById(req.params.id);
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
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            function(err, response) {
                if (err) {
                    console.log(err);
                }
            }
        );
        const employees = await Employee.aggregate([
            {
                $lookup: {
                    localField: '_admin',
                    from: 'admins',
                    foreignField: '_id',
                    as: 'admin',
                },
            },
            { $sort: { 'admin.name': -1 } },
        ]).sort({
            dateStart: 'ascending',
            lastName: 'ascending',
            manager: 'ascending',
        });

        res.send(employees);
    });

    app.post('/api/employees', async (req, res) => {
        const {
            firstName,
            lastName,
            dateStart,
            _admin,
            manager,
            buddy,
        } = req.body;

        const employee = new Employee({
            firstName,
            lastName,
            dateStart,
            _admin,
            manager,
            buddy,

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
