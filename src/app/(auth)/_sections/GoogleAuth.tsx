import { Google } from "@/constants/icons";
import { useAuth } from "@/context/AuthContext";

function GoogleAuth() {
	const { handleGoogleLogin } = useAuth();

	const handleClick = async () => {
		handleGoogleLogin();
	};

	return (
		<div className="w-11/12 mx-auto mt-9">
			<div
				onClick={handleClick}
				className="p-3 cursor-pointer text-sm row-flex gap-3 border border-border rounded-lg shadow-sm leading-4"
			>
				<Google className="size-4" />
				Continue with Google
			</div>
		</div>
	);
}

export default GoogleAuth;
