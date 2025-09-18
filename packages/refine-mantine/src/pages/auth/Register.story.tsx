import { Register } from './Register';

export default {
  title: 'Auth/Register',
  component: Register,
};

export const WithPassword = () =>
  <Register />;

export const WithPasswordConfirmation = () =>
  <Register withConfirmation />;

export const WithLink = () =>
  <Register
    withConfirmation
    loginLink="/login"
  />;