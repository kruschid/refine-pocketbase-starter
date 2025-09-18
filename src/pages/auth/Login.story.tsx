import { IconBrandApple, IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';
import { Login } from './Login';

export default {
  title: 'Auth/Login',
  component: Login,
};

export const WithPassword = () =>
  <Login method='password' />;

export const WithProviders = () =>
  <Login
    method='oauth'
    providers={[{
      name: "google",
      label: "Continue with Google",
      icon: <IconBrandGoogle />,
      buttonProps: {
        color: "red",
      }
    }, {
      name: "facebook",
      label: "Continue with the Facebook",
      icon: <IconBrandFacebook />,
      buttonProps: {
        color: "blue",
      }
    }, {
      name: "apple",
      label: "Continue with Apple",
      icon: <IconBrandApple />,
      buttonProps: {
        color: "gray",
      }
    }]}
  />;

export const WithProvidersAndPassword = () =>
  <Login
    method='password'
    providers={[{
      name: "google",
      label: "Continue with Google",
      icon: <IconBrandGoogle />,
      buttonProps: {
        color: "red",
      }
    }]}
  />;

export const WithProvidersAndOtp = () =>
  <Login
    method='otp'
    providers={[{
      name: "google",
      label: "Continue with Google",
      icon: <IconBrandGoogle />,
      buttonProps: {
        color: "red",
      }
    }]}
  />;

export const WithProvidersAndMfa = () =>
  <Login
    method='mfa'
    providers={[{
      name: "google",
      label: "Continue with Google",
      icon: <IconBrandGoogle />,
      buttonProps: {
        color: "red",
      }
    }]}
  />;

export const WithLinks = () =>
  <Login
    method="password"
    registerLink="/register"
    forgotPasswordLink="/forgot-password"
  />;