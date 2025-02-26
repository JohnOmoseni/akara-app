import { termsOfUse } from "@/constants/data";
import Header from "@/layouts/Header";

function TermsOfUse() {
	return (
		<>
			<Header headerTitle=" " />

			<div className="bg-gradient-hero min-h-[35vh] max-h-[250px]  grid place-items-center px-6 py-6 sm:py-4 text-foreground-variant">
				<h1 className="text-white text-center max-w-[30ch]">
					Terms Of Service{" "}
				</h1>
			</div>

			<main className="w-full py-8 max-[380px]:px-3.5 px-4 sm:pt-12 sm:px-[5%] sm:pb-[4rem]">
				<div className="flex-column gap-6">
					{termsOfUse[0]?.introduction &&
					typeof termsOfUse[0]?.introduction === "string" ? (
						(termsOfUse[0]?.introduction as any)
							?.split("\n")
							.map((line: any, index: any) =>
								line.trim() !== "" ? (
									<p
										key={index}
										className="leading-6 text-base font-light pr-1"
									>
										{line}
									</p>
								) : (
									<br key={index} />
								)
							)
					) : (
						<p className="leading-6 text-base font-light pr-1">
							{termsOfUse[0]?.introduction}
						</p>
					)}

					<div className="flex-column gap-6 mt-4">
						{termsOfUse.slice(1).map((paragraph: any, idx: number) => {
							return (
								<div key={idx} className="flex-column gap-5">
									<h3 className="font-bold">{paragraph?.label}</h3>

									<div className="pr-2 leading-6 text-base font-light">
										{paragraph?.body}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</main>
		</>
	);
}

export default TermsOfUse;
