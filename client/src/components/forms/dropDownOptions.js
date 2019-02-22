import axios from 'axios';

export async function dropDownOptions() {
    let dropDownOptions = {};
    const admins = await axios.get('/api/admins');

    const managers = await axios.get('/api/managers');

    const statuses = await axios.get('/api/statuses');

    dropDownOptions = {
        adminOptions: admins.data,
        managerOptions: managers.data,
        statusOptions: statuses.data,
    };

    console.log(dropDownOptions);
    return await dropDownOptions;
}
