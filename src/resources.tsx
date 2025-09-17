import type { ResourceProps } from "@refinedev/core";
import { IconCashRegister, IconCategoryFilled, IconLayoutGrid, IconPercentage70, IconUsersGroup } from "@tabler/icons-react";

const product: ResourceProps = {
  name: "product",
  list: "products",
  create: "products/create",
  edit: "products/edit/:id",
  show: "products/show/:id",
  meta: {
    canDelete: true,
    label: "Products",
    icon: <IconLayoutGrid />,
  }
}

const category: ResourceProps = {
  name: "category",
  list: "cetegories",
  create: "cetegories/create",
  edit: "cetegories/edit/:id",
  show: "cetegories/show/:id",
  meta: {
    label: "Categories",
    icon: <IconCategoryFilled />,
    parent: product.name,
  }
}

const client: ResourceProps = {
  name: "client",
  meta: {
    label: "Clients",
    icon: <IconUsersGroup />,
  }
}

const segment: ResourceProps = {
  name: "segment",
  meta: {
    label: "Segments",
    icon: <IconPercentage70 />,
    parent: client.name,
  }
}

const order: ResourceProps = {
  name: "order",
  meta: {
    label: "Orders",
    icon: <IconCashRegister />,
  }
}

export const resources = {
  product,
  category,
  client,
  segment,
  order,
}

export const resourceList = Object.values(resources);
