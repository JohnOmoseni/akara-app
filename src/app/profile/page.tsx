import SectionWrapper from "@/layouts/SectionWrapper";
import ProfileInfo from "./ProfileInfo";
import Balance from "./Balance";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import {
	useGetAllBanksQuery,
	useGetAllTransactionsQuery,
	useGetProfileDetailsQuery,
} from "@/server/actions/profile";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useVerifyTransactionQuery } from "@/server/actions/transactions";
import { Modal } from "@/components/ui/components/Modal";
import { formatNumber } from "@/lib";
import StatusModal from "../_sections/status-modal";
import Transactions from "./Transactions";

function Profile() {
	const [openStatusModal, setStatusOpenModal] = useState<
		false | "withdraw-success" | "fund-success"
	>(false);
	const [currentTxn, setCurrentTxn] = useState<CurrentTxnParams>(null);

	const {
		data: profileInfo,
		isLoading: isLoadingProfile,
		refetch: refetchProfile,
	} = useGetProfileDetailsQuery({});
	const { data: transactions, isLoading: isFetchingTransactions } =
		useGetAllTransactionsQuery({});
	const { data: allBanks } = useGetAllBanksQuery({});
	const [searchParams, setSearchParams] = useSearchParams();
	const paymentRef = searchParams.get("paymentReference");
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const [bankListError, setBankListError] = useState<{
		message: string;
		isError: boolean;
	}>({ message: "", isError: false });

	const {
		data: verificationData,
		isLoading: isVerifying,
		refetch: verifyTransaction,
	} = useVerifyTransactionQuery(
		{ paymentReference: paymentRef },
		{ skip: !paymentRef } // Skip query if paymentRef is null
	);

	const bankInfo = profileInfo?.bank_info;

	useEffect(() => {
		if (paymentRef) {
			try {
				verifyTransaction(); // Manually trigger verification

				// Clear paymentReference from URL after a short delay
				timeoutRef.current = setTimeout(() => {
					setSearchParams((prev) => {
						const newParams = new URLSearchParams(prev);
						newParams.delete("paymentReference");
						return newParams;
					});
					localStorage.removeItem("currentTxn");
				}, 2000);
			} catch (error: any) {
				console.log("error", error);
			}
		}

		return () => {
			timeoutRef.current && clearTimeout(timeoutRef.current);
		};
	}, [paymentRef, verifyTransaction]);

	useEffect(() => {
		try {
			const txn = JSON.parse(localStorage.getItem("currentTxn") || "null");
			setCurrentTxn(txn);
		} catch {
			setCurrentTxn(null);
		}

		if (verificationData?.status === "PAID") {
			setStatusOpenModal("fund-success");
			// Trigger profile refetch after verification success
			refetchProfile();
		}
	}, [verificationData]);

	useEffect(() => {
		if (allBanks?.error) {
			setBankListError({
				message:
					allBanks?.error || "Failed to fetch list of banks with Monnify",
				isError: true,
			});
		}

		return () => {
			setBankListError({ message: "", isError: false });
		};
	}, [allBanks]);

	const isLoading = isLoadingProfile || (isVerifying && !verificationData);

	if (isLoading) {
		return (
			<SectionWrapper>
				<div className="loader">
					<FallbackLoader loading />
				</div>
			</SectionWrapper>
		);
	}

	return (
		<SectionWrapper>
			<div className="grid grid-cols-1 min-[680px]:grid-cols-2 gap-8 md:gap-[4%] card max-w-7xl mx-auto">
				<div className="col-span-1">
					<Balance
						bankInfo={bankInfo}
						currentTxn={currentTxn}
						refetchProfile={refetchProfile}
						setCurrentTxn={setCurrentTxn}
						setStatusOpenModal={setStatusOpenModal}
						balance={profileInfo?.wallet?.balance || 0}
					>
						<Transactions
							data={transactions}
							isFetchingTransactions={isFetchingTransactions}
						/>
					</Balance>
				</div>

				<div className="col-span-1">
					<ProfileInfo
						profileInfo={profileInfo}
						bankInfo={bankInfo}
						allBanks={allBanks}
						bankListError={bankListError}
					/>
				</div>
			</div>

			{openStatusModal && (
				<Modal
					openModal={openStatusModal === "fund-success"}
					isTopContent={<div />}
					setOpenModal={() => setStatusOpenModal(false)}
				>
					<StatusModal
						type={"success"}
						info={
							<span>
								Congrats!!! You have successfully funded your wallet with{" "}
								<span className="font-semibold">
									₦{formatNumber(currentTxn?.amount!)}
								</span>
							</span>
						}
						closeModal={() => setStatusOpenModal(false)}
					/>
				</Modal>
			)}

			{openStatusModal && (
				<Modal
					openModal={openStatusModal === "withdraw-success"}
					isTopContent={<div />}
					setOpenModal={() => setStatusOpenModal(false)}
				>
					<StatusModal
						type={"success"}
						info={
							<span>
								Congrats!!! You have successfully withdrawn the sum of{" "}
								<span className="font-semibold">
									₦{formatNumber(currentTxn?.amount!)}
								</span>{" "}
								from your wallet. The funds should reflect in your registered
								bank within the next 3 days
							</span>
						}
						closeModal={() => setStatusOpenModal(false)}
					/>
				</Modal>
			)}
		</SectionWrapper>
	);
}

export default Profile;
