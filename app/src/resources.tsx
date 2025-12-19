import type { ResourceProps } from "@refinedev/core";
import { IconCategoryFilled, IconList } from "@tabler/icons-react";
import { Collections } from "./pocketbase.generated";

const product: ResourceProps = {
  name: Collections.Product,
  list: "products",
  create: "products/create",
  edit: "products/edit/:id",
  show: "products/show/:id",
  meta: {
    canDelete: true,
    label: "Products",
    icon: <IconList />,
  },
};

const category: ResourceProps = {
  name: Collections.Category,
  list: "categories",
  create: "categories/create",
  edit: "categories/edit/:id",
  show: "categories/show/:id",
  meta: {
    label: "Categories",
    icon: <IconCategoryFilled />,
  },
};

export const resources = {
  product,
  category,
};

export const resourceList = Object.values(resources);
