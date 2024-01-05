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

export default { validateForm };
