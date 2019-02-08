const mongoose = require('mongoose');
const {Schema} = mongoose;

const adminSchema = new Schema ({
  name: {type: String, required: true}
});

mongoose.model('admins', adminSchema);
