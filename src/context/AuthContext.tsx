import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import { toast } from "sonner";
import { authApi } from "@/server/actions/auth";
import { User } from "@/types";
import { NavigateFunction } from "react-router-dom";
import { Alert } from "@/constants/icons";
import { useCallback } from "react";
import { API_DOMAIN, axiosBaseUrl } from "@/server/axios";
import { resolve } from "node:path/posix";

type AuthContextType = {
	user?: User | null;
	token?: string | null;
	handleLogin: (
		email: string,
		password: string,
		remember?: boolean,
		returnTo?: string
	) => Promise<void>;
	handleRegister: (data: RegisterUserParams) => Promise<void>;
	handleVerifyOtp: (otp: number, email: string) => Promise<void>;
	handleResendOtp: (email: string) => Promise<void>;
	handleForgotPassword: (email: string) => Promise<void>;
	handleResetPassword: (
		email: string,
		password: string,
		otp: string
	) => Promise<void>;
	handleLogout: () => Promise<void>;
	handleGoogleLogin: () => void;
	fetchGoogleAuthUser: (token: string) => Promise<void>;
	isAuthenticated?: boolean;
	isLoadingAuth?: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderType = PropsWithChildren & {
	navigate: NavigateFunction;
};

export default function AuthProvider({
	children,
	navigate,
	...props
}: AuthProviderType) {
	const [user, setUser] = useState<User | null>();
	const [token, setToken] = useState<string | null>();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoadingAuth, setIsLoadingAuth] = useState(false);

	const fetchGoogleAuthUser = async (token: string) => {
		try {
			const res = await axiosBaseUrl.get("/user", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!res?.data) throw new Error("Error getting authenticated user");

			const user = res.data?.data;
			const currentUser = setUserSession(user, token, true);

			setToken(token);
			setUser(currentUser);
			setIsAuthenticated(true);

			if (!currentUser.isVerified && !window.location.search.includes("sso")) {
				navigate("/verify-otp");
			} else if (window.location.pathname === "/verify-otp") {
				navigate("/");
			}
		} catch (error) {
			const storedUser = sessionStorage.getItem("akara-currentUser");
			const storedToken = sessionStorage.getItem("akara-token");

			if (storedUser && storedToken) {
				const currentUser = JSON.parse(storedUser);
				setToken(JSON.parse(storedToken));
				setUser(currentUser);
				setIsAuthenticated(true);
			} else {
				setToken(null);
				setUser(null);
				setIsAuthenticated(false);
			}
		}
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await authApi.getAuthUser();

				if (!res?.status)
					throw new Error(res?.message || "Error getting authenticated user");

				const { user, token: authToken } = res.data;
				const currentUser = setUserSession(user, authToken);

				if (
					!currentUser.isVerified &&
					!window.location.search.includes("sso")
				) {
					navigate("/verify-otp");
				} else if (window.location.pathname === "/verify-otp") {
					navigate("/");
				}
			} catch (error) {
				const storedUser = sessionStorage.getItem("akara-currentUser");
				const token = sessionStorage.getItem("akara-token");

				if (storedUser && token) {
					const currentUser = JSON.parse(storedUser);
					setToken(JSON.parse(token));
					setUser(currentUser);
					setIsAuthenticated(true);
				} else {
					setToken(null);
					setUser(null);
					setIsAuthenticated(false);
				}
			}
		};
		fetchUser();
	}, []);

	const setUserSession = useCallback(
		(user: any, authToken: string, ssoAuth?: boolean) => {
			const currentUser = {
				userId: user.id,
				name: user.name,
				email: user.email,
				isVerified: ssoAuth || Boolean(user.email_verified_at),
			};

			setToken(authToken);
			setUser(currentUser);
			setIsAuthenticated(true);

			sessionStorage.setItem("akara-currentUser", JSON.stringify(currentUser));
			sessionStorage.setItem("akara-token", JSON.stringify(authToken));

			return currentUser;
		},
		[setToken, setUser]
	);

	const handleLogin = async (
		email: string,
		password: string,
		remember?: boolean,
		returnTo?: string
	) => {
		if (!email || !password) return;
		setIsLoadingAuth(true);

		try {
			const res = await authApi.login({ email, password, remember });

			if (!res.user) throw new Error(res?.message);

			const authToken = res?.token;
			const user = res?.user;

			if (user) setUserSession(user, authToken);
			navigate(returnTo || "/", { replace: true });
		} catch (error: any) {
			// null - request made and it failed
			const errorMessage = error?.response?.data?.error;
			let message = "Something went wrong";

			if (
				errorMessage?.includes(
					"Email not verified. Please verify your email before logging in."
				)
			) {
				navigate("/verify-otp", { state: { email: email, resendOtp: true } });
			} else if (
				errorMessage?.includes(
					"Invalid credentials. Please check your email and password"
				)
			) {
				message = " ";
			}

			setToken(null);
			setUser(null);
			toast.error(
				<div className="grid grid-cols-[max-content_1fr] items-center gap-2">
					<Alert className="size-5 text-red-500 self-start" />
					<div className="flex-column gap-0.5">
						<h3>{errorMessage || message}</h3> <p className="">{message}</p>
					</div>
				</div>
			);
		} finally {
			setIsLoadingAuth(false);
		}
	};

	const handleGoogleLogin = () => {
		try {
			// Redirect the user to the Google login endpoint
			window.location.href = `${API_DOMAIN}/login-with-google`;
		} catch (error: any) {
			const errorMessage = error?.message || error?.response?.data?.message;
			toast.error(errorMessage || "Something went wrong. Please try again.");
		}
	};

	const handleRegister = async (data: RegisterUserParams) => {
		setIsLoadingAuth(true);

		try {
			const res = await authApi.register(data);

			if (!res?.user)
				throw new Error(res?.message || "User Registration failed");

			const message = res?.message;
			toast.success(message || "Registration successful!");
			navigate("/verify-otp", { state: { email: res?.user?.email } });
		} catch (error: any) {
			const errorMessage = error?.message;
			toast.error(errorMessage || "Registration failed. Please try again.");
		} finally {
			setIsLoadingAuth(false);
		}
	};

	const handleVerifyOtp = async (otp: number, email: string) => {
		if (!otp || !email) return;
		setIsLoadingAuth(true);

		try {
			const res = await authApi.verifyOtp({ otp, email });
			const status = res?.status;

			if (status !== 200)
				throw new Error(res?.error?.message || "OTP verification failed");

			const message = res?.data?.message || "OTP verified successfully.";
			toast.success(message);
			navigate("/signin");
		} catch (error: any) {
			const errorMessage =
				error?.message || "Failed to verify OTP. Please try again.";
			toast.error(errorMessage || "");
		} finally {
			setIsLoadingAuth(false);
		}
	};

	const handleResendOtp = async (email: string) => {
		if (!email) return;

		try {
			const res = await authApi.resendOtp({ email });
			const message = res?.messsage;

			toast.success(message || "OTP resent successfully");
		} catch (error: any) {
			const errorMessage = error?.message || "Failed to resend OTP";
			toast.error(errorMessage);
		}
	};

	const handleForgotPassword = async (email: string) => {
		if (!email) return;
		setIsLoadingAuth(true);

		try {
			const res = await authApi.forgotPassword({ email });

			if (!res?.status)
				throw new Error(res?.message || "Error sending reset OTP");

			toast.success(
				res?.message || "Password reset OTP has been sent successfully"
			);
			navigate("/change-password");
		} catch (error: any) {
			const errorMessage = error?.response?.data?.message;

			toast.error(errorMessage || "Error sending reset OTP");
		} finally {
			setIsLoadingAuth(false);
		}
	};

	const handleResetPassword = async (
		email: string,
		password: string,
		otp: string
	) => {
		if (!email || !password || !otp) return;
		setIsLoadingAuth(true);

		try {
			const res = await authApi.resetPassword({ email, password, otp });

			if (!res?.status)
				throw new Error(res?.message || "Failed to reset password");

			toast.success("Password reset successful");
			navigate("/change-password/success");
		} catch (error: any) {
			const errorMessage = error?.response?.data?.message;

			toast.error(errorMessage || "Failed to reset password");
		} finally {
			setIsLoadingAuth(false);
		}
	};

	const handleLogout = async () => {
		setIsLoadingAuth(true);
		try {
			await authApi.logout();

			setToken(null);
			setUser(null);
			setIsAuthenticated(false);
			sessionStorage.removeItem("akara-currentUser");
			sessionStorage.removeItem("akara-token");

			toast.success("Logged out successfully");
			navigate("/signin");
		} catch {
			toast.error(
				<div className="row-flex-start gap-2">
					<Alert className="size-5 text-red-500 self-start" />
					<div className="flex-column gap-0.5">
						<h3>Something went wrong</h3> <p className="">Failed to log out</p>
					</div>
				</div>
			);
		} finally {
			setIsLoadingAuth(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				isAuthenticated,
				isLoadingAuth,
				handleLogin,
				handleLogout,
				handleVerifyOtp,
				handleResendOtp,
				handleForgotPassword,
				handleResetPassword,
				handleRegister,
				handleGoogleLogin,
				fetchGoogleAuthUser,
			}}
			{...props}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}
