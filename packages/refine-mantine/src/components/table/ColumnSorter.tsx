import { ActionIcon } from "@mantine/core";
import { IconChevronUp, IconSelector } from "@tabler/icons-react";
import type { Column } from "@tanstack/table-core";

export const ColumnSorter = <T extends object>(p: { column: Column<T> }) => {
  if (!p.column.getCanSort()) {
    return null;
  }

  const sorted = p.column.getIsSorted();

  return (
    <ActionIcon
      size="xs"
      onClick={p.column.getToggleSortingHandler()}
      style={{
        transition: "transform 0.25s",
        transform: `rotate(${sorted === "asc" ? "180" : "0"}deg)`,
      }}
      variant={sorted ? "light" : "transparent"}
      color={sorted ? "primary" : "gray"}
    >
      {!sorted ? <IconSelector size={18} /> : <IconChevronUp size={18} />}
    </ActionIcon>
  );
};
