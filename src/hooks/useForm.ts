import type { UseFormInput } from "@mantine/form";
import {
  type UseFormReturnType as UseMantineFormReturnType,
  useForm as useMantineForm,
} from "@mantine/form";
import {
  type BaseRecord,
  flattenObjectKeys,
  type HttpError,
  type UseFormProps as UseFormCoreProps,
  type UseFormReturnType as UseFormReturnTypeCore,
  useForm as useFormCore,
  useRefineContext,
  useTranslate,
  useWarnAboutChange,
} from "@refinedev/core";
import { get, has, set } from "lodash";
import type React from "react";
import { useEffect } from "react";

type FormVariableType<TVariables, TTransformed> = ReturnType<
  NonNullable<
    UseFormInput<
      TVariables,
      (values: TVariables) => TTransformed
    >["transformValues"]
  >
>;

export type UseFormReturnType<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = Record<string, unknown>,
  TTransformed = TVariables,
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = UseMantineFormReturnType<
  TVariables,
  (values: TVariables) => TTransformed
> & {
  refineCore: UseFormReturnTypeCore<
    TQueryFnData,
    TError,
    FormVariableType<TVariables, TTransformed>,
    TData,
    TResponse,
    TResponseError
  >;
  saveButtonProps: {
    disabled: boolean;
    onClick: (e: React.PointerEvent<HTMLButtonElement>) => void;
  };
};

export type UseFormProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = Record<string, unknown>,
  TTransformed = TVariables,
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = {
  refineCoreProps?: UseFormCoreProps<
    TQueryFnData,
    TError,
    FormVariableType<TVariables, TTransformed>,
    TData,
    TResponse,
    TResponseError
  > & {
    warnWhenUnsavedChanges?: boolean;
  };
} & UseFormInput<TVariables, (values: TVariables) => TTransformed> & {
    /**
     * Disables server-side validation
     * @default false
     * @see {@link https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/}
     */
    disableServerSideValidation?: boolean;
  };

export const useForm = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  // biome-ignore lint/suspicious/noExplicitAny: that's fine
  TVariables extends Record<string, any> = Record<string, any>,
  TTransformed = TVariables,
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
>({
  refineCoreProps,
  disableServerSideValidation: disableServerSideValidationProp = false,
  ...rest
}: UseFormProps<
  TQueryFnData,
  TError,
  TVariables,
  TTransformed,
  TData,
  TResponse,
  TResponseError
> = {}): UseFormReturnType<
  TQueryFnData,
  TError,
  TVariables,
  TTransformed,
  TData,
  TResponse,
  TResponseError
> => {
  const { options } = useRefineContext();
  const disableServerSideValidation =
    options?.disableServerSideValidation || disableServerSideValidationProp;

  const translate = useTranslate();

  const warnWhenUnsavedChangesProp = refineCoreProps?.warnWhenUnsavedChanges;

  const { warnWhenUnsavedChanges: warnWhenUnsavedChangesRefine, setWarnWhen } =
    useWarnAboutChange();
  const warnWhenUnsavedChanges =
    warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesRefine;

  const useMantineFormResult = useMantineForm<
    TVariables,
    (values: TVariables) => TTransformed
  >({
    ...rest,
  });

  const {
    setValues,
    onSubmit: onMantineSubmit,
    isDirty,
    resetDirty,
    setFieldError,
    values,
  } = useMantineFormResult;

  const useFormCoreResult = useFormCore<
    TQueryFnData,
    TError,
    FormVariableType<TVariables, TTransformed>,
    TData,
    TResponse,
    TResponseError
  >({
    ...refineCoreProps,
    onMutationError: (error, _variables, _context) => {
      if (disableServerSideValidation) {
        refineCoreProps?.onMutationError?.(error, _variables, _context);
        return;
      }

      const errors = error?.errors;

      for (const key in errors) {
        const fieldError = errors[key];

        let newError = "";

        if (Array.isArray(fieldError)) {
          newError = fieldError.join(" ");
        }

        if (typeof fieldError === "string") {
          newError = fieldError;
        }

        if (typeof fieldError === "boolean") {
          newError = "Field is not valid.";
        }

        if (typeof fieldError === "object" && "key" in fieldError) {
          const translatedMessage = translate(
            fieldError.key,
            fieldError.message,
          );

          newError = translatedMessage;
        }
        setFieldError(key, newError);
      }

      refineCoreProps?.onMutationError?.(error, _variables, _context);
    },
  });

  const { query, formLoading, onFinish, onFinishAutoSave } = useFormCoreResult;

  // biome-ignore lint/correctness/useExhaustiveDependencies: code taken from refine, will check later
  useEffect(() => {
    if (typeof query?.data !== "undefined") {
      // biome-ignore lint/suspicious/noExplicitAny: that's fine
      const fields: any = {};

      const registeredFields = flattenObjectKeys(rest.initialValues ?? {});

      const data = query?.data?.data ?? {};

      Object.keys(registeredFields).forEach((key) => {
        const hasValue = has(data, key); // lodash.has
        const dataValue = get(data, key); // lodash.get

        if (hasValue) {
          set(fields, key, dataValue); // lodash.set
        }
      });

      setValues(fields);
      resetDirty(fields);
    }
  }, [query?.data]);

  const isValuesChanged = isDirty();

  // biome-ignore lint/correctness/useExhaustiveDependencies: code taken from refine, will check later
  useEffect(() => {
    if (warnWhenUnsavedChanges) {
      setWarnWhen(isValuesChanged);
    }
  }, [isValuesChanged]); // eslint-disable-line react-hooks/exhaustive-deps

  // biome-ignore lint/correctness/useExhaustiveDependencies: code taken from refine, will check later
  useEffect(() => {
    if (isValuesChanged && refineCoreProps?.autoSave && values) {
      setWarnWhen(false);

      const transformedValues = rest.transformValues
        ? rest.transformValues(values)
        : (values as unknown as TTransformed);

      onFinishAutoSave(transformedValues).catch((error) => error);
    }
  }, [values]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit: (typeof useMantineFormResult)["onSubmit"] =
    (handleSubmit, handleValidationFailure) => async (e) => {
      setWarnWhen(false);
      return await onMantineSubmit(handleSubmit, handleValidationFailure)(e);
    };

  const saveButtonProps = {
    disabled: formLoading,
    onClick: (e: React.PointerEvent<HTMLButtonElement>) => {
      onSubmit(
        (v) => onFinish(v).catch((error) => error),
        () => false,
        // @ts-expect-error event type is not compatible with pointer event
      )(e);
    },
  };

  return {
    ...useMantineFormResult,
    onSubmit,
    refineCore: useFormCoreResult,
    saveButtonProps,
  };
};
