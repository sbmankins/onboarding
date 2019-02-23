import DateField from './DateField';
import FormField from './FormField';

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

    {
        label: 'Start Date',
        name: 'dateStart',
        component: DateField,
        type: 'date',
    },
];
