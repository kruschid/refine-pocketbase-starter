import { Box, Group, Pagination, Table } from "@mantine/core";
import type { BaseRecord, HttpError } from "@refinedev/core";
import type { UseTableReturnType } from "@refinedev/react-table";
import { flexRender } from "@tanstack/react-table";
import { ColumnFilter } from "./ColumnFilter";
import { ColumnSorter } from "./ColumnSorter";

export const ListTable = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
>({
  props,
}: {
  props: UseTableReturnType<TData, TError>;
}) => (
  <>
    <Table highlightOnHover>
      <Table.Thead>
        {props.reactTable.getHeaderGroups().map((headerGroup) => (
          <Table.Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.Th key={header.id}>
                {!header.isPlaceholder && (
                  <Group gap="xs" wrap="nowrap">
                    <Box>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </Box>
                    <Group gap="xs" wrap="nowrap">
                      <ColumnSorter column={header.column} />
                      <ColumnFilter column={header.column} />
                    </Group>
                  </Group>
                )}
              </Table.Th>
            ))}
          </Table.Tr>
        ))}
      </Table.Thead>
      <Table.Tbody>
        {props.reactTable.getRowModel().rows.map((row) => (
          <Table.Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
    <Group justify="flex-end" mt="xl">
      <Pagination
        total={props.refineCore.pageCount}
        value={props.refineCore.currentPage}
        onChange={props.refineCore.setCurrentPage}
      />
    </Group>
  </>
);
