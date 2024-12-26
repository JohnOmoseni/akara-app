import { PropsWithChildren, useLayoutEffect } from "react";
import { useAuth } from "./context/AuthContext";
// @ts-ignore
import { routes } from "./constants";
import { useLocation, useNavigate } from "react-router-dom";
import FallbackLoader from "./components/fallback/FallbackLoader";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const navigate = useNavigate();
  // @ts-ignore
  const location = useLocation();

  useLayoutEffect(() => {
    // if (user === null) {
    //   // Redirect to login page
    //   navigate(routes.LOGIN, { replace: true, state: { returnTo: location.pathname } });
    //   return;
    // }
    // if (user?.otpVerified === false) {
    //   navigate(routes.VERIFY_OTP, { replace: true });
    //   return;
    // }
  }, [navigate, user]);

  if (user === undefined) return <FallbackLoader />;

  return children;
}

export default ProtectedRoute;
