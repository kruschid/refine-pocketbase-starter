import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Refine } from '@refinedev/core';
import type { Preview } from "@storybook/react";
import { BrowserRouter } from 'react-router';
import { IconBrandMantine } from "@tabler/icons-react";
import { authProvider } from "../src/providers/authProvider";
import { theme } from '../src/theme';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
    backgrounds: { disable: true },
  },
  decorators: [
    (Story, _ctx) => (
      <BrowserRouter>
        <MantineProvider theme={theme}>
          <Refine
            authProvider={authProvider}
            options={{
              warnWhenUnsavedChanges: true,
              title: {
                icon: <IconBrandMantine size={32} />,
                text: "Refine-Mantine",
              },
            }}
          >
            <Story />
          </Refine>
        </MantineProvider>
      </BrowserRouter>
    )
  ], 
}

export default preview;
