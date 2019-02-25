const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema({
    _employee: { type: mongoose.Schema.Types.ObjectId, ref: 'employees' },
    neID: String,
    // ticketType: {type: String, required: true},
    // laptopDelivered: {type: Boolean, required: true, default: false},
    // laptopDate: Date,
    // buddyMail: {type: Boolean, required: true, default: false},
    // buddyDate: Date,
    // welcomeMail: {type: Boolean, default: false},
});

mongoose.model('tickets', ticketSchema);
