import { Register } from './Register';

export default {
  title: 'Auth/Register',
  component: Register,
};

export const RegisterWithPassword = () =>
  <Register />;

export const RegisterWithPasswordConfirmation = () =>
  <Register withConfirmation />;
