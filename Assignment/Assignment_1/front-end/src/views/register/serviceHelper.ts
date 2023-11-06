import { emailReg, errorMessage } from '../../utils/constants';
import { FormErrors } from '../../utils/types';

// function to check form errors
export const validateForm = (emailValue: string, passwordValue: string): FormErrors => {
    const errors = {
        email: '',
        password: '',
    };

    if (emailValue === '') {
        errors.email = errorMessage.EMPTY_EMAIL;
    } else if (!emailReg.test(emailValue)) {
        errors.email = errorMessage.INVALID_EMAIL;
    }
    if (passwordValue === '') {
        errors.password = errorMessage.EMPTY_PASSWORD;
    }
    return errors;
};

export const validateFormRegister = (emailValue: string, passwordValue: string, firstName: string, lastName: string, confirmPassword: string, mobile: number): any => {
    const errors = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        mobile: '',
        confirmPassword: ''
    };

    if (emailValue === '') {
        errors.email = errorMessage.EMPTY_EMAIL;
    } else if (!emailReg.test(emailValue)) {
        errors.email = errorMessage.INVALID_EMAIL;
    }
    if (passwordValue === '') {
        errors.password = errorMessage.EMPTY_PASSWORD;
    }
    if (firstName === '') {
        errors.firstName = 'First Name cannot be Empty'
    }
    if (lastName === '') {
        errors.lastName = 'Last Name cannot be Empty'
    }
    if (confirmPassword === '') {
        errors.confirmPassword = `Password doesn't match`
    }
    if (confirmPassword !== passwordValue) {
        errors.confirmPassword = `Password doesn't match`;
        errors.password = `Password doesn't match`
    }
    if (!mobile) {
        errors.mobile = 'Incorrect mobile number value'
    }
    return errors;
};

export default { validateForm };
