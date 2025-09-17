import { ActionIcon, Box, Group, Text } from "@mantine/core";
import { IconRotate2 } from "@tabler/icons-react";
import { RingCountdown } from "./RingCountdown";

export const Message = (p: {
  undoableTimeout?: number;
  message: string;
  description?: string;
  onUndo: () => void;
}) => (
  <Group justify="space-between" wrap="nowrap">
    <Group gap="xs" justify="center">
      <RingCountdown undoableTimeout={p.undoableTimeout ?? 0} />
      <Box>
        <Text>{p.message}</Text>
        {p.description && <Text>{p.description}</Text>}
      </Box>
    </Group>
    <ActionIcon variant="default" onClick={p.onUndo}>
      <IconRotate2 size={18} />
    </ActionIcon>
  </Group>
);
