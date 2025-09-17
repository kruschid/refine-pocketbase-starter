import { notificationProvider } from '@/providers/notificationProvider';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Refine } from '@refinedev/core';
import routerBindings from "@refinedev/react-router";
import { IconBrandMantine } from '@tabler/icons-react';
import { BrowserRouter } from 'react-router';
import { authProvider } from './providers/authProvider';
import { resourceList } from './resources';
import { Router } from './Router';
import { theme } from './theme';

export const App = () => (
  <BrowserRouter>
    <MantineProvider theme={theme}>
      <Refine
        authProvider={authProvider}
        routerProvider={routerBindings}
        notificationProvider={notificationProvider}
        resources={resourceList}
        options={{
          warnWhenUnsavedChanges: true,
          title: {
            icon: <IconBrandMantine size={32} />,
            text: "Refine-Mantine",
          },
        }}
      >
        <Router />
      </Refine>
    </MantineProvider>
  </BrowserRouter>
);
