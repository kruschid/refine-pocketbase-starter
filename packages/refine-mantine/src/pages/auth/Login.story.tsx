import { IconBrandApple, IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';
import { Login } from './Login';

export default {
  title: 'Auth/Login',
  component: Login,
};

export const LoginWithPassword = () =>
  <Login method='password' />;

export const LoginWithProviders = () =>
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

export const LoginWithProvidersAndPassword = () =>
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

export const LoginWithProvidersAndOtp = () =>
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

export const LoginWithProvidersAndMfa = () =>
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