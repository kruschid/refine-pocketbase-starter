import { ActionIconGroup, NumberFormatter, Text } from "@mantine/core";
import { useShow } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import {
  DeleteButton,
  EditButton,
  Show,
  ShowButton,
  Table,
} from "refine-mantine";
import {
  type CategoryResponse,
  Collections,
  type ProductRecord,
} from "../../pocketbase.generated";

type ProductRecordKey = keyof ProductRecord;

export const CategoryShow = () => {
  const category = useShow<CategoryResponse>();

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
        cell: ({ row }) => (
          <Text size="sm" truncate="end" maw={400}>
            {row.original.description}
          </Text>
        ),
      },
      {
        id: "price" satisfies ProductRecordKey,
        header: "Price",
        accessorKey: "price" satisfies ProductRecordKey,
        enableColumnFilter: false,
        enableSorting: true,
        cell: ({ row }) => (
          <NumberFormatter
            suffix=" EUR"
            value={row.original.price}
            thousandSeparator="."
            decimalSeparator=","
            style={{
              whiteSpace: "nowrap",
            }}
          />
        ),
      },
      {
        id: "id" satisfies ProductRecordKey,
        enableColumnFilter: false,
        enableSorting: false,
        header: "Actions",
        cell: ({ row }) => (
          <ActionIconGroup>
            <ShowButton
              hideText
              resource={Collections.Product}
              recordItemId={row.original.id}
            />
            <EditButton
              hideText
              resource={Collections.Product}
              recordItemId={row.original.id}
            />
            <DeleteButton
              hideText
              resource={Collections.Product}
              recordItemId={row.original.id}
            />
          </ActionIconGroup>
        ),
      },
    ],
    [],
  );

  const tableProps = useTable<ProductRecord>({
    refineCoreProps: {
      resource: Collections.Product,
      queryOptions: {
        enabled: Boolean(category.result?.id),
      },
      filters: {
        initial: [
          {
            field: "category",
            operator: "eq",
            value: category.result?.id,
          },
        ],
      },
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
    <Show isLoading={category.query.isLoading} title={category.result?.title}>
      <Table props={tableProps} />
    </Show>
  );
};
