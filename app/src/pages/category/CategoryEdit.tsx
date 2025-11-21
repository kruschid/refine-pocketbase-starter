import { Edit } from "refine-mantine";
import { CategoryForm, useCategoryForm } from "./CategoryCreate";

export const CategoryEdit = () => {
  const formProps = useCategoryForm();

  return (
    <Edit saveButtonProps={formProps.saveButtonProps}>
      <CategoryForm {...formProps}/>
    </Edit>
  );
}
