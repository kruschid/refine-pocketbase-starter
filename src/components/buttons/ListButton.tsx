import { ActionIcon, Anchor, Button } from "@mantine/core";
import { useListButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
  type RefineListButtonProps,
} from "@refinedev/ui-types";
import { IconList, type IconProps } from "@tabler/icons-react";
import type React from "react";
import type { MantineButtonProps } from "./SaveButton";

export type ListButtonProps = RefineListButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

/**
 * `<ListButton>` is using uses Mantine {@link https://mantine.dev/core/button `<Button> `} component.
 * It uses the  {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#list `list`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the list page route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/buttons/list-button} for more details.
 **/
export const ListButton: React.FC<ListButtonProps> = ({
  resource,
  hideText = false,
  accessControl,
  svgIconProps,
  meta,
  children,
  onClick,
  ...rest
}) => {
  const { to, label, title, disabled, hidden, LinkComponent } = useListButton({
    resource,
    accessControl,
    meta,
  });

  if (hidden) return null;

  const {
    variant,
    // biome-ignore lint/correctness/noUnusedVariables: styles unused but helps with destructuring
    styles,
    vars,
    ...commonProps
  } = rest;

  return (
    <Anchor
      // biome-ignore lint/suspicious/noExplicitAny: that's fine
      component={LinkComponent as any}
      to={to}
      replace={false}
      onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
    >
      {hideText ? (
        <ActionIcon
          variant={variant ?? "default"}
          disabled={disabled}
          title={title}
          data-testid={RefineButtonTestIds.ListButton}
          className={RefineButtonClassNames.ListButton}
          {...commonProps}
        >
          <IconList size={18} {...svgIconProps} />
        </ActionIcon>
      ) : (
        <Button
          variant={variant || "default"}
          disabled={disabled}
          leftSection={<IconList size={18} {...svgIconProps} />}
          title={title}
          data-testid={RefineButtonTestIds.ListButton}
          className={RefineButtonClassNames.ListButton}
          vars={vars}
          {...rest}
        >
          {children ?? label}
        </Button>
      )}
    </Anchor>
  );
};
