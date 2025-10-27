import type { ResourceProps } from "@refinedev/core";
import { IconCategoryFilled, IconLayoutGrid } from "@tabler/icons-react";

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
export const resources = {
  product,
  category,
}

export const resourceList = Object.values(resources);
