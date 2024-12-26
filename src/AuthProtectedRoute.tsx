import { PropsWithChildren, useLayoutEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import FallbackLoader from "./components/fallback/FallbackLoader";

function AuthProtectedRoute({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (user && pathname === "/signin") {
      // Redirect to dashboard page if already logged in
      navigate("/", { replace: true });
      return;
    }
  }, [navigate, user]);

  if (user === undefined) return <FallbackLoader />;

  return children;
}

export default AuthProtectedRoute;
