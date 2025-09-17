import {
  Anchor,
  Breadcrumbs,
  Group,
  type BreadcrumbsProps as MantineBreadcrumbProps,
  Text,
} from "@mantine/core";
import {
  matchResourceFromRoute,
  useBreadcrumb,
  useLink,
  useResourceParams,
} from "@refinedev/core";
import type { RefineBreadcrumbProps } from "@refinedev/ui-types";
import { IconHome } from "@tabler/icons-react";
import type React from "react";

export type BreadcrumbProps = RefineBreadcrumbProps<MantineBreadcrumbProps>;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumbProps,
  showHome = true,
  hideIcons = false,
  meta,
  minItems = 2,
}) => {
  const { breadcrumbs } = useBreadcrumb({ meta });
  const Link = useLink();

  const { resources } = useResourceParams();

  const rootRouteResource = matchResourceFromRoute("/", resources);

  if (breadcrumbs.length < minItems) {
    return null;
  }

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      styles={{
        separator: { marginRight: 8, marginLeft: 8, color: "dimgray" },
      }}
      {...breadcrumbProps}
    >
      {showHome && rootRouteResource.found && (
        <Anchor
          // biome-ignore lint/suspicious/noExplicitAny: that's fine for now
          component={Link as any}
          c="dimmed"
          to="/"
        >
          {rootRouteResource?.resource?.meta?.icon ?? <IconHome size={18} />}
        </Anchor>
      )}
      {breadcrumbs.map(({ label, icon, href }) => {
        return (
          <Group key={label} gap={4} align="center" wrap="nowrap">
            {!hideIcons && icon}
            {href ? (
              <Anchor
                // biome-ignore lint/suspicious/noExplicitAny: that's fne for now
                component={Link as any}
                c="dimmed"
                to={href}
                size="sm"
              >
                {label}
              </Anchor>
            ) : (
              <Text c="dimmed" size="sm">
                {label}
              </Text>
            )}
          </Group>
        );
      })}
    </Breadcrumbs>
  );
};
