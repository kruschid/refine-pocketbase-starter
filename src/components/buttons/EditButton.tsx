import { ActionIcon, Anchor, Button } from "@mantine/core";
import { useEditButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
  type RefineEditButtonProps,
} from "@refinedev/ui-types";
import { IconPencil, type IconProps } from "@tabler/icons-react";
import type React from "react";
import type { MantineButtonProps } from "./SaveButton";

export type EditButtonProps = RefineEditButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export const EditButton: React.FC<EditButtonProps> = ({
  resource,
  recordItemId,
  hideText = false,
  accessControl,
  svgIconProps,
  meta,
  children,
  onClick,
  ...rest
}) => {
  const { to, label, title, disabled, hidden, LinkComponent } = useEditButton({
    resource,
    id: recordItemId,
    accessControl,
    meta,
  });

  if (hidden) return null;

  const {
    variant,
    // biome-ignore lint/correctness/noUnusedVariables: styles is unused but destructuring is helpful here
    styles,
    vars,
    ...commonProps
  } = rest;

  return (
    <Anchor
      // biome-ignore lint/suspicious/noExplicitAny: convenience
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
          title={title}
          disabled={disabled}
          aria-label={label}
          data-testid={RefineButtonTestIds.EditButton}
          className={RefineButtonClassNames.EditButton}
          variant={variant ?? "default"}
          {...commonProps}
        >
          <IconPencil size={18} {...svgIconProps} />
        </ActionIcon>
      ) : (
        <Button
          variant={variant || "filled"}
          disabled={disabled}
          leftSection={<IconPencil size={18} {...svgIconProps} />}
          title={title}
          vars={vars}
          data-testid={RefineButtonTestIds.EditButton}
          className={RefineButtonClassNames.EditButton}
          {...rest}
        >
          {children ?? label}
        </Button>
      )}
    </Anchor>
  );
};
