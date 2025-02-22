import SectionWrapper from "@/layouts/SectionWrapper";
import ProfileInfo from "./ProfileInfo";
import Balance, { Transactions } from "./Balance";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import {
	useGetAllBanksQuery,
	useGetAllTransactionsQuery,
	useGetProfileDetailsQuery,
} from "@/server/actions/profile";
import { useMemo } from "react";

function Profile() {
	const { data: profileInfo, isFetching } = useGetProfileDetailsQuery({});
	const { data: transactions } = useGetAllTransactionsQuery({});
	const { data: allBanks } = useGetAllBanksQuery({});

	const bankInfo = useMemo(() => profileInfo?.bank_info, [profileInfo]);
	// console.log("BANK", bankInfo, profileInfo, "IS FETCHING", isFetching);

	return (
		<SectionWrapper>
			{isFetching ? (
				<div className="loader">
					<FallbackLoader loading />
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-[4%] card max-w-7xl mx-auto">
					<div className="col-span-1">
						<Balance
							bankInfo={bankInfo}
							balance={profileInfo?.wallet?.balance || 0}
						>
							<Transactions data={transactions} />
						</Balance>
					</div>

					<div className="col-span-1">
						<ProfileInfo
							profileInfo={profileInfo}
							bankInfo={bankInfo}
							allBanks={allBanks}
						/>
					</div>
				</div>
			)}
		</SectionWrapper>
	);
}

export default Profile;
