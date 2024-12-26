import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { routes } from "@/constants";
import { authApi } from "@/server/actions/auth";
import { APP_ROLES, User } from "@/types";
import { NavigateFunction } from "react-router-dom";
import { Alert } from "@/constants/icons";
import { useCallback } from "react";
import { RegisterUserParams } from "@/types/api.types";
import { API_DOMAIN, axiosBaseUrl } from "@/server/axios";

type AuthContextType = {
  user?: User | null;
  token?: string | null;
  role?: (typeof APP_ROLES)[keyof typeof APP_ROLES] | string | null;
  handleLogin: (email: string, password: string, returnTo?: string) => Promise<void>;
  handleRegister: (data: RegisterUserParams) => Promise<void>;
  handleVerifyOtp: (otp: number, email: string) => Promise<void>;
  handleResendOtp: (email: string) => Promise<void>;
  handleForgotPassword: (email: string) => Promise<void>;
  handleResetPassword: (email: string, password: string, otp: string) => Promise<void>;
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

export default function AuthProvider({ children, navigate, ...props }: AuthProviderType) {
  const [user, setUser] = useState<User | null>();
  const [token, setToken] = useState<string | null>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [role, setRole] = useState<(typeof APP_ROLES)[keyof typeof APP_ROLES] | string | null>();

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
      console.log("RUNNING - [GOOGLE AUTH USER]", user);

      setToken(token);
      setUser(currentUser);
      setIsAuthenticated(true);
      setRole(currentUser.role);

      if (!currentUser.otpVerified && !window.location.search.includes("sso")) {
        navigate("/verify-otp");
      } else if (window.location.pathname === "/verify-otp") {
        navigate("/");
      }
    } catch (error) {
      const storedUser = sessionStorage.getItem("currentUser");
      const storedToken = sessionStorage.getItem("skymeasures-token");

      if (storedUser && storedToken) {
        const currentUser = JSON.parse(storedUser);
        setToken(JSON.parse(storedToken));
        setUser(currentUser);
        setIsAuthenticated(true);
        setRole(currentUser.role);
      } else {
        setToken(null);
        setUser(null);
        setRole(null);
        setIsAuthenticated(false);
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authApi.getAuthUser();

        if (!res?.status) throw new Error(res?.message || "Error getting authenticated user");

        const { user, token: authToken } = res.data;
        const currentUser = setUserSession(user, authToken);

        console.log("[AUTH USER]", res);

        if (!currentUser.otpVerified && !window.location.search.includes("sso")) {
          navigate("/verify-otp");
        } else if (window.location.pathname === "/verify-otp") {
          navigate("/");
        }
      } catch (error) {
        const storedUser = sessionStorage.getItem("currentUser");
        const token = sessionStorage.getItem("skymeasures-token");

        if (storedUser && token) {
          const currentUser = JSON.parse(storedUser || "{}");
          setToken(JSON.parse(token || '"'));
          setUser(currentUser);
          setIsAuthenticated(true);
          setRole(currentUser.role);
        } else {
          setToken(null);
          setUser(null);
          setRole(null);
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
        phone: user.phone,
        alt_phone: user.alt_phone,
        status: user.status,
        image: user.profile_picture,
        otpVerified: ssoAuth || Boolean(user.email_verified_at),
        role: user.role === "admin" ? "ADMIN" : "USER",
      };

      setToken(authToken);
      setUser(currentUser);
      setRole(currentUser.role);
      setIsAuthenticated(true);

      sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
      sessionStorage.setItem("skymeasures-token", JSON.stringify(authToken));

      return currentUser;
    },
    [setToken, setUser, setRole]
  );

  const handleLogin = async (email: string, password: string, returnTo?: string) => {
    if (!email || !password) return;
    setIsLoadingAuth(true);

    try {
      const res = await authApi.login({ email, password });

      if (!res?.status) throw new Error(res?.message || "Error Signing in");
      const authToken = res?.data?.token;
      const user = res?.data?.user;

      if (user) setUserSession(user, authToken);

      if (!user?.is_verified) {
        navigate("/verify-otp");
        toast.success(res?.message || "Login successful. Please verify OTP.");
      } else {
        toast.success(res?.message || "Login successful.");
        returnTo && navigate(returnTo || "/", { replace: true });
      }
    } catch (error: any) {
      // null - request made and it failed
      const errorMessage = error?.response?.data?.message || error?.message;
      let message = "Error signing in";

      if (errorMessage?.includes("These credentials do not match our records")) {
        message = errorMessage;
      } else if (errorMessage?.includes("Bad Credentials")) {
        message = "Incorrect password";
      }

      setToken(null);
      setUser(null);
      setRole(null);
      toast.error(
        <div className="row-flex-start gap-2">
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

      if (!res?.status) throw new Error(res?.message || "User Registration failed");

      toast.success("User Registration Successfully...");

      navigate("/signin");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage || "Failed to register user. Please try again.");
      throw new Error(errorMessage || "Failed to register user.");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleVerifyOtp = async (otp: number, email: string) => {
    if (!otp || !email) return;
    setIsLoadingAuth(true);

    try {
      const res = await authApi.verifyOtp({ otp, email });

      if (!res?.status) throw new Error(res?.message || "OTP verification failed");

      const updatedUser = {
        ...(user as User),
        otpVerified: true,
      };

      sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast.success("OTP verified successfully. Redirecting to Homepage...");

      navigate("/");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage || "Failed to verify OTP. Please try again.");
      throw new Error(errorMessage || "Failed to verify OTP.");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleResendOtp = async (email: string) => {
    if (!email) return;

    try {
      const res = await authApi.resendOtp();

      if (!res?.status) throw new Error(res?.message || "Failed to resend OTP");
      toast.success("OTP resent successfully");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;

      toast.error(errorMessage || "Failed to resend OTP");
    }
  };

  const handleForgotPassword = async (email: string) => {
    if (!email) return;
    setIsLoadingAuth(true);

    try {
      const res = await authApi.forgotPassword({ email });

      if (!res?.status) throw new Error(res?.message || "Error sending reset OTP");

      toast.success(res?.message || "Password reset OTP has been sent successfully");
      navigate("/change-password");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;

      toast.error(errorMessage || "Error sending reset OTP");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleResetPassword = async (email: string, password: string, otp: string) => {
    if (!email || !password || !otp) return;
    setIsLoadingAuth(true);

    try {
      const res = await authApi.resetPassword({ email, password, otp });

      if (!res?.status) throw new Error(res?.message || "Failed to reset password");

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
    try {
      await authApi.logout();
      setToken(null);
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("skymeasures-token");

      toast.success("Logged out successfully");
      navigate(routes.LOGIN);
    } catch {
      toast.error(
        <div className="row-flex-start gap-2">
          <Alert className="size-5 text-red-500 self-start" />
          <div className="flex-column gap-0.5">
            <h3>Something went wrong</h3> <p className="">Failed to log out</p>
          </div>
        </div>
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
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
