import { image_404 } from "@/constants/icons";

function NotFound() {
	return (
		<div className="h-svh grid place-items-center overflow-hidden w-full relative">
			<div className="flex-column gap-6 items-center px-3">
				<div className="w-full h-[320px] relative">
					<img src={image_404} alt="" className="object-contain size-full" />
				</div>

				<div className="flex-column gap-4 items-center">
					<h2>Page Not Found</h2>

					<p className="text-center text-lg italic px-1">
						The link was a dream, A shadow of what once was— <br />
						Now, nothing remains.
					</p>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
