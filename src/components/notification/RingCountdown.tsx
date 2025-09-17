import { RingProgress, Text } from "@mantine/core";
import type React from "react";

export type RingCountdownProps = {
  undoableTimeout: number;
};

export const RingCountdown: React.FC<RingCountdownProps> = ({
  undoableTimeout,
}) => {
  return (
    <RingProgress
      size={55}
      thickness={4}
      roundCaps
      sections={[{ value: undoableTimeout * 20, color: "teal" }]}
      label={<Text>{undoableTimeout}</Text>}
    />
  );
};
