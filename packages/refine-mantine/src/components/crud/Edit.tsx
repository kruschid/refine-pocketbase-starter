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
  useGo,
  useMutationMode,
  useRefineContext,
  useResourceParams,
  useToPath,
  useTranslate,
  useUserFriendlyName,
} from "@refinedev/core";
import {
  type RefineCrudEditProps,
  RefinePageHeaderClassNames,
} from "@refinedev/ui-types";
import { IconArrowLeft } from "@tabler/icons-react";
import type React from "react";
import { AutoSaveIndicator } from "@/components/AutoSaveIndicator";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import {
  DeleteButton,
  type DeleteButtonProps,
} from "@/components/buttons/DeleteButton";
import {
  ListButton,
  type ListButtonProps,
} from "@/components/buttons/ListButton";
import {
  RefreshButton,
  type RefreshButtonProps,
} from "@/components/buttons/RefreshButton";
import {
  SaveButton,
  type SaveButtonProps,
} from "@/components/buttons/SaveButton";

export type EditProps = RefineCrudEditProps<
  SaveButtonProps,
  DeleteButtonProps,
  GroupProps,
  GroupProps,
  CardProps,
  GroupProps,
  BoxProps,
  Record<never, never>,
  RefreshButtonProps,
  ListButtonProps
>;

export const Edit: React.FC<EditProps> = (props) => {
  const {
    children,
    resource: resourceFromProps,
    recordItemId,
    deleteButtonProps: deleteButtonPropsFromProps,
    mutationMode: mutationModeFromProps,
    saveButtonProps: saveButtonPropsFromProps,
    canDelete,
    dataProviderName,
    isLoading,
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
    autoSaveProps,
  } = props;
  const translate = useTranslate();
  const { options: { breadcrumb: globalBreadcrumb } = {} } = useRefineContext();
  const { mutationMode: mutationModeContext } = useMutationMode();
  const mutationMode = mutationModeFromProps ?? mutationModeContext;

  const back = useBack();
  const go = useGo();
  const getUserFriendlyName = useUserFriendlyName();

  const {
    resource,
    id: idFromParams,
    identifier,
  } = useResourceParams({
    resource: resourceFromProps,
  });

  const goListPath = useToPath({
    resource,
    action: "list",
  });

  const id = recordItemId ?? idFromParams;

  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps;

  const hasList = resource?.list && !recordItemId;

  const isDeleteButtonVisible =
    canDelete ?? (resource?.meta?.canDelete || deleteButtonPropsFromProps);

  const breadcrumbComponent =
    typeof breadcrumb !== "undefined" ? breadcrumb : <Breadcrumb />;

  const loadingOverlayVisible =
    isLoading ?? saveButtonPropsFromProps?.disabled ?? false;

  const listButtonProps: ListButtonProps | undefined = hasList
    ? {
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier,
      }
    : undefined;

  const refreshButtonProps: RefreshButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    resource: identifier,
    recordItemId: id,
    dataProviderName,
  };

  const deleteButtonProps: DeleteButtonProps | undefined = isDeleteButtonVisible
    ? ({
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier,
        mutationMode,
        onSuccess: () => {
          go({ to: goListPath });
        },
        recordItemId: id,
        dataProviderName,
        ...deleteButtonPropsFromProps,
      } as const)
    : undefined;

  const saveButtonProps: SaveButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    ...saveButtonPropsFromProps,
  };

  const defaultHeaderButtons = (
    <>
      {autoSaveProps && <AutoSaveIndicator {...autoSaveProps} />}
      {hasList && <ListButton {...listButtonProps} />}
      <RefreshButton {...refreshButtonProps} />
    </>
  );

  const defaultFooterButtons = (
    <>
      {isDeleteButtonVisible && <DeleteButton {...deleteButtonProps} />}
      <SaveButton {...saveButtonProps} />
    </>
  );

  const buttonBack =
    goBackFromProps === false || goBackFromProps === null ? null : (
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
          defaultButtons: defaultHeaderButtons,
          listButtonProps,
          refreshButtonProps,
        })
      : headerButtonsFromProps
    : defaultHeaderButtons;

  const footerButtons = footerButtonsFromProps
    ? typeof footerButtonsFromProps === "function"
      ? footerButtonsFromProps({
          defaultButtons: defaultFooterButtons,
          deleteButtonProps,
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
                  `${identifier}.titles.edit`,
                  `Edit ${getUserFriendlyName(
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
