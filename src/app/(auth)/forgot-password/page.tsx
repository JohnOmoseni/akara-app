import { Envelope } from "@/constants/icons";
import { useFormik } from "formik";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "@/components/reuseables/CustomButton";
import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import * as yup from "yup";

type FormValues = {
	email: string;
};

function ForgotPassword() {
	const { isLoadingAuth, handleForgotPassword } = useAuth();
	const navigate = useNavigate();

	const onSubmit = async (values: FormValues) => {
		await handleForgotPassword(values.email);
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
			email: "",
		},
		validationSchema: yup.object().shape({
			email: yup
				.string()
				.email("Invalid email address")
				.required("Email is required"),
		}),
		onSubmit,
	});

	return (
		<>
			<div className="flex-column gap-1">
				<h2 className="text-2xl md:text-3xl">Reset your password</h2>
				<p className="leading-5 mt-1 tracking-wide text-foreground-100 w-full">
					Forgot your password? Enter your email and the reset link will be sent
					to your email
				</p>
			</div>

			<div className="pt-2">
				<form onSubmit={handleSubmit} className="flex-column flex-1 gap-8">
					<div className="flex-column gap-5">
						<CustomFormField
							fieldType={FormFieldType.INPUT}
							name="email"
							label="Email address"
							field={{
								value: values.email,
								placeholder: "",
								type: "email",
							}}
							onChange={handleChange}
							onBlur={handleBlur}
							errors={errors}
							iconSrc={Envelope}
							touched={touched}
							tag="auth"
							inputStyles="h-11"
						/>
					</div>

					<div className="flex-column gap-3">
						<Button
							type="submit"
							title={isSubmitting ? "Submitting..." : "Reset Password"}
							className="w-full"
							disabled={isLoadingAuth}
							isLoading={isLoadingAuth}
						/>
						<Button
							type="button"
							title="Back to Login"
							variant="outline"
							className="w-full"
							onClick={() => navigate("/signin")}
						/>
					</div>
				</form>
			</div>
		</>
	);
}

export default ForgotPassword;
