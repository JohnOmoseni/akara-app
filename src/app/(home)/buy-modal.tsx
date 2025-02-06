import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import Button from "@/components/reuseables/CustomButton";
import { WalletIcon } from "@/constants/icons";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as yup from "yup";

type Props = {
	closeModal: () => void;
	setOpenModal: (
		value: React.SetStateAction<false | "confirm" | "pay" | "success">
	) => void;
	offering?: any;
};

export function BuyOffering({ closeModal, setOpenModal, offering }: Props) {
	// @ts-ignore
	const price_per_unit = offering?.price_per_unit;
	const balance = offering?.price_per_unit || 100;
	// @ts-ignore
	const onSubmit = async (values: any, actions: any) => {
		try {
			setOpenModal("confirm");
		} catch (error: any) {
			const message = error?.response?.data?.message;

			toast.error(message || "Something went wrong");
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
					.typeError("Amount is required")
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
				btnStyles=""
				containerStyles="max-w-full !mt-0"
				footerSection={
					<div className="flex-column min-[500px]:row-flex gap-x-4 gap-y-2">
						<Button
							title="Cancel"
							type="button"
							variant="outline"
							onClick={closeModal}
							className="flex-1 max-[500px]:order-2 w-full"
						/>
						<Button
							title="Pay"
							type="submit"
							className="flex-1 max-[500px]:order-1 w-full"
						/>
					</div>
				}
				onSubmit={handleSubmit}
			>
				<div className="flex-column gap-6">
					<div className="grid grid-cols-[max-content_1fr] items-center gap-2">
						<WalletIcon className="size-12" />
						<p className="font-semibold text-base">Wallet</p>
					</div>

					<div>
						<CustomFormField
							fieldType={FormFieldType.INPUT}
							name="amount"
							label="₦1,245 / Unit"
							labelStyles="font-medium opacity-80 ml-1"
							onBlur={handleBlur}
							errors={errors}
							touched={touched}
							onChange={handleChange}
							field={{
								// value: `₦${values.amount}`,
								value: values.amount,
								type: "number",
							}}
						/>

						<p className="text-xs text-grey ml-1 mt-1">
							River Niger Apartment, Yaba
						</p>
					</div>
				</div>
			</FormWrapper>
		</div>
	);
}
