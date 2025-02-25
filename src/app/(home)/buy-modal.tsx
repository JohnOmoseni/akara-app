import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import Button from "@/components/reuseables/CustomButton";
import { WalletIcon } from "@/constants/icons";
import { convertToNumber } from "@/lib";
import { useGetProfileDetailsQuery } from "@/server/actions/profile";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useMemo } from "react";
import * as yup from "yup";

type Props = {
	closeModal: () => void;
	setOpenModal: (
		value: React.SetStateAction<false | "confirm" | "pay" | "success" | "error">
	) => void;
	offering: ProcessedOffering;
	setActiveOffering: Dispatch<SetStateAction<ActiveOffering | null>>;
};

export function BuyOffering({
	closeModal,
	setOpenModal,
	setActiveOffering,
	offering,
}: Props) {
	const { data: profileInfo } = useGetProfileDetailsQuery({});

	const balance = useMemo(
		() =>
			profileInfo?.wallet?.balance
				? Number(profileInfo?.wallet?.balance.replace(/,/g, ""))
				: 0,
		[profileInfo]
	);

	const price_per_unit = offering?.asideInfo.find(
		(item) => item?.tag === "price_per_unit"
	)?.value;

	const formatted_price_per_unit = parseInt(
		price_per_unit.replace(/,/g, ""),
		10
	).toLocaleString();

	const onSubmit = async (values: any) => {
		setActiveOffering({
			...offering,
			number_of_units: values.number_of_units,
			total_amount_worth:
				values.number_of_units * convertToNumber(formatted_price_per_unit),
		});
		setOpenModal("confirm");
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useFormik({
			initialValues: {
				number_of_units: "",
			},
			validationSchema: yup.object().shape({
				number_of_units: yup
					.number()
					.required("Number of Units is required")
					.typeError("Number of Units must be a number")
					.test(
						"max-balance",
						"Amount cannot exceed available balance",
						(value) => {
							return (
								value * convertToNumber(formatted_price_per_unit) <= balance
							);
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
							name="number_of_units"
							label={`${
								price_per_unit ? `₦${formatted_price_per_unit} / Unit` : ""
							}`}
							labelStyles="opacity-80"
							onBlur={handleBlur}
							errors={errors}
							touched={touched}
							onChange={handleChange}
							field={{
								value: values.number_of_units,
								placeholder: "Enter Number of Units",
								type: "number",
							}}
						/>

						<p className="text-xs text-grey ml-px mt-1.5">{offering?.area}</p>
					</div>
				</div>
			</FormWrapper>
		</div>
	);
}
