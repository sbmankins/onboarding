const mongoose = require('mongoose');
const {Schema} = mongoose;

const employeeSchema = new Schema ({
  firstName: String,
  lastName: String,
  startDate: Date,
  dateCreated: Date,
  _manager: {type: Schema.Types.ObjectId, ref: 'Manager'},
  _admin: {type: Schema.Types.ObjectId, ref: 'Admin'};,
  status: String
});

mongoose.model('employees', employeeSchema);
