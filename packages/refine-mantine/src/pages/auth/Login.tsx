import { useOtp } from "@/hooks/useOtp";
import {
  Anchor,
  Button,
  type ButtonProps,
  Card,
  type CardProps,
  Center,
  Collapse,
  Divider,
  Input,
  LoadingOverlay,
  type LoadingOverlayProps,
  PinInput,
  type PinInputProps,
  Stack,
  type StackProps,
  Text,
  TextInput,
  type TextInputProps,
  Title
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { type OAuthProvider, type LoginFormTypes as RefineLoginFormTypes, useLogin, useRefineOptions, useTranslate } from "@refinedev/core";
import { IconAt, IconLockPassword } from "@tabler/icons-react";
import { type ReactNode, useCallback } from "react";
import { Link } from "react-router";
import type { LoginOptions } from "refine-pocketbase";

export interface OAuthProviderMantine extends OAuthProvider {
  buttonProps?: ButtonProps;
} 

export type LoginProps = {
  providers?: OAuthProviderMantine[];
  mutationVariables?: RefineLoginFormTypes;
  registerLink?: string;
  forgotPasswordLink?: string;
  // customization
  wrapperProps?: StackProps;
  emailFieldProps?: TextInputProps;
  passwordFieldProps?: TextInputProps;
  cardProps?: CardProps;
  loadingOverlayProps?: LoadingOverlayProps;
  otpInputProps?: PinInputProps;
  submitButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  // components
  icon?: ReactNode;
  title?: ReactNode;
} & (
  {
    method: "oauth";
    providers: OAuthProvider[];
  } | {
    method: "otp" | "mfa" | "password";
  }
);

export const Login: React.FC<LoginProps> = (p) => {
  const { title } = useRefineOptions();
  const translate = useTranslate();
  const login = useLogin<LoginOptions>();
  const [isOtpInputVisible, otpInput] = useDisclosure(false);

  const { values, getInputProps, onSubmit, key } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail(
        translate("pages.login.invalidEmail", "Email is not valid")
      ),
      password: (p.method === "password" || p.method === "mfa")
        ? isNotEmpty(translate("pages.login.emptyPassword", "Password is required"))
        : undefined,
    },
  });

  const requestOtp = useOtp({
    onError: () => {
      notifications.show({
        title: translate("pages.login.errorTitle", "Something went wrong"),
        message: translate("pages.login.errorMessage", "Please try again"),
      });
    },
    onSuccess: () => {
      otpInput.open();
    }
  })

  const handleProviderLogin = useCallback((provider: OAuthProvider) => {
    login.mutate({ provider: provider.name, ...p.mutationVariables });
  }, [login, p.mutationVariables]);

  const handleSubmit = onSubmit(({ email, password }) => {
    if(p.method === "mfa" || p.method === "otp") {
      requestOtp.mutate(values);
    } else {
      login.mutate({ email, password, ...p.mutationVariables });
    }
  });

  const handleOtpLogin = useCallback((otp: string) => {
    if(p.method !== "mfa" && p.method !== "otp")
      return;

    login.mutate({ otp });
  }, [p, login]);

  return (
    <Stack h="100vh" align="center" justify="center" {...p.wrapperProps}>
      {p.icon ?? (
        <Stack align="center">
          {title.icon}
          {title.text}
        </Stack>
      )}
      <Card shadow="sm" padding="lg" radius="md" withBorder {...p.cardProps}>
        <LoadingOverlay
          visible={login.isPending || requestOtp.isPending}
          {...p.loadingOverlayProps}
        />
        {p.title ?? (
          <Title order={5} mb="lg" ta="center">
            {translate("pages.login.title", "Sign in to your account")}
          </Title>
        )}
        <Collapse in={!isOtpInputVisible}>
          {p.providers?.length && (
            <Providers
              providers={p.providers}
              withDivider={p.method !== "oauth"}
              onClickProvider={handleProviderLogin}
            />
          )}
        </Collapse>
        {p.method !== "oauth" && (
          <form onSubmit={handleSubmit}>
            <Collapse in={!isOtpInputVisible}>
              <TextInput
                mb="xs"
                type="email"
                label={translate("pages.login.email", "Email")}
                leftSection={<IconAt size={18} />}
                placeholder={translate("pages.login.emailPlaceholder", "name@example.com")}
                key={key("email")}
                {...getInputProps("email")}
                {...p.emailFieldProps}
              />
              {(p.method === "mfa" || p.method === "password") && (
                <TextInput
                  label={translate("pages.login.password", "Password")}
                  leftSection={<IconLockPassword size={18} />}
                  placeholder="●●●●●●●●"
                  type="password"
                  key={key("password")}
                  {...getInputProps("password")}
                  {...p.passwordFieldProps}
                />
              )}
              {p.forgotPasswordLink &&
                <Text size="xs" mt="xs" ta="end">
                  <Anchor component={Link} to={p.forgotPasswordLink}>
                    {translate("pages.login.forgotPassword", "Forgot password?")}
                  </Anchor>
                </Text>
              }
              <Center mt="lg">
                <Button
                  fullWidth
                  type="submit"
                  {...p.submitButtonProps}
                >
                  {translate("pages.login.submit", "Login")}
                </Button>
              </Center>
              {p.registerLink &&
                <Text mt="lg" size="xs" ta="center">
                  {translate("pages.login.noAccount", "Don’t have an account?")}
                  {" "}
                  <Anchor component={Link} to={p.registerLink}>
                    {translate("pages.login.register", "Sign up")}
                  </Anchor>
                </Text>
              }
            </Collapse>
            <Collapse in={isOtpInputVisible}>
              <Input.Wrapper
                label={translate("pages.login.otpLabel", "Enter or paste your auth token")}
              >
                <PinInput
                  type="number"
                  length={6}
                  oneTimeCode
                  disabled={login.isPending || requestOtp.isPending}
                  onComplete={handleOtpLogin}
                  {...p.otpInputProps}
                />
              </Input.Wrapper>
              <Center mt="lg">
                <Button
                  fullWidth
                  variant="outline"
                  onClick={otpInput.close}
                  {...p.cancelButtonProps}
                >
                  {translate("pages.login.cancel", "Cancel")}
                </Button>
              </Center>
            </Collapse>
          </form>
        )}
      </Card>
    </Stack>
  );
};

const Providers = (p: {
  providers: OAuthProviderMantine[];
  withDivider: boolean;
  onClickProvider: (provider: OAuthProvider) => void;
}) => {
  const translate = useTranslate();

  return (
    <>
      <Stack gap={8}>
        {p.providers.map((provider) =>
          <Button
            key={provider.name}
            fullWidth
            leftSection={provider.icon}
            onClick={() => p.onClickProvider(provider)}
            {...provider.buttonProps}
          >
            {provider.label ?? provider.name}
          </Button>
        )}
      </Stack>
      {p.withDivider && (
        <Divider
          my="md"
          labelPosition="center"
          label={translate("pages.login.divider", "or")}
        />
      )}
    </>
  );
}
