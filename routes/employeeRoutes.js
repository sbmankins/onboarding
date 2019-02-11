const mongoose = require('mongoose')
const Employee = mongoose.model('employees')

module.exports = app => {
    app.get('/api/employees', async (req, res) => {
        const employees = await Employee.find()
            .select({
                firstName: true,
                lastName: true,
                dateStart: true,
                manager: true,
                admin: true,
            })
            .sort({
                dateStart: 'ascending',
                manager: 'ascending',
                admin: 'ascending',
                lastName: 'ascending',
            })
        res.send(employees)
    })

    app.post('/api/employees', async (req, res) => {
        console.log(req.body)
        const {
            firstName,
            lastName,
            dateStart,
            admin,
            manager,
            buddy,
            favoriteColor,
        } = req.body

        const employee = new Employee({
            firstName,
            lastName,
            dateStart,
            admin,
            manager,
            buddy,
            favoriteColor,
            dateCreated: Date.now(),
        })

        try {
            await employee.save()
            console.log('employee saved')
            res.status(201).send({ response: 'Employee created' })
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).send(
                    new MyError('Duplicate key', [err.message])
                )
                console.log(err.name)
            }
            res.status(500).send(err)
            console.log(err.name)
        }
    })

    app.delete('/api/:id', async (req, res) => {
        console.log(req.params.id)

        try {
            await Employee.deleteOne({ _id: req.params.id })
            res.status(201).send({ response: 'Employee Deleted' })
            console.log('I think it should have deleted')
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).send(
                    new MyError('Duplicate key', [err.message])
                )
                console.log(err.name)
            }
            res.status(500).send(err)
            console.log(err.name)
        }
    })
}
