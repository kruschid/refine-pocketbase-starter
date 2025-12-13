import { TextInput } from "@mantine/core";
import { isNotEmpty } from "@mantine/form";
import { type HttpError, useTranslate } from "@refinedev/core";
import { Create, useForm } from "refine-mantine";
import type { CategoryRecord } from "../../pocketbase.generated";

type CategoryFormValues = Required<Pick<
  CategoryRecord,
  "title"
>>;

export const useCategoryForm = () => {
  const t = useTranslate();

  const {
    saveButtonProps,
    getInputProps,
    refineCore: { formLoading: isLoading },
  } = useForm<CategoryRecord, HttpError, CategoryFormValues>({
    initialValues: {
      title: ""
    },
    validate: {
      title: isNotEmpty(t("pages.category.categoryForm.titleEmpty", "This field is required")),
    }
  });

  return {
    isLoading,
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
    <Create isLoading={formProps.isLoading} saveButtonProps={formProps.saveButtonProps}>
      <CategoryForm {...formProps}/>
    </Create>
  );
}
