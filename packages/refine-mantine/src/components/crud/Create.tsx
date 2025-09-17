import {
  ActionIcon,
  Box,
  type BoxProps,
  Card,
  type CardProps,
  Group,
  type GroupProps,
  LoadingOverlay,
  Stack,
  Title,
} from "@mantine/core";
import {
  useBack,
  useRefineContext,
  useResourceParams,
  useTranslate,
  useUserFriendlyName,
} from "@refinedev/core";
import {
  type RefineCrudCreateProps,
  RefinePageHeaderClassNames,
} from "@refinedev/ui-types";
import { IconArrowLeft } from "@tabler/icons-react";
import type React from "react";
import {
  SaveButton,
  type SaveButtonProps,
} from "@/components/buttons/SaveButton";
import { Breadcrumb } from "../breadcrumb/Breadcrumb";

export type CreateProps = RefineCrudCreateProps<
  SaveButtonProps,
  GroupProps,
  GroupProps,
  CardProps,
  GroupProps,
  BoxProps
>;

export const Create: React.FC<CreateProps> = (props) => {
  const {
    children,
    saveButtonProps: saveButtonPropsFromProps,
    isLoading,
    resource: resourceFromProps,
    footerButtons: footerButtonsFromProps,
    footerButtonProps,
    headerButtons: headerButtonsFromProps,
    headerButtonProps,
    wrapperProps,
    contentProps,
    headerProps,
    goBack: goBackFromProps,
    breadcrumb: breadcrumbFromProps,
    title,
  } = props;
  const translate = useTranslate();
  const { options: { breadcrumb: globalBreadcrumb } = {} } = useRefineContext();

  const back = useBack();
  const getUserFriendlyName = useUserFriendlyName();

  const { resource, identifier } = useResourceParams({
    resource: resourceFromProps,
  });

  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps;

  const breadcrumbComponent =
    typeof breadcrumb !== "undefined" ? breadcrumb : <Breadcrumb />;

  const saveButtonProps: SaveButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    ...saveButtonPropsFromProps,
  };

  const loadingOverlayVisible = isLoading ?? saveButtonProps?.disabled ?? false;

  const defaultFooterButtons = <SaveButton {...saveButtonProps} />;

  const buttonBack =
    goBackFromProps === (false || null) ? null : (
      <ActionIcon variant="subtle" onClick={back}>
        {typeof goBackFromProps !== "undefined" ? (
          goBackFromProps
        ) : (
          <IconArrowLeft />
        )}
      </ActionIcon>
    );

  const headerButtons = headerButtonsFromProps
    ? typeof headerButtonsFromProps === "function"
      ? headerButtonsFromProps({
          defaultButtons: null,
        })
      : headerButtonsFromProps
    : null;

  const footerButtons = footerButtonsFromProps
    ? typeof footerButtonsFromProps === "function"
      ? footerButtonsFromProps({
          defaultButtons: defaultFooterButtons,
          saveButtonProps,
        })
      : footerButtonsFromProps
    : defaultFooterButtons;

  return (
    <Card p="md" {...wrapperProps}>
      <LoadingOverlay visible={loadingOverlayVisible} zIndex={1000} />
      <Group justify="space-between" {...headerProps}>
        <Stack gap="xs">
          {breadcrumbComponent}
          <Group gap="xs">
            {buttonBack}
            {title ?? (
              <Title order={3} className={RefinePageHeaderClassNames.Title}>
                {translate(
                  `${identifier}.titles.create`,
                  `Create ${getUserFriendlyName(
                    resource?.meta?.label ?? identifier,
                    "singular",
                  )}`,
                )}
              </Title>
            )}
          </Group>
        </Stack>
        <Group gap="xs" {...headerButtonProps}>
          {headerButtons}
        </Group>
      </Group>
      <Box pt="sm" {...contentProps}>
        {children}
      </Box>
      <Group justify="right" gap="xs" mt="md" {...footerButtonProps}>
        {footerButtons}
      </Group>
    </Card>
  );
};
