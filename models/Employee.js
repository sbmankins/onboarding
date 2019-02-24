const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    cwID: String,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    //gender: String,
    dateStart: { type: Date, required: true },
    dateCreated: Date,
    _team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teams',
        required: true,
    },
    //platform: {type: String, required: true},
    //hireStatus: String,
    buddy: String,
    //computer: String,
    seat: String,
    //campus: String,
    _hirestatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hirestatuses',
        required: true,
    },
    _status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'statuses',
        required: true,
    },
    _manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'managers',
        required: true,
    },
    _admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admins',
        required: true,
    },
    _role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles',
        required: true,
    },
    _vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'vendors' },
    _type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'types',
        required: true,
    },
});

mongoose.model('employees', employeeSchema);
