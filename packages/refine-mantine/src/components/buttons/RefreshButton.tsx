import { ActionIcon, Button } from "@mantine/core";
import { useRefreshButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
  type RefineRefreshButtonProps,
} from "@refinedev/ui-types";
import { type IconProps, IconRefresh } from "@tabler/icons-react";
import type React from "react";
import type { MantineButtonProps } from "./SaveButton";

export type RefreshButtonProps = RefineRefreshButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

/**
 * `<RefreshButton>` uses Mantine {@link https://mantine.dev/core/button `<Button> `} component.
 * to update the data shown on the page via the {@link https://refine.dev/docs/api-reference/core/hooks/invalidate/useInvalidate `useInvalidate`} hook.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/buttons/refresh-button} for more details.
 */
export const RefreshButton: React.FC<RefreshButtonProps> = ({
  resource,
  recordItemId,
  hideText = false,
  dataProviderName,
  svgIconProps,
  children,
  onClick,
  ...rest
}) => {
  const {
    onClick: onRefresh,
    label,
    loading,
  } = useRefreshButton({
    resource,
    id: recordItemId,
    dataProviderName,
  });

  const { variant, styles: _styles, vars, ...commonProps } = rest;

  return hideText ? (
    <ActionIcon
      onClick={onClick ? onClick : onRefresh}
      loading={loading}
      aria-label={label}
      data-testid={RefineButtonTestIds.RefreshButton}
      className={RefineButtonClassNames.RefreshButton}
      variant={variant ?? "default"}
      {...commonProps}
    >
      <IconRefresh size={18} {...svgIconProps} />
    </ActionIcon>
  ) : (
    <Button
      variant={variant ?? "default"}
      leftSection={<IconRefresh size={18} {...svgIconProps} />}
      loading={loading}
      onClick={onClick ? onClick : onRefresh}
      data-testid={RefineButtonTestIds.RefreshButton}
      className={RefineButtonClassNames.RefreshButton}
      vars={vars}
      {...rest}
    >
      {children ?? label}
    </Button>
  );
};
