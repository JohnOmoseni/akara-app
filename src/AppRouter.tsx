import { Route, Routes, Outlet } from "react-router-dom";
import SignIn from "./app/(auth)/signin/page";
import SignUp from "./app/(auth)/signup/page";
import VerifyOTP from "./app/(auth)/verify/page";
import ForgotPassword from "./app/(auth)/forgot-password/page";

import LayoutProvider from "./providers/LayoutProvider";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

import ProtectedRoute from "./ProtectedRoute";
import AuthProtectedRoute from "./AuthProtectedRoute";
import ErrorBoundary from "./components/fallback/Error";
import NotFound from "./layouts/NotFound";

import PrivacyPolicy from "./app/policy/page";
import Home from "./app/(home)/page";
import Notifications from "./app/notifications/page";
import Profile from "./app/profile/page";

const AppRouter = () => {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route element={<LayoutProvider />}>
            <Route path="*" element={<NotFound />} />

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
            </Route>

            <Route element={<DashboardLayout />}>
              <Route path="/policy" element={<PrivacyPolicy />} />

              <Route
                element={
                  <ProtectedRoute>
                    <Outlet />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Home />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default AppRouter;
