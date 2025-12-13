import { NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { isNotEmpty } from "@mantine/form";
import { type HttpError, useSelect, useTranslate, } from "@refinedev/core";
import { IconCurrencyEuro } from "@tabler/icons-react";
import { Create, useForm } from "refine-mantine";
import { type CategoryRecord, Collections, type ProductRecord } from "../../pocketbase.generated";

type ProductFormValues = Required<Pick<
  ProductRecord,
  "name" | "description" | "category" | "price"
>>

export const useProductForm = () => {
  const t = useTranslate();

  const categories = useSelect<CategoryRecord>({
    resource: Collections.Category,
    optionLabel: category => category.title, 
    optionValue: category => category.id,
  });

  const {
    saveButtonProps,
    getInputProps,
    refineCore: { formLoading },
  } = useForm<ProductRecord, HttpError, ProductFormValues>({
    initialValues: {
      name: "",
      description: "",
      price: 100,
      category: ""
    },
    validate: {
      name: isNotEmpty(t("pages.product.productForm.nameEmpty", "This field is required")),
      description: isNotEmpty(t("pages.product.productForm.descriptionEmpty", "This field is required")),
      category: isNotEmpty(t("pages.product.productForm.categoryEmpty", "This field is required")),
    }
  });

  const isLoading = formLoading || categories.query.isLoading;

  return {
    categories,
    isLoading,
    saveButtonProps,
    getInputProps,
  }
}

export const ProductForm = (p: ReturnType<typeof useProductForm>) => {
  const t = useTranslate();

  return (
    <>
      <TextInput
        mb="xs"
        label={t("pages.product.productForm.nameLabel", "Name")}
        placeholder={t("pages.product.productForm.namePlaceholder", "Please enter a name")}
        {...p.getInputProps("name")}
      />
      <Textarea
        mb="xs"
        label={t("pages.product.productForm.descriptionLabel", "Description")}
        placeholder={t("pages.product.productForm.descriptionPlaceholder", "Please enter a description")}
        {...p.getInputProps("description")}
      />
      <NumberInput
        mb="xs"
        label={t("pages.product.productForm.priceLabel", "Price")}
        placeholder={t("pages.product.productForm.pricePlaceholder", "Please enter a price")}
        leftSection={<IconCurrencyEuro size={18} />}
        {...p.getInputProps("price")}
      />
      <Select
        label={t("pages.product.productForm.categoryLabel", "Category")}
        placeholder={t("pages.product.productForm.categoryPlaceholder", "Please pick a category")}
        data={p.categories.options}
        {...p.getInputProps("category")}
      />
    </>
  )
}

export const ProductCreate = () => {
  const formProps = useProductForm();

  return (
    <Create isLoading={formProps.isLoading} saveButtonProps={formProps.saveButtonProps}>
      <ProductForm {...formProps}/>
    </Create>
  );
};
