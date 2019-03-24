const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    cwID: String,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateStart: { type: Date, required: true },
    dateCreated: { type: Date, required: true },
    seat: String,
    comments: String,
    buddy: String,
    neID: String,
    newHireReHire: String,
    newHireReHireDate: Date,
    macTicket: String,
    macTicketDate: Date,
    buddyMail: Date,
    welcomeMail: Date,
    dlPdOrg: Date,
    laptopDelivered: Date,
    _team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teams',
        required: true,
    },
    _platform: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'platforms',
        required: true,
    },

    _campus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'campuses',
    },
    _computer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'computers',
        required: true,
    },
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
    _region: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'regions',
        required: true,
    },
    _leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'leaders',
    },
});

mongoose.model('employees', employeeSchema);
