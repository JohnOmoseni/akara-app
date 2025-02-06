import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		// Scroll to top with smooth behavior
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [pathname]);

	return null;
}

export default ScrollToTop;
