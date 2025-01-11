import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import GoogleAuth from "../_sections/GoogleAuth";
import Button from "@/components/reuseables/CustomButton";
import { Envelope, Lock } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { SignUpSchema } from "@/schema/validation";
import { useFormik } from "formik";
import { InferType } from "yup";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';


function SignUp() {
  const { handleRegister, isLoadingAuth } = useAuth();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const onSubmit = async (values: InferType<typeof SignUpSchema>) => {
    try {
       if (!executeRecaptcha) {
         toast.info('reCAPTCHA is not ready. Please try again.')
        return;
      }

      // Trigger reCAPTCHA
      const recaptchaToken = await executeRecaptcha('signup');
      
      const data = {
        name: values.fullname,
        email: values.email,
        password: values.password,
        recaptcha: recaptchaToken,
      };
      
      console.log('reCAPTCHA Token:', recaptchaToken, data);
      await handleRegister(data);
    } catch {
      // toast.info('Something went wrong.')
    }

  };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        fullname: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      validationSchema: SignUpSchema,
      onSubmit,
    });

  return (
    
    <>
      <div className="flex-column items-center gap-0.5">
        <h2 className="text-2xl md:text-3xl text-center">Sign Up For Free</h2>
        <p className="whitespace-normal mx-auto text-center tracking-wide text-foreground-100 min-[500px]:w-max">
          Already have an account?{" "}
          <Link to="/signin" className="text-foreground-variant font-semibold">
            Sign in
          </Link>
        </p>
      </div>

      <div className="pt-3">
        <form onSubmit={handleSubmit} className="flex-column flex-1 gap-6">
          <div className="flex-column gap-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="fullname"
              label="Full Name"
              field={{
                value: values.fullname,
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              tag="auth"
              inputStyles="h-11"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="email"
              label="Email address"
              field={{
                value: values.email,
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

            <div className="flex-column gap-2">
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
                inputStyles="h-11"
              />

              <div className="flex-column gap-2 ml-1">
                <div className="row-flex-btwn gap-2">
                  <p className="text-xs text-foreground-100">Password strength:</p>
                  <p className="text-xs font-medium">
                    {(() => {
                      const password = values.password;
                      if (!password) return "";

                      const hasLower = /[a-z]/.test(password);
                      const hasUpper = /[A-Z]/.test(password);
                      const hasNumber = /\d/.test(password);
                      const hasSpecial = /[\W_]/.test(password);
                      const isLongEnough = password.length >= 8;

                      const strength = [
                        hasLower,
                        hasUpper,
                        hasNumber,
                        hasSpecial,
                        isLongEnough,
                      ].filter(Boolean).length;

                      switch (strength) {
                        case 0:
                        case 1:
                          return <span className="text-red-500">Very Weak</span>;
                        case 2:
                          return <span className="text-orange-500">Weak</span>;
                        case 3:
                          return <span className="text-yellow-500">Fair</span>;
                        case 4:
                          return <span className="text-blue-500">Good</span>;
                        case 5:
                          return <span className="text-green-500">Strong</span>;
                        default:
                          return "";
                      }
                    })()}
                  </p>
                </div>

                <div className="flex gap-1 h-1">
                  {[1, 2, 3, 4].map((index) => {
                    const password = values.password;
                    const hasLower = /[a-z]/.test(password);
                    const hasUpper = /[A-Z]/.test(password);
                    const hasNumber = /\d/.test(password);
                    const hasSpecial = /[\W_]/.test(password);
                    const isLongEnough = password.length >= 8;

                    const strength = [
                      hasLower,
                      hasUpper,
                      hasNumber,
                      hasSpecial,
                      isLongEnough,
                    ].filter(Boolean).length;

                    let bgColor = "bg-border-200";
                    if (strength >= index) {
                      bgColor =
                        strength === 1
                          ? "bg-red-500 shadow-sm rounded-full"
                          : strength === 2
                          ? "bg-orange-500 shadow-sm rounded-full"
                          : strength === 3
                          ? "bg-yellow-500 shadow-sm rounded-full"
                          : strength === 4
                          ? "bg-blue-500 shadow-sm rounded-full"
                          : "bg-green-500 shadow-sm rounded-full";
                    }

                    return (
                      <div
                        key={index}
                        className={`flex-1 rounded-full transition-colors ${bgColor}`}
                      />
                    );
                  })}
                </div>

                <ul className="text-xs space-y-1 text-foreground-100 mt-1">
                  <li className={`${/[a-z]/.test(values.password) ? "text-green-500" : ""}`}>
                    • One lowercase character
                  </li>
                  <li className={`${/[A-Z]/.test(values.password) ? "text-green-500" : ""}`}>
                    • One uppercase character
                  </li>
                  <li className={`${/\d/.test(values.password) ? "text-green-500" : ""}`}>
                    • One number
                  </li>
                  <li className={`${/[\W_]/.test(values.password) ? "text-green-500" : ""}`}>
                    • One special character
                  </li>
                  <li className={`${values.password.length >= 8 ? "text-green-500" : ""}`}>
                    • 8 characters minimum
                  </li>
                </ul>
              </div>
            </div>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="confirm_password"
              label="Confirm Password"
              field={{
                value: values.confirm_password,
                type: "password",
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              iconSrc={Lock}
              touched={touched}
              tag="auth"
              inputStyles="h-11"
            />
          </div>

          <Button
            type="submit"
            title={isSubmitting ? "Signing up..." : "Sign up"}
            className={cn("!mt-auto !w-full")}
            // disabled={isLoadingAuth || !captchaValue}
            disabled={isLoadingAuth}
            isLoading={isLoadingAuth}
          />
        </form>

        {/* {recaptchaKey && (
          <div className="recaptcha-container mt-4 w-full">
            <ReCAPTCHA ref={recaptchaRef} sitekey={recaptchaKey} onChange={handleCaptchaChange} />
          </div>
        )} */}


        <GoogleAuth />

        <p className="leading-4 text-xs text-center mt-3 tracking-wide text-foreground-100">
          By continuing you agree to the{" "}
          <Link to="/policy" className="text-foreground-variant font-semibold">
            Policy and Rules
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;

