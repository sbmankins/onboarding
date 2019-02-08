const mongoose = require('mongoose');
const {Schema} = mongoose;

const vendorSchema = new Schema ({
  name: {type: String, required: true},
});

mongoose.model('vendors', vendorSchema);
