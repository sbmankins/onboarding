const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    name: { type: String },
});

mongoose.model('roles', roleSchema);
