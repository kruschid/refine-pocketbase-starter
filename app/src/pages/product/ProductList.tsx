import { ActionIconGroup, Badge, Table as MantineTable, NumberFormatter, Select, Text } from "@mantine/core";
import { type CrudOperators, useSelect } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { DeleteButton, EditButton, List, ShowButton, Table } from "refine-mantine";
import { type CategoryRecord, Collections, type ProductRecord } from "../../pocketbase.generated";

type ProductRecordKey = keyof ProductRecord;

export const ProductList = () => {
  const categories = useSelect<CategoryRecord>({
    resource: Collections.Category,
    optionLabel: category => category.title, 
    optionValue: category => category.id,
  });

  const categoryMap = useMemo(() =>
    categories.query.data?.data.reduce<Record<string, string>>((acc, cat) => {
      acc[cat.id] = cat.title;
      return acc;
    }, {}) ?? {},
    [categories.query.data]
  );

  const CategoryFilter = useCallback((p: {
    value: string | null;
    onChange: (value: string | null) => void;
  }) => (
    <Select
      data={categories.options}
      value={p.value ?? null}
      onChange={p.onChange}
      comboboxProps={{ withinPortal: false }}
    />
  ), [categories.options]); 

  const columns = useMemo<ColumnDef<ProductRecord>[]>(
    () => [
      {
        id: "name" satisfies ProductRecordKey,
        header: "Name",
        accessorKey: "name" satisfies ProductRecordKey,
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "description" satisfies ProductRecordKey,
        header: "Description",
        accessorKey: "description" satisfies ProductRecordKey,
        enableSorting: false,
        meta: {
          filterOperator: "contains",
        },
        cell: ({ row }) =>
          <Text size="sm" truncate="end" maw={400}>{row.original.description}</Text>
      },
      {
        id: "price" satisfies ProductRecordKey,
        header: "Price",
        accessorKey: "price" satisfies ProductRecordKey,
        enableColumnFilter: false,
        enableSorting: true,
        cell: ({ row }) =>
          <NumberFormatter
            suffix=" EUR"
            value={row.original.price}
            thousandSeparator="."
            decimalSeparator=","
            style={{
              whiteSpace: "nowrap",
            }}
          />,
      },
      {
        id: "category",
        accessorFn: (row) => row.category,
        enableColumnFilter: true,
        enableSorting: false,
        header: "Category",
        meta: {
          filterOperator: "eq" satisfies CrudOperators,
          filterElement: CategoryFilter,
        },
        cell: ({ row }) =>
          <Badge size="sm" variant="default">
            {row.original.category ? categoryMap[row.original.category] : "uncategorized"} 
          </Badge>
      },
      {
        id: "id" satisfies ProductRecordKey,
        enableColumnFilter: false,
        enableSorting: false,
        header: "Actions",
        cell: ({ row }) => (
          <ActionIconGroup>
            <ShowButton hideText recordItemId={row.original.id} />
            <EditButton
              hideText
              recordItemId={row.original.id}
            />
            <DeleteButton hideText recordItemId={row.original.id} />
          </ActionIconGroup>
        ),
      },
    ],
    [categoryMap, CategoryFilter],
  );

  const tableProps = useTable<ProductRecord>({
    refineCoreProps: {
      resource: Collections.Product,
      pagination: {
        pageSize: 60,
      },
      sorters: {
        initial: [
          {
            field: "price" satisfies ProductRecordKey,
            order: "desc",
          },
        ],
      },
    },
    columns,
  });

  return (
    <List>
      <MantineTable.ScrollContainer minWidth={500}>
        <Table props={tableProps} />
      </MantineTable.ScrollContainer>
    </List>
  );
};
