import {
  Button,
  type ButtonProps,
  Card,
  type CardProps,
  Center,
  LoadingOverlay,
  type LoadingOverlayProps,
  type PinInputProps,
  Stack,
  type StackProps,
  TextInput,
  type TextInputProps,
  Title
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { RegisterFormTypes, useRefineOptions, useRegister, useTranslate } from "@refinedev/core";
import { IconAt, IconLockPassword } from "@tabler/icons-react";
import { type ReactNode } from "react";

export interface RegisterProps {
    withConfirmation?: boolean;
    mutationVariables?: RegisterFormTypes;
    // props
    wrapperProps?: StackProps;
    emailFieldProps?: TextInputProps;
    passwordFieldProps?: TextInputProps;
    passwordConfirmationFieldProps?: TextInputProps;
    cardProps?: CardProps;
    loadingOverlayProps?: LoadingOverlayProps;
    otpInputProps?: PinInputProps;
    submitButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
    // components
    icon?: ReactNode;
    title?: ReactNode;
}

export const Register: React.FC<RegisterProps> = (p) => {
  const { title } = useRefineOptions();
  const translate = useTranslate();

  const { getInputProps, onSubmit, key } = useForm({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validate: {
      email: isEmail(
        translate("pages.register.invalidEmail", "Email is not valid")
      ),
      password: isNotEmpty(translate("pages.register.emptyPassword", "Password is required")),
      passwordConfirmation: (value, form) =>
        p.withConfirmation && form.password !== value
        ? translate("pages.register.passwordConfirmation", "Passwords do not match")
        : undefined
    },
  });

  const register = useRegister<RegisterFormTypes>();

  const handleSubmit = onSubmit(({ email, password }) => {
    register.mutate({  email, password, ...p.mutationVariables });
  });

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
          visible={register.isPending}
          {...p.loadingOverlayProps}
        />
        {p.title ?? (
          <Title order={5} mb="lg" ta="center">
            {translate("pages.register.title", "Register")}
          </Title>
        )}
          <form onSubmit={handleSubmit}>
            <TextInput
              mb="xs"
              type="email"
              label={translate("pages.register.email", "Email")}
              leftSection={<IconAt size={18} />}
              placeholder={translate("pages.register.emailPlaceholder", "name@example.com")}
              key={key("email")}
              {...getInputProps("email")}
              {...p.emailFieldProps}
            />
            <TextInput
              mb="sm" 
              label={translate("pages.register.password", "Password")}
              leftSection={<IconLockPassword size={18} />}
              placeholder="●●●●●●●●"
              type="password"
              key={key("password")}
              {...getInputProps("password")}
              {...p.passwordFieldProps}
            />
            {p.withConfirmation && (
              <TextInput
                mb="sm" 
                label={translate("pages.register.password", "Confirm Password")}
                leftSection={<IconLockPassword size={18} />}
                placeholder="●●●●●●●●"
                type="password"
                key={key("passwordConfirmation")}
                {...getInputProps("passwordConfirmation")}
                {...p.passwordConfirmationFieldProps}
              />
            )}
            <Center mt="lg">
              <Button
                type="submit"
                {...p.submitButtonProps}
              >
                {translate("pages.register.submit", "Register")}
              </Button>
            </Center>
          </form>
      </Card>
    </Stack>
  );
};
