import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import Button from "@/components/reuseables/CustomButton";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as yup from "yup";

type Props = {
  closeModal: () => void;
  info?: any;
};

export function FundWallet({ closeModal }: Props) {
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
      amount: "",
    },
    validationSchema: yup.object().shape({
      amount: yup.number().required("Amount is required"),
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
              title="Proceed"
              type="submit"
              onClick={() => null}
              className="flex-1 max-[500px]:order-1 w-full"
            />
          </div>
        }
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-[max-content_max-content] items-center gap-2">
          <div />
          <div>
            <p className="font-semibold">Wema Bank</p>
            <span className="text-xs text-grey mt-0.5 font-medium">0513889571</span>
          </div>
        </div>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="amount"
          label="Enter Amount"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.amount,
            type: "number",
          }}
        />
      </FormWrapper>
    </div>
  );
}

export function WithdrawFund({ closeModal, info }: Props) {
  const balance = info?.balance;
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
      amount: "",
    },
    validationSchema: yup.object().shape({
      amount: yup
        .number()
        .required("Amount is required")
        .test("max-balance", "Amount cannot exceed available balance", (value) => {
          return value <= balance;
        }),
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
              title="Withdraw"
              type="submit"
              onClick={() => null}
              className="flex-1 max-[500px]:order-1 w-full"
            />
          </div>
        }
        onSubmit={handleSubmit}
      >
        <div className="flex-column gap-1.5">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="amount"
            label="Enter Amount"
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            field={{
              value: values.amount,
              type: "number",
            }}
          />

          <p className="text-xs text-muted-foreground ml-1">
            Current Wallet balance: ₦{balance || 0}
          </p>
        </div>
      </FormWrapper>
    </div>
  );
}
