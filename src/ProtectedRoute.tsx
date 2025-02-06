import { PropsWithChildren, useLayoutEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { routes } from "./constants";
import { useLocation, useNavigate } from "react-router-dom";
import FallbackLoader from "./components/fallback/FallbackLoader";

function ProtectedRoute({ children }: PropsWithChildren) {
	const { user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [isAuthorized, setIsAuthorized] = useState(false);

	useLayoutEffect(() => {
		// If user is null (not authenticated) or undefined (still loading)
		if (!user) {
			setIsAuthorized(false);

			// Only redirect if we're sure user is null (not authenticated)
			if (user === null) {
				navigate(routes.LOGIN, {
					replace: true,
					state: { returnTo: location.pathname },
				});
			}
			return;
		}

		// User is authenticated
		setIsAuthorized(true);

		// //  OTP verification
		// if (!user.isVerified) {
		// 	navigate(routes.VERIFY_OTP, { replace: true });
		// 	return;
		// }
	}, [navigate, user, location]);

	// Show loader while checking authentication or when user is undefined
	if (!isAuthorized) {
		return <FallbackLoader />;
	}

	return <>{children}</>;
}

export default ProtectedRoute;
