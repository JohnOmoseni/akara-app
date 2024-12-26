import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { FormikErrors, FormikTouched } from "formik";
import { FocusEventHandler, KeyboardEventHandler, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "@/constants/icons";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  SELECT = "select",
  SKELETON = "skeleton",
  PHONE_INPUT = "phoneInput",
}

interface CustomProps {
  name: string;
  field?: {
    value: any;
    type?: string;
    placeholder?: string;
  };
  isShowPasswordError?: boolean;
  containerStyles?: string;
  fieldType: FormFieldType;
  label?: string;
  tag?: string;
  iconSrc?: any;
  dir?: "left" | "right";
  disabled?: boolean;
  selectList?: Array<any>;
  labelStyles?: string;
  children?: React.ReactNode;
  errors?: FormikErrors<any>;
  touched?: FormikTouched<any>;
  required?: boolean;
  inputStyles?: string;
  selectContainerStyles?: string;
  renderSkeleton?: (field: any) => React.ReactNode;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: any;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const RenderInput = ({ props }: { props: CustomProps }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    field,
    label,
    fieldType,
    name,
    onBlur,
    onChange,
    inputStyles,
    selectContainerStyles,
    iconSrc: IconSrc,
    selectList,
  } = props;
  const placeholder = field?.placeholder ?? "";

  const changePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <>
          {IconSrc && (
            <span className="ml-2 mr-1 block mt-[1px] !bg-background-200">
              <IconSrc className="w-[18px] h-fit" />
            </span>
          )}
          <Input
            name={name}
            {...field}
            {...(field?.type === "password" && {
              type: showPassword ? "text" : "password",
            })}
            value={field?.value as string}
            onChange={onChange}
            onBlur={onBlur}
            className={cn(
              "i-reset !bg-background-200",
              field?.type === "password" && "pr-10",
              inputStyles
            )}
          />

          {field?.type === "password" && (
            <span className="icon absolute right-3 z-10" onClick={changePasswordVisibility}>
              {showPassword ? (
                <Eye size={20} className="text-secondary" />
              ) : (
                <EyeOff size={20} className="text-secondary" />
              )}
            </span>
          )}
        </>
      );

    case FormFieldType.TEXTAREA:
      return (
        <Textarea
          placeholder={placeholder}
          name={name}
          {...field}
          value={field?.value as string}
          onChange={onChange}
          onBlur={onBlur}
          className="bg-background-200 resize-none border-none"
        />
      );

    case FormFieldType.SELECT:
      return (
        <Select
          onValueChange={onChange}
          value={field?.value as string}
          defaultValue={field?.value as string}
        >
          <SelectTrigger className="shad-select-trigger !bg-background-200 !border-none ">
            <SelectValue
              placeholder={<span className="text-placeholder">{placeholder || "Select"}</span>}
            />
          </SelectTrigger>
          <SelectContent className={cn("shad-select-content z-[999]", selectContainerStyles)}>
            {props.children}

            {selectList?.length === 0 && (
              <SelectItem disabled={true} value="no-option" className="w-full">
                No option
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      );

    case FormFieldType.CHECKBOX:
      return (
        <div className="row-flex-start gap-2.5">
          <Checkbox
            id={name}
            name={name}
            checked={field?.value}
            onCheckedChange={(checked: any) => onChange(checked)}
          />
          <Label htmlFor={name} className="mt-0.5 cursor-pointer leading-4 text-grey">
            {label}
          </Label>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <PhoneInput
          name="phone_number"
          id="phone_number"
          placeholder={placeholder}
          international
          withCountryCallingCode
          defaultCountry="NG"
          value={field?.value}
          onChange={onChange}
          className="input-phone"
        />
      );

    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;

    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { name, label, labelStyles, errors, touched, fieldType, containerStyles } = props;

  const result = ![FormFieldType.SKELETON, FormFieldType.CHECKBOX].includes(fieldType) ? (
    <>
      {label && <Label className={cn("ml-1 inline-flex opacity-70", labelStyles)}>{label}</Label>}

      <div
        className={cn(
          "row-flex-start relative w-full gap-0.5 mt-2 overflow-hidden rounded-lg border border-border bg-background shadow-sm",
          containerStyles,
          errors?.[name] && touched?.[name] && "border-red-400"
        )}
      >
        <RenderInput props={props} />
      </div>
    </>
  ) : (
    <>
      <RenderInput props={props} />
    </>
  );

  return (
    <div className={cn("group w-full", errors?.[name] && touched?.[name] ? "is-error" : "")}>
      {result}

      <p className="transition-sm hidden ml-1 mt-1.5 text-xs font-semibold text-red-500 group-[.is-error]:block group-[.is-error]:animate-in">
        {errors?.[name] as string}
      </p>
    </div>
  );
};
export default CustomFormField;
