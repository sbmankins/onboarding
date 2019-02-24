const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    }
    // if (!values.email) {
    //   errors.email = 'Required'
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = 'Invalid email address'
    // }
    if (!values._type) {
        errors._type = 'Required';
    }
    if (!values._hirestatus) {
        errors._hirestatus = 'Required';
    }
    if (!values.buddy) {
        errors.buddy = 'Required';
    }
    if (!values._manager) {
        errors._manager = 'Required';
    }
    if (!values._admin) {
        errors._admin = 'Required';
    }
    if (!values._status) {
        errors._status = 'Required';
    }
    if (!values._team) {
        errors._team = 'Required';
    }
    if (!values._role) {
        errors._role = 'Required';
    }
    if (!values._region) {
        errors._region = 'Required';
    }

    return errors;
};

export default validate;
