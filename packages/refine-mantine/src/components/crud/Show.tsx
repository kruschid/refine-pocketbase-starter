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
  useRefineContext,
  useResourceParams,
  useToPath,
  useTranslate,
  useUserFriendlyName,
} from "@refinedev/core";
import {
  type RefineCrudShowProps,
  RefinePageHeaderClassNames,
} from "@refinedev/ui-types";
import { IconArrowLeft } from "@tabler/icons-react";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import {
  DeleteButton,
  type DeleteButtonProps,
} from "@/components/buttons/DeleteButton";
import {
  EditButton,
  type EditButtonProps,
} from "@/components/buttons/EditButton";
import {
  ListButton,
  type ListButtonProps,
} from "@/components/buttons/ListButton";
import {
  RefreshButton,
  type RefreshButtonProps,
} from "@/components/buttons/RefreshButton";

export type ShowProps = RefineCrudShowProps<
  GroupProps,
  GroupProps,
  CardProps,
  GroupProps,
  BoxProps,
  // biome-ignore lint/complexity/noBannedTypes: that's fine
  {},
  EditButtonProps,
  DeleteButtonProps,
  RefreshButtonProps,
  ListButtonProps
>;

export const Show: React.FC<ShowProps> = (props) => {
  const {
    children,
    resource: resourceFromProps,
    recordItemId,
    canDelete,
    deleteButtonProps: deleteButtonPropsFromProps,
    canEdit,
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
  } = props;
  const translate = useTranslate();
  const { options: { breadcrumb: globalBreadcrumb } = {} } = useRefineContext();

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

  const breadcrumbComponent =
    typeof breadcrumb !== "undefined" ? breadcrumb : <Breadcrumb />;

  const hasList = resource?.list && !recordItemId;
  const isDeleteButtonVisible =
    canDelete ?? (resource?.meta?.canDelete || deleteButtonPropsFromProps);

  const isEditButtonVisible =
    canEdit ?? resource?.meta?.canEdit ?? !!resource?.edit;

  const listButtonProps: ListButtonProps | undefined = hasList
    ? {
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier,
      }
    : undefined;
  const editButtonProps: EditButtonProps | undefined = isEditButtonVisible
    ? {
        ...(isLoading ? { disabled: true } : {}),
        color: undefined,
        variant: "filled",
        resource: identifier,
        recordItemId: id,
      }
    : undefined;
  const deleteButtonProps: DeleteButtonProps | undefined = isDeleteButtonVisible
    ? {
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier,
        recordItemId: id,
        onSuccess: () => {
          go({ to: goListPath });
        },
        dataProviderName,
      }
    : undefined;
  const refreshButtonProps: RefreshButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    resource: identifier,
    recordItemId: id,
    dataProviderName,
  };

  const loadingOverlayVisible = isLoading ?? false;

  const defaultHeaderButtons = (
    <>
      {hasList && <ListButton {...listButtonProps} />}
      {isEditButtonVisible && <EditButton {...editButtonProps} />}
      {isDeleteButtonVisible && <DeleteButton {...deleteButtonProps} />}
      <RefreshButton {...refreshButtonProps} />
    </>
  );

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
          defaultButtons: defaultHeaderButtons,
          deleteButtonProps,
          editButtonProps,
          listButtonProps,
          refreshButtonProps,
        })
      : headerButtonsFromProps
    : defaultHeaderButtons;

  const footerButtons = footerButtonsFromProps
    ? typeof footerButtonsFromProps === "function"
      ? footerButtonsFromProps({ defaultButtons: null })
      : footerButtonsFromProps
    : null;

  return (
    <Card p="md" {...wrapperProps}>
      <LoadingOverlay visible={loadingOverlayVisible} />
      <Group justify="space-between" align="center" {...headerProps}>
        <Stack gap="xs">
          {breadcrumbComponent}
          <Group gap="xs">
            {buttonBack}
            <Title order={3} className={RefinePageHeaderClassNames.Title}>
              {title ??
                translate(
                  `${identifier}.titles.show`,
                  `Show ${getUserFriendlyName(
                    resource?.meta?.label ?? identifier,
                    "singular",
                  )}`,
                )}
            </Title>
          </Group>
        </Stack>
        <Group {...headerButtonProps}>{headerButtons}</Group>
      </Group>
      <Box pt="sm" {...contentProps}>
        {children}
      </Box>
      <Group mt="md" {...footerButtonProps}>
        {footerButtons}
      </Group>
    </Card>
  );
};
