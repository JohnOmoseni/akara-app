import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import { Lock } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { PasswordSchema } from "@/schema/validation";
import { useFormik } from "formik";
import { InferType } from "yup";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/reuseables/CustomButton";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
	const { isLoadingAuth, handleResetPassword } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const user_email = location.state?.email;

	const onSubmit = async (values: InferType<typeof PasswordSchema>) => {
		await handleResetPassword(
			values.email,
			values.password,
			values.confirm_password
		);
	};

	const {
		values,
		errors,
		touched,
		isSubmitting,
		handleBlur,
		handleChange,
		handleSubmit,
	} = useFormik({
		initialValues: {
			email: user_email || "",
			password: "",
			confirm_password: "",
		},
		validationSchema: PasswordSchema,
		onSubmit,
	});

	return (
		<>
			<div className="flex-column gap-1">
				<h2 className="text-2xl md:text-3xl">Reset Password</h2>
				<p className="leading-5 mt-1 tracking-wide text-foreground-100 w-full">
					Create a new password for your account. Make sure it’s strong and
					secure.
				</p>
			</div>

			<div className="pt-4">
				<form onSubmit={handleSubmit} className="flex-column flex-1 gap-9">
					<div className="flex-column gap-5">
						<CustomFormField
							fieldType={FormFieldType.INPUT}
							name="email"
							label="Enter Email"
							field={{
								value: values.email,
								type: "email",
								disabled: !!user_email,
							}}
							onChange={handleChange}
							onBlur={handleBlur}
							errors={errors}
							iconSrc={Lock}
							touched={touched}
						/>

						<CustomFormField
							fieldType={FormFieldType.INPUT}
							name="password"
							label="New Password"
							field={{
								value: values.password,
								type: "password",
							}}
							onChange={handleChange}
							onBlur={handleBlur}
							errors={errors}
							iconSrc={Lock}
							touched={touched}
						/>

						<CustomFormField
							fieldType={FormFieldType.INPUT}
							name="confirm_password"
							label="Confirm New Password"
							field={{
								value: values.confirm_password,
								type: "password",
							}}
							onChange={handleChange}
							onBlur={handleBlur}
							errors={errors}
							iconSrc={Lock}
							touched={touched}
						/>
					</div>

					<div className="flex-column gap-2">
						<Button
							type="submit"
							title={isSubmitting ? "Updating..." : "Update"}
							className={cn("!mt-auto !w-full !py-5")}
							disabled={isLoadingAuth}
							isLoading={isLoadingAuth}
						/>

						<Button
							type="button"
							title="Back"
							variant="outline"
							className="w-full"
							onClick={() => navigate(-1)}
						/>
					</div>
				</form>
			</div>
		</>
	);
}

export default ResetPassword;
