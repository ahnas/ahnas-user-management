import { validateEmail } from './helper';

export const validateCreateUserForm = (data) => {
  const errors = {};
  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Invalid email';
  }
  return errors;
};
