import { Google } from "@/constants/icons";
import { useAuth } from "@/context/AuthContext";

function GoogleAuth() {
	const { handleGoogleLogin, isLoadingAuth } = useAuth();

	const handleClick = async () => {
		handleGoogleLogin();
	};

	return (
		<div className="w-11/12 mx-auto mt-9">
			<div
				onClick={handleClick}
				className="p-3 cursor-pointer text-sm row-flex gap-3 border border-border rounded-lg shadow-sm leading-4"
			>
				{isLoadingAuth ? (
					"Loading..."
				) : (
					<>
						<Google className="size-4" />
						Continue with Google
					</>
				)}
			</div>
		</div>
	);
}

export default GoogleAuth;

// https://api.akara.ng/auth/google/callback?state=5Yp2KDLrvHIiewIoeOy8P9kJn5Nl5YBOnRPF3vOd&code=4%2F0ASVgi3J7HX8u3tmyRT2d9J2ATdVxBnQeisJ5Sca7hivDwg8HpKk3sL8QIx6Wzn2wX5Q8lA&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=1&prompt=consent
// {
// "message": "Login successful",
// "token": "35|tZL3Ht3iEFtuK2rSaqM15FJZ5tnmfixd4T6UxFID8fbb20c7",
// "user": {
// "id": 188,
// "name": "Johnny",
// "email": "ojaywilliams100@gmail.com",
// "avatar": null,
// "email_verified_at": "2025-02-23 11:41:12",
// "created_at": "2025-02-04 04:10:01",
// "updated_at": "2025-02-23 11:41:12"
// }
// }
