import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import Button from "@/components/reuseables/CustomButton";
import { useAuth } from "@/context/AuthContext";
import {
	useUpdateBankInfoMutation,
	useUpdateProfileMutation,
} from "@/server/actions/profile";
import { useFormik } from "formik";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Value } from "react-phone-number-input";
import { toast } from "sonner";
import * as yup from "yup";

type Props = {
	closeModal: () => void;
	bankInfo?: any;
	profileInfo?: any;
};

export function EditProfile({ profileInfo, closeModal }: Props) {
	const [updateProfileInfo, { isLoading }] = useUpdateProfileMutation();
	const { user } = useAuth();

	const onSubmit = async (values: any) => {
		try {
			const data = {
				firstname: values.name.split(" ")[0],
				lastname: values.name.split(" ")[1],
				phone: values.phone_number,
			};

			let message;
			const res = await updateProfileInfo(data);

			if (res?.error) {
				message = (res?.error as any)?.data?.message;
				throw new Error(message);
			}
			message = res?.data?.message || "Profile updated successfully";
			toast.success(message);

			closeModal();
		} catch (error: any) {
			const message = error?.message;

			console.log("TEST", error);

			toast.error(message || "Error saving changes");
		}
	};

	const {
		values,
		errors,
		touched,
		handleChange,
		setFieldValue,
		handleBlur,
		handleSubmit,
	} = useFormik({
		initialValues: {
			name: profileInfo?.name || "",
			phone_number: profileInfo?.phone_number || "",
			email: profileInfo?.email || user?.email || "",
		},
		validationSchema: yup.object().shape({
			name: yup
				.string()
				.required("Name is required")
				.test("is-full-name", "Full Name is required", (value: any) => {
					return value && value.trim().split(" ").length >= 2;
				}),
			email: yup.string().email("Please enter a valid email address"),
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
							type="button"
							title="Cancel"
							variant="outline"
							onClick={closeModal}
							className="flex-1 max-[500px]:order-2 w-full"
						/>
						<Button
							title="Update"
							type="submit"
							isLoading={isLoading}
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
						disabled: true,
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

export function EditBank({ bankInfo, closeModal }: Props) {
	const [updateBankInfo, { isLoading }] = useUpdateBankInfoMutation();

	const onSubmit = async (values: any) => {
		try {
			const data = {
				bank_name: values.bank_name,
				acc_name: values.account_name,
				acc_number: values.account_number,
			};

			const res = await updateBankInfo(data);
			if (res?.error) throw new Error();

			const message = res?.data?.message || "Bank info updated successfully";

			toast.success(message);
			closeModal();
		} catch (error: any) {
			const message = error?.message || "Error saving changes";
			toast.error(message);
		}
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useFormik({
			initialValues: {
				bank_name: bankInfo?.bank_name || "",
				account_number: bankInfo?.acc_number || "",
				account_name: bankInfo?.acc_name || "",
			},
			validationSchema: yup.object().shape({
				bank_name: yup.string().required("Bank name is required"),
				account_name: yup.string().required("Account name is required"),
				account_number: yup
					.string()
					.matches(/^\d+$/, "Account number must contain only numbers") // Ensures only digits
					.length(10, "Account number must be exactly 10 digits") // Ensures exact length
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
							isLoading={isLoading}
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
					name="account_name"
					label="Account name"
					onBlur={handleBlur}
					errors={errors}
					touched={touched}
					onChange={handleChange}
					field={{
						value: values.account_name,
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
