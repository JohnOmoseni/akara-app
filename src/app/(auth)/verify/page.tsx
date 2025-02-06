import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "@/components/ui/components/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import InfoModal from "../_sections/info-modal";
import Button from "@/components/reuseables/CustomButton";

function VerifyOTP() {
	const { handleVerifyOtp, handleResendOtp, isLoadingAuth } = useAuth();
	const [otpValue, setOtpValue] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [otpState, setOtpState] = useState({
		countdown: 180,
		isResending: false,
		isCountdownActive: false,
	});
	const [openModal, setOpenModal] = useState<false | "success" | "error">(
		false
	);
	const [hasMounted, setHasMounted] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const user_email = location?.state?.email;
	const resendOtp = location?.state?.resendOtp;

	useEffect(() => {
		if (resendOtp && !hasMounted) {
			handleResend();
			setHasMounted(true);
		}

		return () => setHasMounted(false);
	}, [resendOtp]);

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (otpState.isCountdownActive && otpState.countdown > 0) {
			interval = setInterval(() => {
				setOtpState((prev) => ({
					...prev,
					countdown: prev.countdown - 1,
					isCountdownActive: prev.countdown > 1,
				}));
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [otpState.isCountdownActive, otpState.countdown]);

	const handleVerifySubmit = useCallback(async () => {
		if (!user_email) return;
		setError(null);

		await handleVerifyOtp(Number(otpValue), user_email);
	}, [handleVerifyOtp, otpValue, user_email]);

	const handleResend = useCallback(async () => {
		if (otpState.isResending || !user_email) return;
		setError(null);

		setOtpState((prev) => ({ ...prev, isResending: true }));

		try {
			await handleResendOtp(user_email);
			setOtpState({
				countdown: 180,
				isResending: false,
				isCountdownActive: true,
			});
		} catch (error: any) {
			const message =
				error?.message ||
				"Failed to resend verification code. Please try again.";

			setError(message);
			setOtpState((prev) => ({ ...prev, isResending: false }));
		}
	}, [handleResendOtp, otpState.isResending, user_email]);

	return (
		<>
			<div className="flex-column gap-1 relative">
				<h3 className="text-2xl">Verify your email</h3>
				<p className="leading-5 tracking-wide text-foreground-100">
					Enter the 6-digit OTP code sent to{" "}
					<span className="text-foreground-variant inline-block font-medium">
						{user_email || (
							<span className="font-medium tracking-wide">---</span>
						)}
					</span>{" "}
					to verify your email
				</p>
			</div>

			<div className="pt-3 pb-5">
				<div className="flex-column gap-3">
					<InputOTP
						maxLength={6}
						value={otpValue}
						onChange={(value) => setOtpValue(value)}
					>
						<InputOTPGroup className="shad-otp">
							<InputOTPSlot
								className={cn(error && "border-red-400 border-2 ring-0")}
								index={0}
							/>
							<InputOTPSlot
								className={cn(error && "border-red-400 border-2 ring-0")}
								index={1}
							/>
							<InputOTPSlot
								className={cn(error && "border-red-400 border-2 ring-0")}
								index={2}
							/>
							<InputOTPSlot
								className={cn(error && "border-red-400 border-2 ring-0")}
								index={3}
							/>
							<InputOTPSlot
								className={cn(error && "border-red-400 border-2 ring-0")}
								index={4}
							/>
							<InputOTPSlot
								className={cn(error && "border-red-400 border-2 ring-0")}
								index={5}
							/>
						</InputOTPGroup>
					</InputOTP>

					{error && (
						<p className="font-semibold tracking-wide text-base text-red-500">
							Incorrect OTP code
						</p>
					)}
				</div>
			</div>

			<div className="flex-column gap-2">
				<Button
					type="submit"
					title={isLoadingAuth ? "Verifing..." : "Verify"}
					className={cn("mt-auto w-full")}
					disabled={isLoadingAuth || otpValue.length !== 6}
					onClick={handleVerifySubmit}
					isLoading={isLoadingAuth}
				/>

				<Button
					type="button"
					title="Back to Login"
					variant="outline"
					className="w-full"
					onClick={() => navigate("/signin")}
				/>

				<div className="tracking-wide text-xs text-center leading-4 text-foreground-100">
					Didn't receive the code?{" "}
					<span className="">
						{!otpState.isCountdownActive ? (
							<span
								className="text-foreground-variant cursor-pointer"
								onClick={handleResend}
							>
								{otpState.isResending ? "Resending..." : "Resend code"}
							</span>
						) : (
							<span className="leading-5 text-foreground-100 tracking-wide">
								Resend code in:{" "}
								<span className="text-foreground-variant inline-flex">
									{Math.floor(otpState.countdown / 60)
										.toString()
										.padStart(2, "0")}
									:{(otpState.countdown % 60).toString().padStart(2, "0")}
								</span>
							</span>
						)}
					</span>
				</div>
			</div>

			{openModal && (
				<Modal
					openModal={openModal === "success"}
					isTopContent={<div />}
					setOpenModal={() => setOpenModal(false)}
				>
					<InfoModal
						title="Email verified"
						info="Your email has been successfully verified. You can now log in to your account."
						type="success"
						buttonText="Proceed to dashboard"
						onButtonClick={() => setOpenModal(false)}
					/>
				</Modal>
			)}

			{openModal && (
				<Modal
					openModal={openModal === "error"}
					isTopContent={<div />}
					setOpenModal={() => setOpenModal(false)}
				>
					<InfoModal
						title="Invalid OTP"
						info="The OTP you entered is invalid. Please try again or request a new OTP."
						type="error"
						buttonText="Retry again"
						onButtonClick={() => setOpenModal(false)}
					/>
				</Modal>
			)}
		</>
	);
}

export default VerifyOTP;
