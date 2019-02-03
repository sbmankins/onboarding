const mongoose = require('mongoose');
const Employee = mongoose.models('employees');

module.exports = app => {

  app.post('/api/employees', async (req,res) => {
    const {firstName, lastName, startDate, _admin, _manager, status} = req.body;

    const Employee = new Employee({
      firstName,
      lastName,
      startDate,
      _admin,
      _manager,
      status,
      dateCreated: Date.now()
    });

    try{
      let newEmployee = await Employee.save();
      res.status(201).send({response:'Employee created'});
      } catch (err){
        if (err.name === 'MongoError' && err.code === 11000) {
          res.status(409).send(new MyError('Duplicate key', [err.message]));
        }
      res.status(500).send(err);
      }
    });
  });
};
