import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import Button from "@/components/reuseables/CustomButton";
import { useFormik } from "formik";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Value } from "react-phone-number-input";
import { toast } from "sonner";
import * as yup from "yup";

type Props = {
  closeModal: () => void;
};

export function EditProfile({ closeModal }: Props) {
  // @ts-ignore
  const onSubmit = async (values: any, actions: any) => {
    try {
      // const res = await requestCallbackMutation(data);

      actions?.resetForm();
    } catch (error: any) {
      const message = error?.response?.data?.message;

      toast.error(message || "Error saving changes");
    }
  };

  const { values, errors, touched, handleChange, setFieldValue, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        phone_number: "",
        email: "",
      },
      validationSchema: yup.object().shape({
        name: yup
          .string()
          .required("Name is required")
          .test("is-full-name", "Full Name is required", (value: any) => {
            return value && value.trim().split(" ").length >= 2;
          }),
        email: yup
          .string()
          .email("Please enter a valid email address")
          .required("Email is required"),
        phone_number: yup
          .string()
          .test("is-valid-phone", "Please enter a valid phone number", (value) =>
            isValidPhoneNumber(value!, "NG")
          )
          .required("Phone Number is required"),
      }),
      onSubmit,
    });

  return (
    <div className="relative">
      <FormWrapper
        btnStyles=""
        containerStyles="max-w-full !mt-0"
        footerSection={
          <div className="flex-column min-[500px]:row-flex gap-x-4 gap-y-2">
            <Button
              title="Cancel"
              variant="outline"
              onClick={closeModal}
              className="flex-1 max-[500px]:order-2 w-full"
            />
            <Button
              title="Update"
              type="submit"
              onClick={() => null}
              className="flex-1 max-[500px]:order-1 w-full"
            />
          </div>
        }
        onSubmit={handleSubmit}
      >
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.name,
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email address"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.email,
            type: "email",
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          name={"phone_number"}
          label="Phone Number"
          field={{ value: values.phone_number }}
          onChange={(value: Value) => {
            setFieldValue("phone_number", value);
          }}
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
      </FormWrapper>
    </div>
  );
}

export function EditBank({ closeModal }: Props) {
  // @ts-ignore
  const onSubmit = async (values: any, actions: any) => {
    try {
      // const res = await requestCallbackMutation(data);

      actions?.resetForm();
    } catch (error: any) {
      const message = error?.response?.data?.message;

      toast.error(message || "Error saving changes");
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      bank_name: "",
      account_number: "",
    },
    validationSchema: yup.object().shape({
      bank_name: yup.string().required("Bank name is required"),
      account_number: yup
        .number()
        .min(10, "Please enter a valid account number")
        .max(10, "Please enter a valid account number")
        .required("Account number is required"),
    }),
    onSubmit,
  });

  return (
    <div className="relative">
      <FormWrapper
        btnStyles=""
        containerStyles="max-w-full !mt-0"
        footerSection={
          <div className="flex-column min-[500px]:row-flex gap-x-4 gap-y-2">
            <Button
              title="Cancel"
              variant="outline"
              onClick={closeModal}
              className="flex-1 max-[500px]:order-2 w-full"
            />
            <Button
              title="Update"
              type="submit"
              onClick={() => null}
              className="flex-1 max-[500px]:order-1 w-full"
            />
          </div>
        }
        onSubmit={handleSubmit}
      >
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="bank_name"
          label="Bank name"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.bank_name,
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="account_number"
          label="Account number"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.account_number,
            type: "number",
          }}
        />
      </FormWrapper>
    </div>
  );
}
