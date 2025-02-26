import { Route, Routes } from "react-router-dom";
import SignIn from "./app/(auth)/signin/page";
import SignUp from "./app/(auth)/signup/page";
import VerifyOTP from "./app/(auth)/verify/page";
import ForgotPassword from "./app/(auth)/forgotpassword/page";
import VerifyPasswordPin from "./app/(auth)/forgotpassword/verify-pin";
import ResetPassword from "./app/(auth)/forgotpassword/reset-password";

import LayoutProvider from "./providers/LayoutProvider";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

import ProtectedRoute from "./ProtectedRoute";
import AuthProtectedRoute from "./AuthProtectedRoute";
import ErrorBoundary from "./components/fallback/Error";
import NotFound from "./layouts/NotFound";

import Home from "./app/(home)/page";
import Notifications from "./app/notifications/page";
import Profile from "./app/profile/page";
import AllTransactions from "./app/transactions/page";
import TermsOfUse from "./app/termsOfUse/page";
// import TermsOfUse from "./app/termsOfUse/page";

const AppRouter = () => {
	return (
		<>
			<ErrorBoundary>
				<Routes>
					<Route element={<LayoutProvider />}>
						<Route path="*" element={<NotFound />} />
						<Route path="/terms-of-use" element={<TermsOfUse />} />

						<Route
							element={
								<AuthProtectedRoute>
									<AuthLayout />
								</AuthProtectedRoute>
							}
						>
							<Route path="/signin" element={<SignIn />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/verify-otp" element={<VerifyOTP />} />
							<Route path="/recover-password" element={<ForgotPassword />} />
							<Route
								path="/verify-password-pin"
								element={<VerifyPasswordPin />}
							/>
							<Route path="/reset-password" element={<ResetPassword />} />
						</Route>

						<Route
							element={
								<ProtectedRoute>
									<DashboardLayout />
								</ProtectedRoute>
							}
						>
							<Route index element={<Home />} />
							<Route path="/notifications" element={<Notifications />} />
							<Route path="/all-transactions" element={<AllTransactions />} />
							<Route path="/profile" element={<Profile />} />
						</Route>
					</Route>
				</Routes>
			</ErrorBoundary>
		</>
	);
};

export default AppRouter;
