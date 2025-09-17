import { ActionIcon, Group, Menu, Stack, TextInput } from "@mantine/core";
import type { CrudOperators } from "@refinedev/core";
import { IconCheck, IconFilter, IconX } from "@tabler/icons-react";
import type { Column } from "@tanstack/table-core";
import type React from "react";
import { useState } from "react";

interface ColumnFilterMeta<T = unknown> {
  filterOperator: CrudOperators;
  filterElement: React.FC<{
    value: T | null;
    onChange: (value: T | null) => void;
  }>;
}

export const columnFilterMeta = <T = unknown>(props: ColumnFilterMeta<T>) =>
  props;

export const ColumnFilter = <T extends object>(p: { column: Column<T> }) => {
  // biome-ignore lint/suspicious/noExplicitAny: that's fine for now
  const [state, setState] = useState<null | { value: any }>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  if (!p.column.getCanFilter()) {
    return null;
  }

  const meta = p.column.columnDef?.meta as ColumnFilterMeta | undefined;

  const filterOperator = meta?.filterOperator;
  const FilterComponent = meta?.filterElement;

  const open = () => {
    const value = p.column.getFilterValue() as undefined | T | T[];
    setState({
      // value needs to be stored as array for filterOperator "ina"
      value: Array.isArray(value) ? value?.[0] : value,
    });
  };

  const close = () => setState(null);

  const change = (value: unknown) => setState({ value });

  const clear = () => {
    p.column.setFilterValue(undefined);
    close();
  };

  const save = () => {
    if (!state) return;
    // value needs to be stored as array for filterOperator "ina"
    p.column.setFilterValue(
      filterOperator === "ina" ? [state.value] : state.value,
    );
    close();
  };

  return (
    <Menu
      opened={!!state}
      position="bottom"
      transitionProps={{ transition: "scale-y" }}
      shadow="xl"
      onClose={close}
      width="256px"
      withinPortal
    >
      <Menu.Target>
        <ActionIcon
          size="xs"
          onClick={open}
          variant={p.column.getIsFiltered() ? "light" : "transparent"}
          color={p.column.getIsFiltered() ? "primary" : "gray"}
        >
          <IconFilter size={18} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {!!state && (
          <Stack p="xs" gap="xs">
            {FilterComponent ? (
              <FilterComponent value={state?.value} onChange={change} />
            ) : (
              <TextInput
                autoComplete="off"
                value={state.value}
                onChange={(e) => change(e.target.value)}
              />
            )}
            <Group justify="flex-end" gap={6} wrap="nowrap">
              <ActionIcon
                size="md"
                color="gray"
                variant="outline"
                onClick={clear}
              >
                <IconX size={18} />
              </ActionIcon>
              <ActionIcon size="md" onClick={save} variant="outline">
                <IconCheck size={18} />
              </ActionIcon>
            </Group>
          </Stack>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};
