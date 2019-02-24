const mongoose = require('mongoose');
const { Schema } = mongoose;

const campusSchema = new Schema({
    name: { type: String, required: true },
});

mongoose.model('campuses', campusSchema);
