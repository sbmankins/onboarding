const mongoose = require('mongoose');
const Admin = mongoose.model('admins');

module.exports = app => {
    app.get('/api/admins', async (req, res) => {
        const admins = await Admin.find();
        console.log('I made it to the admin route');
        res.send(admins);
        console.log(admins);
    });
};
