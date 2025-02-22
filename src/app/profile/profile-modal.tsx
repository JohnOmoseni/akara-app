import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import Button from "@/components/reuseables/CustomButton";
import { useAuth } from "@/context/AuthContext";
import {
	useUpdateBankInfoMutation,
	useUpdateProfileMutation,
	useVerifyBankMutation,
} from "@/server/actions/profile";
import { useFormik } from "formik";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useMemo } from "react";
import { Value } from "react-phone-number-input";
import { toast } from "sonner";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import * as yup from "yup";
import Select from "react-select";

type Props = {
	closeModal: () => void;
	bankInfo?: any;
	profileInfo?: any;
	allBanks?: any;
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

export function EditBank({ bankInfo, allBanks, closeModal }: Props) {
	const [updateBankInfo, { isLoading: isUpdating }] =
		useUpdateBankInfoMutation();
	const [verifyBankMutation, { isLoading: isVerifying }] =
		useVerifyBankMutation();

	const bankList = useMemo(
		() =>
			Array.isArray(allBanks)
				? allBanks?.map((bank: any) => ({
						value: String(bank?.code),
						label: bank.name,
				  }))
				: [],
		[allBanks]
	);

	const onSubmit = async (values: any) => {
		const selectedBank =
			bankList?.find((bank) => bank.value === values.bank_code)?.label || "";

		try {
			const data = {
				bank_name: selectedBank,
				acc_name: values.account_name,
				acc_number: values.account_number,
			};

			const res = await updateBankInfo(data);
			if (res?.data?.error) throw new Error();

			const message = res?.data?.message || "Bank info updated successfully";
			toast.success(message);
			closeModal();
		} catch (error: any) {
			const message = error?.message || "Error saving changes";
			toast.error(message);
		}
	};

	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		handleSubmit,
		setFieldValue,
	} = useFormik({
		initialValues: {
			bank_code: bankInfo?.bank_code || "",
			account_number: bankInfo?.acc_number || "",
			account_name: bankInfo?.acc_name || "",
		},
		validationSchema: yup.object().shape({
			bank_code: yup.string().required("Bank name is required"),
			account_name: yup.string().required("Account name is required"),
			account_number: yup
				.string()
				.matches(/^\d+$/, "Account number must contain only numbers") // Ensures only digits
				.length(10, "Account number must be exactly 10 digits") // Ensures exact length
				.required("Account number is required"),
		}),
		onSubmit,
	});

	useEffect(() => {
		const verifyAccount = async () => {
			if (!values.account_number || !values.bank_code) return;

			const accountNumberStr = values.account_number.toString().trim();
			if (accountNumberStr.length !== 10 || !/^\d{10}$/.test(accountNumberStr))
				return;

			try {
				const data = {
					account_number: accountNumberStr,
					bank_code: values.bank_code,
				};

				const res = await verifyBankMutation(data);
				console.log("Verification Response:", res);

				let message;
				const error = res?.data?.data?.error;

				if (error) {
					message = res?.data?.message || "Failed to validate bank account";
					toast.info(message);
					setFieldValue("account_name", "");
					return;
				}

				// If verification succeeds, set the account name
				const accountName = res?.data?.data?.account_name || "";
				message =
					res?.data?.message || "Account details retrieved successfully!";
				setFieldValue("account_name", accountName);
			} catch (error) {
				console.error("Verification failed:", error);
			}
		};

		verifyAccount();
	}, [values.account_number]);

	return (
		<FormWrapper
			btnStyles=""
			containerStyles="max-w-full !mt-0"
			formWrapperStyles="h-full"
			footerSection={
				<div className="flex-column min-[500px]:row-flex gap-x-4 gap-y-2 mt-auto">
					<Button
						title="Cancel"
						variant="outline"
						onClick={closeModal}
						className="flex-1 max-[500px]:order-2 w-full"
					/>
					<Button
						title="Update"
						type="submit"
						isLoading={isUpdating}
						className="flex-1 max-[500px]:order-1 w-full"
					/>
				</div>
			}
			onSubmit={handleSubmit}
		>
			<CustomFormField
				fieldType={FormFieldType.SKELETON}
				name="bank_code"
				errors={errors}
				onBlur={handleBlur}
				touched={touched}
				renderSkeleton={() => (
					<>
						<Select
							name="bank_code"
							isSearchable
							className="basic-multi-select modal-select"
							styles={{
								control: (baseStyles) => ({
									...baseStyles,
								}),
							}}
							placeholder={"Select Bank"}
							onChange={(item: any) => {
								setFieldValue("bank_code", item?.value);
							}}
							options={bankList}
						/>
					</>
				)}
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
					disabled: isVerifying,
				}}
			/>

			{isVerifying ? (
				<div className="w-full grid place-items-center mt-2">
					<Loader2 className="size-6 animate-spin" />
				</div>
			) : (
				values.account_name && (
					<>
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
								disabled: true,
							}}
						/>
					</>
				)
			)}
		</FormWrapper>
	);
}
