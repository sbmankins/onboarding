const mongoose = require('mongoose');
const {Schema} = mongoose;

const adminSchema = new Schema ({
  name: String
});

mongoose.model('admins', adminSchema);
