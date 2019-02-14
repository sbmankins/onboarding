const mongoose = require('mongoose');
const Admin = mongoose.model('admins');
const Employee = mongoose.model('employees');

module.exports = app => {
    app.get('/api/admins', async (req, res) => {
        const admins = await Admin.find();
        console.log('I made it to the admin route');
        res.send(admins);
        console.log(admins);
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
        ]);

        console.log(employees);
        res.send(employees);
    });

    app.post('/api/employees', async (req, res) => {
        console.log(req.body);
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
            console.log('employee saved');
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
        console.log(req.params.id);

        try {
            await Employee.deleteOne({ _id: req.params.id });
            res.status(201).send({ response: 'Employee Deleted' });
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
