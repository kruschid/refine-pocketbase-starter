import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import { Refine } from "@refinedev/core";
import routerBindings from "@refinedev/react-router";
import { IconBrandMantine } from "@tabler/icons-react";
import { BrowserRouter } from "react-router";
import { notificationProvider } from "refine-mantine";
import {
  type AuthOptions,
  authProvider,
  dataProvider,
  liveProvider,
} from "refine-pocketbase";
import { Router } from "./Router";
import { resourceList, resources } from "./resources";
import { theme } from "./theme";
import { pb } from "./utils/pocketbase";

const authOptions: AuthOptions = {
  loginRedirectTo: `/${resources.product.list}`,
  registerRedirectTo: "/login",
  updatePasswordRedirectTo: "/login",
};

const providers = {
  dataProvider: dataProvider(pb),
  liveProvider: liveProvider(pb),
  authProvider: authProvider(pb, authOptions),
};

export const App = () => (
  <BrowserRouter>
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <Refine
        {...providers}
        routerProvider={routerBindings}
        resources={resourceList}
        notificationProvider={notificationProvider}
        options={{
          liveMode: "auto",
          warnWhenUnsavedChanges: true,
          title: {
            icon: <IconBrandMantine size={32} />,
            text: "Refine-Pocketbase-Starter",
          },
        }}
      >
        <Router />
      </Refine>
    </MantineProvider>
  </BrowserRouter>
);
