import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import Button from "@/components/reuseables/CustomButton";
import { WalletIcon } from "@/constants/icons";
import { handlePayment } from "@/lib/utils";
import {
	useDepositMutation,
	useWithdrawMutation,
} from "@/server/actions/transactions";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";

type Props = {
	closeModal: () => void;
	bankInfo?: any;
};

export function FundWallet({ bankInfo, closeModal }: Props) {
	const [depositMutation, { isLoading }] = useDepositMutation();
	const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);
	const onSubmit = async (values: any) => {
		setIsPaymentInitiated(true);
		const data = { amount: values.amount };
		let message;

		try {
			const res = await depositMutation(data);
			if (res?.error) {
				message = (res.error as any)?.error || "An error occured";
				throw new Error(message);
			}

			message = res?.data?.message || "Deposit initialized successfully";
			toast.info(message);

			const checkoutUrl = res?.data?.data?.checkoutUrl;
			if (checkoutUrl) await handlePayment(checkoutUrl);
			setIsPaymentInitiated(false);
		} catch (error: any) {
			const message = error.message || "An error occured";

			toast.error(message);
			setIsPaymentInitiated(false);
		}
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useFormik({
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
							type="submit"
							title={isLoading ? "Processing..." : "Proceed"}
							disabled={isLoading || isPaymentInitiated}
							isLoading={isLoading}
							className="flex-1 max-[500px]:order-1 w-full"
						/>
					</div>
				}
				onSubmit={handleSubmit}
			>
				<div className="grid grid-cols-[max-content_max-content] items-center gap-3">
					<WalletIcon className="size-12" />

					<div>
						<p className="font-semibold">{bankInfo?.bank_name || "Unknown"}</p>
						<span className="text-xs text-grey mt-0.5 font-medium">
							{bankInfo?.acc_number || "N/A"}
						</span>
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

export function WithdrawFund({ closeModal, bankInfo }: Props) {
	const balance = bankInfo?.balance
		? Number(bankInfo?.balance.replace(/,/g, ""))
		: 0;
	const [withdrawMutation, { isLoading }] = useWithdrawMutation();

	const onSubmit = async (values: any) => {
		let message;

		const data = { amount: String(values.amount) };
		try {
			const res = await withdrawMutation(data);

			if (res?.error) {
				message = (res.error as any)?.error || "An error occured";
				throw new Error(message);
			}

			message = res?.data?.message || "Withdrawal successfully";
			toast.info(message);

			closeModal();
		} catch (error: any) {
			const message = error.message || "An error occured";
			toast.error(message);
		}
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useFormik({
			initialValues: {
				amount: "",
			},
			validationSchema: yup.object().shape({
				amount: yup
					.number()
					.required("Amount is required")
					.test(
						"max-balance",
						"Amount cannot exceed available balance",
						(value) => {
							return value <= balance;
						}
					),
			}),
			onSubmit,
		});

	return (
		<div className="relative">
			<FormWrapper
				onSubmit={handleSubmit}
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
							type="submit"
							disabled={isLoading}
							isLoading={isLoading}
							title={isLoading ? "Submitting..." : "Withdraw"}
							className="flex-1 max-[500px]:order-1 w-full"
						/>
					</div>
				}
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
						Current Wallet balance: ₦{bankInfo?.balance || 0}
					</p>
				</div>
			</FormWrapper>
		</div>
	);
}
