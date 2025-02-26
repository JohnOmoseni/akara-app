import { toast } from "sonner";
import { useLayoutEffect, useState } from "react";
import { Envelope, Lock } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { SignInSchema } from "@/schema/validation";
import { useFormik } from "formik";
import { InferType } from "yup";
import { useAuth } from "@/context/AuthContext";
import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import Button from "@/components/reuseables/CustomButton";
import GoogleAuth from "../_sections/GoogleAuth";
import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";

function SignIn() {
	const location = useLocation();
	const navigate = useNavigate();
	const { handleLogin, isLoadingAuth, fetchGoogleAuthUser } = useAuth();
	const [searchParams] = useSearchParams();
	const [hasLoggedInWithGoogle, setHasLoggedInWithGoogle] = useState(false);

	const onSubmit = async (values: InferType<typeof SignInSchema>) => {
		const returnTo = location.state?.returnTo || "/";
		await handleLogin(
			values?.email,
			values?.password,
			values.rememberMe,
			returnTo
		);
	};

	useLayoutEffect(() => {
		const ssoStatus = searchParams.get("status");
		const ssoToken = searchParams.get("token");

		const handleSSOAuth = async () => {
			if (ssoStatus === "success" && ssoToken) {
				try {
					sessionStorage.setItem("akara-token", JSON.stringify(ssoToken));
					await fetchGoogleAuthUser(ssoToken);
					setHasLoggedInWithGoogle(true);

					// Clear the URL parameters after successful authentication
					const returnTo = location.state?.returnTo || "/";
					navigate(returnTo, { replace: true });
				} catch (error) {
					toast.error("Authentication failed! Please try again.");
					sessionStorage.removeItem("akara-token");
				}
			} else if (ssoStatus === "failed") {
				setHasLoggedInWithGoogle(false);
			}
		};

		handleSSOAuth();
	}, [searchParams]);

	const {
		values,
		errors,
		touched,
		isSubmitting,
		setFieldValue,
		handleBlur,
		handleChange,
		handleSubmit,
	} = useFormik({
		initialValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
		validationSchema: SignInSchema,
		onSubmit,
	});

	return (
		<>
			<div className="flex-column items-center gap-0.5">
				<h2 className="text-2xl md:text-3xl">Welcome back!</h2>
				<p className="sm:whitespace-nowrap leading-5 tracking-wide mt-0.5 text-foreground-100">
					Don't have an account?{" "}
					<Link
						to="/signup"
						className="text-foreground-variant font-semibold hover:underline transition"
					>
						Sign up
					</Link>
				</p>
			</div>

			<div className="pt-4">
				<form onSubmit={handleSubmit} className="flex-column flex-1 gap-9">
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
							inputStyles="h-10"
						/>

						<CustomFormField
							fieldType={FormFieldType.INPUT}
							name="password"
							label="Password"
							field={{
								value: values.password,
								type: "password",
							}}
							onChange={handleChange}
							onBlur={handleBlur}
							errors={errors}
							iconSrc={Lock}
							touched={touched}
							tag="auth"
							inputStyles="h-10"
						/>
					</div>

					<Button
						type="submit"
						title={isSubmitting ? "Signing in..." : "Sign in"}
						className={cn("!mt-auto !w-full")}
						disabled={isLoadingAuth || hasLoggedInWithGoogle}
						isLoading={isLoadingAuth}
					/>
				</form>

				<div className="mt-3 row-flex-btwn gap-4 ml-1 text-xs">
					<div className="flex items-center gap-2">
						<Checkbox
							id="remember-me"
							name="rememberMe"
							checked={values.rememberMe}
							onCheckedChange={() =>
								setFieldValue("rememberMe", !values.rememberMe)
							}
						/>
						<label
							htmlFor="remember-me"
							className="text-foreground-100 leading-4"
						>
							Remember me
						</label>
					</div>

					<p className="tracking-wide text-end leading-4 text-foreground-100">
						Forgot Password?{" "}
						<Link
							to="/recover-password"
							className="text-foreground-variant font-semibold"
						>
							Recover
						</Link>
					</p>
				</div>

				<GoogleAuth />

				<p className="leading-4 text-xs text-center mt-3 tracking-wide text-foreground-100">
					By continuing you agree to the{" "}
					<Link
						to="/terms-of-use"
						className="text-foreground-variant font-semibold"
					>
						Policy and Rules
					</Link>
				</p>
			</div>
		</>
	);
}

export default SignIn;
