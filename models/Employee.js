const mongoose = require('mongoose');
const {Schema} = mongoose;

const employeeSchema = new Schema ({
  cwID: String,
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  gender: String,
  hireType: String,
  role: {type: String, required: true},
  startDate: {type: Date, required: true},
  dateCreated: Date,
  teamName: {type: String, required: true},
  platform: {type: String, required: true},
  hireStatus: String,
  buddy: String,
  computer: String,
  seat: String,
  campus: String,
  supervisorStatus: String,
  status: String,
  _manager: {type: Schema.Types.ObjectId, ref: 'Manager'},
  _admin: {type: Schema.Types.ObjectId, ref: 'Admin'},
  _vendor: {type: Schema.Types.ObjectId, ref: 'Vendor'}

});

mongoose.model('employees', employeeSchema);
