import type { BoxProps, CardProps, GroupProps } from "@mantine/core";
import { Box, Card, Group, Stack, Title } from "@mantine/core";
import {
  useRefineContext,
  useResourceParams,
  useTranslate,
  useUserFriendlyName,
} from "@refinedev/core";
import {
  type RefineCrudListProps,
  RefinePageHeaderClassNames,
} from "@refinedev/ui-types";
import type React from "react";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import {
  CreateButton,
  type CreateButtonProps,
} from "@/components/buttons/CreateButton";

export type ListProps = RefineCrudListProps<
  CreateButtonProps,
  GroupProps,
  CardProps,
  GroupProps,
  BoxProps
>;

export const List: React.FC<ListProps> = (props) => {
  const {
    canCreate,
    children,
    createButtonProps: createButtonPropsFromProps,
    resource: resourceFromProps,
    wrapperProps,
    contentProps,
    headerProps,
    headerButtonProps,
    headerButtons: headerButtonsFromProps,
    breadcrumb: breadcrumbFromProps,
    title,
  } = props;
  const translate = useTranslate();
  const { options: { breadcrumb: globalBreadcrumb } = {} } = useRefineContext();

  const getUserFriendlyName = useUserFriendlyName();

  const { resource, identifier } = useResourceParams({
    resource: resourceFromProps,
  });

  const isCreateButtonVisible =
    canCreate ?? (!!resource?.create || createButtonPropsFromProps);

  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps;

  const createButtonProps: CreateButtonProps | undefined = isCreateButtonVisible
    ? ({
        size: "sm",
        resource: identifier,
        ...createButtonPropsFromProps,
      } as const)
    : undefined;

  const defaultHeaderButtons = isCreateButtonVisible ? (
    <CreateButton {...createButtonProps} />
  ) : null;

  const breadcrumbComponent =
    typeof breadcrumb !== "undefined" ? breadcrumb : <Breadcrumb />;

  const headerButtons = headerButtonsFromProps
    ? typeof headerButtonsFromProps === "function"
      ? headerButtonsFromProps({
          defaultButtons: defaultHeaderButtons,
          createButtonProps,
        })
      : headerButtonsFromProps
    : defaultHeaderButtons;

  return (
    <Card p="md" {...wrapperProps}>
      <Group justify="space-between" align="center" {...headerProps}>
        <Stack gap="xs">
          {breadcrumbComponent}
          {title ?? (
            <Title order={3} className={RefinePageHeaderClassNames.Title}>
              {translate(
                `${identifier}.titles.list`,
                getUserFriendlyName(
                  resource?.meta?.label ?? identifier,
                  "plural",
                ),
              )}
            </Title>
          )}
        </Stack>
        <Group gap="xs" {...headerButtonProps}>
          {headerButtons}
        </Group>
      </Group>
      <Box pt="sm" {...contentProps}>
        {children}
      </Box>
    </Card>
  );
};
