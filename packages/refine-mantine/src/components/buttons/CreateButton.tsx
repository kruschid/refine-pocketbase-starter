import { ActionIcon, Anchor, Button, type ButtonProps } from "@mantine/core";
import { useCreateButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
  type RefineCreateButtonProps,
} from "@refinedev/ui-types";
import { type IconProps, IconSquarePlus } from "@tabler/icons-react";
import type React from "react";

export type CreateButtonProps = RefineCreateButtonProps<
  ButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export const CreateButton: React.FC<CreateButtonProps> = ({
  resource,
  hideText = false,
  accessControl,
  svgIconProps,
  meta,
  children,
  onClick,
  variant,
  vars,
}) => {
  const { to, label, title, disabled, hidden, LinkComponent } = useCreateButton(
    {
      resource,
      accessControl,
      meta,
    },
  );

  if (hidden) return null;

  return (
    <Anchor
      // biome-ignore lint/suspicious/noExplicitAny: that's fine for now
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
          variant={variant ?? "default"}
          data-testid={RefineButtonTestIds.CreateButton}
          className={RefineButtonClassNames.CreateButton}
        >
          <IconSquarePlus size={18} {...svgIconProps} />
        </ActionIcon>
      ) : (
        <Button
          disabled={disabled}
          leftSection={<IconSquarePlus size={18} {...svgIconProps} />}
          title={title}
          vars={vars}
          data-testid={RefineButtonTestIds.CreateButton}
          className={RefineButtonClassNames.CreateButton}
          variant={variant || "filled"}
        >
          {children ?? label}
        </Button>
      )}
    </Anchor>
  );
};
