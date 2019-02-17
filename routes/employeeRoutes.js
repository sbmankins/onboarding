const mongoose = require('mongoose');
const Admin = mongoose.model('admins');
const Employee = mongoose.model('employees');

module.exports = app => {
    app.get('/api/admins', async (req, res) => {
        const admins = await Admin.find();
        res.send(admins);
    });

    app.get('/api/employees', async (req, res) => {
        console.log('IN THE WRONG PLACE');
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
            console.log(req.params.id);
            const employee = await Employee.findById(req.params.id);
            console.log(employee);
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

    app.post('/api/:id', async (req, res) => {
        console.log('I made it to edit' + req.body);

        try {
            await Employee.findOneAndUpdate(
                { _id: req.params._id },
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    dateStart: req.body.dateStart,
                    _admin: req.body._admin,
                    manager: req.body.manager,
                    buddy: req.body.buddy,
                }
            );
            console.log(employees);
            res.status(200).send({ response: 'Employee updated' });
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
