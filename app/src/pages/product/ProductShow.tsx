import {
  Badge,
  ButtonGroup,
  NumberFormatter,
  Text,
  Title,
} from "@mantine/core";
import { useShow } from "@refinedev/core";
import {
  CloneButton,
  DeleteButton,
  EditButton,
  RefreshButton,
  Show,
} from "refine-mantine";
import type {
  CategoryResponse,
  ProductResponse,
} from "../../pocketbase.generated";

type ProductExpanded = ProductResponse<{
  category: CategoryResponse;
}>;

export const ProductShow = () => {
  const {
    result: product,
    query: { isPending },
  } = useShow<ProductExpanded>({
    meta: {
      fields: ["id", "name", "description", "price", "expand.category.title"],
      expand: ["category"],
    },
  });

  return (
    <Show
      isLoading={isPending}
      headerButtons={() => (
        <ButtonGroup>
          <RefreshButton />
          <CloneButton />
          <EditButton />
          <DeleteButton />
        </ButtonGroup>
      )}
    >
      {product && (
        <>
          <Title order={5}>Name</Title>
          <Text>{product.name}</Text>
          <Title order={5} mt="sm">
            Description
          </Title>
          <Text>{product.description}</Text>
          <Title order={5} mt="sm">
            Price
          </Title>
          <NumberFormatter
            value={product.price}
            suffix=" EUR"
            thousandSeparator="."
            decimalSeparator=","
          />
          <Title order={5} mt="sm">
            Category
          </Title>
          <Badge variant="default">{product.expand.category.title}</Badge>
        </>
      )}
    </Show>
  );
};
