const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    }

    if (!values._type) {
        errors._type = 'Required';
    }
    if (!values._hirestatus) {
        errors._hirestatus = 'Required';
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

    if (!values._platform) {
        errors._platform = 'Required';
    }
    if (!values._computer) {
        errors._computer = 'Required';
    }

    return errors;
};

export default validate;
