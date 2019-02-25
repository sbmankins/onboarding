const validateTickets = values => {
    const errors = {};

    if (!values.neID) {
        errors.neID = 'Required';
    }

    return errors;
};

export default validateTickets;
