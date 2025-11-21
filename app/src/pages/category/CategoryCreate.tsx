import { TextInput } from "@mantine/core";
import { type HttpError, useTranslate } from "@refinedev/core";
import { Create, useForm } from "refine-mantine";
import type { CategoryRecord } from "../../pocketbase.generated";

type CategoryFormValues = Required<Pick<
  CategoryRecord,
  "title"
>>;

export const useCategoryForm = () => {
  const {
    saveButtonProps,
    getInputProps,
    refineCore: { formLoading },
  } = useForm<CategoryRecord, HttpError, CategoryFormValues>({
    initialValues: {
      title: ""
    },
  });

  return {
    formLoading,
    saveButtonProps,
    getInputProps,
  }
}

export const CategoryForm = (p: ReturnType<typeof useCategoryForm>) => {
  const t = useTranslate();

  return (
    <TextInput
      label={t("pages.category.categoryForm.titleLabel", "Title")}
      placeholder={t("pages.category.categoryForm.titlePlaceholder", "Please enter a title")}
      {...p.getInputProps("title")}
    />
  );
}

export const CategoryCreate = () => {
  const formProps = useCategoryForm();

  return (
    <Create saveButtonProps={formProps.saveButtonProps}>
      <CategoryForm {...formProps}/>
    </Create>
  );
}
