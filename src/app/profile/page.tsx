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
import StatusModal from "../_sections/status-modal";
import Transactions from "./Transactions";

function Profile() {
	const [openStatusModal, setStatusOpenModal] = useState<
		false | "withdraw-success" | "fund-success"
	>(false);
	const [currentTxn, setCurrentTxn] = useState<CurrentTxnParams>(null);

	const {
		data: profileInfo,
		isFetching: isLoadingProfile,
		refetch: refetchProfile,
	} = useGetProfileDetailsQuery({});
	const { data: transactions } = useGetAllTransactionsQuery({});
	const { data: allBanks } = useGetAllBanksQuery({});
	const [searchParams, setSearchParams] = useSearchParams();
	const paymentRef = searchParams.get("paymentReference");
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-[4%] card max-w-7xl mx-auto">
				<div className="col-span-1">
					<Balance
						bankInfo={bankInfo}
						currentTxn={currentTxn}
						refetchProfile={refetchProfile}
						setCurrentTxn={setCurrentTxn}
						setStatusOpenModal={setStatusOpenModal}
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
								<span className="font-semibold">₦{currentTxn?.amount}</span>
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
								<span className="font-semibold">₦{currentTxn?.amount}</span>{" "}
								from your wallet. The funds should in your registered back
								within the next 3 days
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
