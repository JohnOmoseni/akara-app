import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/reuseables/CustomButton";

function VerifyPasswordPin() {
	const { handleVerifyPasswordPin, isLoadingAuth } = useAuth();
	const [pinValue, setPinValue] = useState("");
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();
	const location = useLocation();
	const user_email = location?.state?.email;

	const handleVerifySubmit = useCallback(async () => {
		if (!user_email || !pinValue) return;
		setError(null);

		try {
			await handleVerifyPasswordPin(Number(pinValue), user_email);
		} catch (error: any) {
			if (error.includes("Invalid or expired PIN")) setError(error);
		}
	}, [handleVerifyPasswordPin, pinValue, user_email]);

	return (
		<>
			<div className="flex-column gap-1">
				<h2 className="text-2xl md:text-3xl">Verify your pin</h2>
				<p className="leading-5 tracking-wide text-foreground-100 w-full">
					Enter the 4-digit OTP code sent to{" "}
					<span className="text-foreground-variant inline-block font-medium">
						{user_email || (
							<span className="font-medium tracking-wide">---</span>
						)}
					</span>{" "}
					to verify your pin
				</p>
			</div>

			<div className="pt-3 pb-5">
				<div className="flex-column gap-3">
					<InputOTP
						maxLength={4}
						value={pinValue}
						onChange={(value) => setPinValue(value)}
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
						</InputOTPGroup>
					</InputOTP>

					{error && (
						<p className="font-semibold tracking-wide text-sm text-red-500">
							{error}
						</p>
					)}
				</div>
			</div>

			<div className="flex-column gap-2">
				<Button
					type="submit"
					title={isLoadingAuth ? "Verifing..." : "Verify"}
					className={cn("mt-auto w-full")}
					disabled={isLoadingAuth || pinValue.length !== 4}
					onClick={handleVerifySubmit}
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
		</>
	);
}

export default VerifyPasswordPin;
