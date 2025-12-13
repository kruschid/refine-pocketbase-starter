import { ButtonGroup } from "@mantine/core";
import { CloneButton, Edit, ListButton, RefreshButton } from "refine-mantine";
import { ProductForm, useProductForm } from "./ProductCreate";

export const ProductEdit = () => {
  const formProps = useProductForm();

  return (
    <Edit
      isLoading={formProps.isLoading}
      saveButtonProps={formProps.saveButtonProps}
      headerButtons={
        <ButtonGroup>
          <ListButton />
          <RefreshButton />
          <CloneButton />
        </ButtonGroup>
      }
    >
      <ProductForm {...formProps} />
    </Edit>
  );
}
