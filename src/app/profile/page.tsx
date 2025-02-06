import SectionWrapper from "@/layouts/SectionWrapper";
import ProfileInfo from "./ProfileInfo";
import Balance, { Transactions } from "./Balance";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import {
	useGetAllTransactionsQuery,
	useGetBankDetailsQuery,
	useGetProfileDetailsQuery,
} from "@/server/actions/profile";

function Profile() {
	const { data: profileInfo, isLoading } = useGetProfileDetailsQuery({});
	const { data: bankInfo } = useGetBankDetailsQuery({});
	const { data: transactions } = useGetAllTransactionsQuery({});

	console.log("BANK DATA", bankInfo, transactions);

	return (
		<SectionWrapper>
			{isLoading ? (
				<div className="loader">
					<FallbackLoader loading />
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-[4%] card max-w-7xl mx-auto">
					<div className="col-span-1">
						<Balance profileInfo={profileInfo}>
							<Transactions data={transactions} />
						</Balance>
					</div>

					<div className="col-span-1">
						<ProfileInfo profileInfo={profileInfo} bankInfo={bankInfo} />
					</div>
				</div>
			)}
		</SectionWrapper>
	);
}

export default Profile;
