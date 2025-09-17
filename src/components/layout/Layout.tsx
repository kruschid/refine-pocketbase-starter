import {
  AppShell,
  type AppShellHeaderProps,
  type AppShellMainProps,
  type AppShellNavbarProps,
  type AppShellProps,
  type AppShellSectionProps,
  Avatar,
  Burger,
  Group,
  NavLink,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  type BaseRecord,
  CanAccess,
  Link,
  type TreeMenuItem,
  useGetIdentity,
  useLogout,
  useMenu,
  useNavigation,
  useRefineOptions,
} from "@refinedev/core";
import { IconList, IconLogout } from "@tabler/icons-react";
import { type ReactNode, useCallback } from "react";

interface LayoutProps {
  children: ReactNode;
  shellProps?: AppShellProps;
  headerProps?: AppShellHeaderProps;
  navbarProps?: AppShellNavbarProps;
  navbarMenuProps?: AppShellSectionProps;
  navbarFooterProps?: AppShellSectionProps;
  mainProps?: AppShellMainProps;
  renderHeader?: (toggle: ()=> void) => ReactNode;
  renderMenu?: (params: ReturnType<typeof useMenu>) => ReactNode;
  renderIdentity?: <T extends BaseRecord>(identity: T, logout: () => void) => ReactNode;
}

export const Layout: React.FC<LayoutProps> = (p) => {
  const [opened, { toggle }] = useDisclosure();
  const { title: { icon: defaultIcon, text: defaultText } = {} } =
    useRefineOptions();
  const { data: identity } = useGetIdentity();
  const menu = useMenu();
  const { mutate: logout } = useLogout();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      {...p.shellProps}
    >
      <AppShell.Header p="md" {...p.headerProps}>
        {p.renderHeader ? (
          p.renderHeader(toggle)
        ) : (
          <Group justify="space-between">
            <Link to="/" style={{ all: "unset" }}>
              <Group>
                <Text lh={0} fz="inherit">
                  {defaultIcon}
                </Text>
                <Text fz="inherit">{defaultText}</Text>
              </Group>
            </Link>
            <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          </Group>
        )}
      </AppShell.Header>

      <AppShell.Navbar {...p.navbarProps}>
        <AppShell.Section
          component={ScrollArea}
          grow
          mt="xs"
          {...p.navbarMenuProps}
        >
          {p.renderMenu ? (
            p.renderMenu(menu)
          ) : (
            menu.menuItems.map((item) => (
              <MenuItem
                item={item}
                defaultOpenKeys={menu.defaultOpenKeys}
                key={item.key}
                selectedKey={menu.selectedKey}
              />
            ))
          )}
        </AppShell.Section>
        <AppShell.Section {...p.navbarFooterProps}>
          {p.renderIdentity ? (
            p.renderIdentity(identity, handleLogout)
          ) : (
            <NavLink
              onClick={handleLogout}
              leftSection={identity?.avatar ? <Avatar src={identity.avatar} /> : undefined}
              rightSection={<IconLogout />}
              label="Sign out"
              variant="filled"
              description={identity?.email ? `Signed in as ${identity.email}` : undefined}
              active
            />
          )}
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main {...p.mainProps}>
        {p.children}
      </AppShell.Main>
    </AppShell>
  );
};

const MenuItem = (p: {
  item: TreeMenuItem;
  selectedKey?: string;
  defaultOpenKeys: string[];
}) => {
  const { listUrl } = useNavigation();
  const isSelected = p.item.key === p.selectedKey;
  return (
    <CanAccess
      key={p.item.key}
      resource={p.item.name}
      action="list"
      params={{
        resource: p.item,
      }}
    >
      <NavLink
        key={p.item.key}
        label={p.item.meta?.label}
        leftSection={p.item.meta?.icon ?? <IconList size={20} />}
        active={isSelected}
        defaultOpened={p.defaultOpenKeys.includes(p.item.key ?? "")}
        component={Link as React.FC<{ to: string }>}
        to={listUrl(p.item.name)}
      />
    </CanAccess>
  );
};
