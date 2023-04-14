import * as Yup from 'yup';

export const ValidationSchemaForSignup = Yup.object().shape({
  username: Yup.string()
    .required('Enter Username !!')
    .min(8, 'Minimum 8 characters are required in username !!')
    .max(16, 'Maximum 16 characters would be fine.'),
  password: Yup.string()
    .required('Enter Password !!')
    .min(8, 'Minimum 8 characters are required in password !!')
    .max(16, 'Maximum 16 characters would be fine.')
    .matches(/[a-zA-Z]/, 'minimum one alphabet is required !!')
    .matches(/\d/, 'minimum one digit is required !!'),
  email: Yup.string().email().required('Enter Email !!'),
});

export const ValidationSchemaForLogin = Yup.object().shape({
  username: Yup.string()
    .required('Enter Username !!')
    .min(6, 'Minimum 6 characters are required in username !!')
    .max(16, 'Maximum 16 characters would be fine.'),
  password: Yup.string()
    .required('Enter Password !!')
    .min(8, 'Minimum 8 characters are required in password !!')
    .max(16, 'Maximum 16 characters would be fine.')
    .matches(/[a-zA-Z]/, 'minimum one alphabet is required !!')
    .matches(/\d/, 'minimum one digit is required !!'),
});
