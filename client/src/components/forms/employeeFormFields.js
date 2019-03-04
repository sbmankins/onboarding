import FormField from './FormField';
//used to create first 6 fields on EmployeeForm
export default [
    {
        label: 'First Name',
        name: 'firstName',
        component: FormField,
        type: 'text',
    },
    {
        label: 'Last Name',
        name: 'lastName',
        component: FormField,
        type: 'text',
    },

    {
        label: 'CWID',
        name: 'cwID',
        component: FormField,
        type: 'text',
    },
    {
        label: 'EID/NEID',
        name: 'neID',
        component: FormField,
        type: 'text',
    },

    {
        label: 'Onboarding Buddy',
        name: 'buddy',
        component: FormField,
        type: 'text',
    },

    {
        label: 'Seat',
        name: 'seat',
        component: FormField,
        type: 'text',
    },
];
