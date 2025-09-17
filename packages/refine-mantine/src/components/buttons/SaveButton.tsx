import {
  ActionIcon,
  Button,
  type ButtonProps,
  type ButtonVariant,
} from "@mantine/core";
import { useSaveButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
  type RefineSaveButtonProps,
} from "@refinedev/ui-types";
import { IconDeviceFloppy, type IconProps } from "@tabler/icons-react";
import type React from "react";

export type MantineButtonProps = Omit<ButtonProps, "classNames"> & {
  size?: string;
  variant?: ButtonVariant;
};

export type SaveButtonProps = RefineSaveButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

/**
 * `<SaveButton>` uses Mantine {@link https://mantine.dev/core/button `<Button> `}.
 * It uses it for presantation purposes only. Some of the hooks that refine has adds features to this button.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/buttons/save-button} for more details.
 */
export const SaveButton: React.FC<SaveButtonProps> = ({
  hideText = false,
  svgIconProps,
  children,
  ...rest
}) => {
  const { label } = useSaveButton();

  const {
    variant,
    // biome-ignore lint/correctness/noUnusedVariables: styles is not used but necessary for destructuring
    styles,
    vars,
    ...commonProps
  } = rest;

  return hideText ? (
    <ActionIcon
      variant={variant ?? "filled"}
      aria-label={label}
      data-testid={RefineButtonTestIds.SaveButton}
      className={RefineButtonClassNames.SaveButton}
      {...commonProps}
    >
      <IconDeviceFloppy size={18} {...svgIconProps} />
    </ActionIcon>
  ) : (
    <Button
      variant={variant || "filled"}
      leftSection={<IconDeviceFloppy size={18} {...svgIconProps} />}
      data-testid={RefineButtonTestIds.SaveButton}
      className={RefineButtonClassNames.SaveButton}
      vars={vars}
      {...rest}
    >
      {children ?? label}
    </Button>
  );
};
