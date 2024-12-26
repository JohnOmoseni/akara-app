import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "sonner";
import { InferType } from "yup";
import { Value } from "react-phone-number-input";
import { SelectItem } from "@/components/ui/select";
import {
  useUpdateProfileMutation,
  useUpdateProfilePasswordMutation,
} from "@/server/actions/profile";
import { ProfilePasswordSchema } from "@/schema/validation";
import { OptionType } from "@/types";
import { DatePicker } from "@/components/ui/components/Calendar";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

import dayjs from "dayjs";
import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";

type FormProps = {
  data?: any;
  states?: OptionType[];
};

export const ProfileForm = ({ data, states }: FormProps) => {
  const [updateProfileMutation] = useUpdateProfileMutation();

  const gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];

  const onSubmit = async (values: any) => {
    try {
      const data = {
        name: `${values.first_name} ${values.last_name}`,
        gender: values.gender,
        dob: dayjs(values.birthday).format("YYYY-MMM-D"),
        state_id: values.location,
      };

      await updateProfileMutation(data);
      toast.success("Saved");
    } catch (error: any) {
      const message = error?.response?.data?.message;

      toast.error(message || "Error saving changes");
    }
  };

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        first_name: data?.name || "",
        last_name: "",
        location: data?.state_id || "",
        birthday: data?.dob || "",
        sex: data?.gender || "",
      },
      validationSchema: "",
      onSubmit,
    });

  return (
    <FormWrapper
      onSubmit={handleSubmit}
      containerStyles="max-w-full"
      buttonLabel="Save Changes"
      isSubmitting={false}
    >
      <div className="relative ">
        <div className="flex-column gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="first_name"
              label="First Name"
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              field={{
                value: values.first_name,
                placeholder: "",
              }}
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="last_name"
              label="Last Name"
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              field={{
                value: values.last_name,
                placeholder: "",
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 mb-2">
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              name="birthday"
              field={{
                value: values.birthday,
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              renderSkeleton={() => {
                return (
                  <div className="flex-column gap-3 sm:mt-1">
                    <Label className="ml-1 inline-flex opacity-70">Birthday</Label>
                    <DatePicker
                      onChange={(date: Date) => {
                        console.log("[DATE]", format(date, "dd-MM-yyyy"));
                        setFieldValue("date", date);
                      }}
                    />
                  </div>
                );
              }}
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              name="sex"
              label="Sex"
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              field={{
                value: values.sex,
                placeholder: "Select Sex",
              }}
              onChange={(value: any) => {
                setFieldValue("sex", value);
              }}
              selectList={gender}
            >
              {gender?.map((item, index) => (
                <SelectItem key={index} value={item?.value} className="shad-select-item">
                  {item?.label}
                </SelectItem>
              ))}
            </CustomFormField>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            name="location"
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            field={{
              value: values.location,
              placeholder: "Select Location",
            }}
            onChange={(value: any) => {
              setFieldValue("location", value);
            }}
            selectList={states}
          >
            {states?.map((item, index) => (
              <SelectItem key={index} value={item?.value} className="shad-select-item">
                {item?.label}
              </SelectItem>
            ))}
          </CustomFormField>
        </div>
      </div>
    </FormWrapper>
  );
};

export const ContactForm = () => {
  const onSubmit = async (values: any) => {
    // @ts-ignore
    const data = {
      whatsapp_phone_number: values.whatsapp_phone_number?.startsWith("+234")
        ? `0${values.whatsapp_phone_number.slice(4)}`
        : values.whatsapp_phone_number,
      mobile_phone_number: values.mobile_phone_number?.startsWith("+234")
        ? `0${values.mobile_phone_number.slice(4)}`
        : values.mobile_phone_number,
    };

    try {
      toast.success("Saved");
    } catch (error: any) {
      const message = error?.response?.data?.message;

      toast.error(message || "Error saving changes");
    }
  };

  const { values, errors, touched, setFieldValue, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      whatsapp_phone_number: "",
      mobile_phone_number: "",
    },
    validationSchema: "",
    onSubmit,
  });

  return (
    <FormWrapper
      btnStyles=""
      containerStyles="max-w-full"
      buttonLabel="Save Changes"
      onSubmit={handleSubmit}
      isSubmitting={false}
    >
      <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
        name={"whatsapp_phone_number"}
        label="Whatsapp Phone Number"
        field={{ value: values.whatsapp_phone_number }}
        onChange={(value: Value) => {
          setFieldValue("whatsapp_phone_number", value);
        }}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />

      <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
        name={"mobile_phone_number"}
        label="Mobile Number"
        field={{ value: values.mobile_phone_number }}
        onChange={(value: Value) => {
          setFieldValue("mobile_phone_number", value);
        }}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />
    </FormWrapper>
  );
};

export const EmailForm = () => {
  const onSubmit = async (values: any) => {
    // @ts-ignore
    const data = {
      email: values.email,
    };

    try {
      toast.success("Saved");
    } catch (error: any) {
      const message = error?.response?.data?.message;

      toast.error(message || "Error saving changes");
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid email address").required("Email Address is required"),
    }),
    onSubmit,
  });

  return (
    <FormWrapper
      btnStyles=""
      containerStyles="max-w-full mt-0"
      buttonLabel="Save Changes"
      onSubmit={handleSubmit}
      isSubmitting={false}
    >
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        name="email"
        label="Email Address"
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
        onChange={handleChange}
        field={{
          value: values.email,
          placeholder: "Enter email address",
        }}
      />
    </FormWrapper>
  );
};

export const PasswordForm = () => {
  const [updatePasswordMutation, { isLoading }] = useUpdateProfilePasswordMutation();

  const onSubmit = async (values: InferType<typeof ProfilePasswordSchema>) => {
    const data = {
      old_password: values.old_password!,
      new_password: values.new_password!,
      new_password_confirmation: values.confirm_password,
    };

    try {
      await updatePasswordMutation(data).unwrap();
      toast.success("Password updated successfully");
    } catch (error: any) {
      const message = error?.data?.message;

      toast.error(message || "Error saving changes");
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: ProfilePasswordSchema,
    onSubmit,
  });

  return (
    <FormWrapper
      btnStyles=""
      containerStyles="max-w-full mt-0"
      buttonLabel="Save Changes"
      onSubmit={handleSubmit}
      isSubmitting={isLoading}
    >
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        name="old_password"
        label="Old Password"
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
        onChange={handleChange}
        tag="auth"
        field={{
          value: values.old_password,
          type: "password",
        }}
      />

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        name="new_password"
        label="New Password"
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
        onChange={handleChange}
        tag="auth"
        field={{
          value: values.new_password,
          type: "password",
        }}
      />

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        name="confirm_password"
        label="Confirm Password"
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
        onChange={handleChange}
        tag="auth"
        field={{
          value: values.confirm_password,
          type: "password",
        }}
      />
    </FormWrapper>
  );
};
