import { ArrowBack } from "@/constants/icons";
import { useNavigate } from "react-router-dom";

function BackArrow({
	onHandleGoBack,
}: {
	onHandleGoBack?: (() => void) | null;
}) {
	const navigate = useNavigate();

	return (
		<div
			className="badge"
			onClick={() => (onHandleGoBack ? onHandleGoBack() : navigate(-1))}
		>
			<ArrowBack className="icon size-4" />
			<p className="mt-0.5 text-sm font-medium capitalize transition">Back</p>
		</div>
	);
}

export default BackArrow;
