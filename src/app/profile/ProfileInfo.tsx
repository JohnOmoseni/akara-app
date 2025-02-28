import { cn } from "@/lib/utils";
import { Edit, profile_pic } from "@/constants/icons";
import { useMemo, useState } from "react";
import { Modal } from "@/components/ui/components/Modal";
import { EditBank, EditProfile } from "./profile-modal";
import ProfilePic from "./profile-pic";

type Props = {
	profileInfo: any;
	bankInfo: any;
	allBanks: any;
	bankListError: {
		message: string;
		isError: boolean;
	};
};

function ProfileInfo({
	profileInfo,
	bankInfo,
	allBanks,
	bankListError,
}: Props) {
	const [openModal, setOpenModal] = useState<
		false | "edit-profile" | "edit-bank"
	>(false);

	const profile = useMemo(() => {
		return [
			{
				label: "Full name",
				value: profileInfo?.name || "Unknown",
			},
			{
				label: "Email",
				value: profileInfo?.email,
			},
			{
				label: "Phone number",
				value: profileInfo?.phone_number,
			},
		];
	}, [profileInfo]);

	const bankInfoData = useMemo(() => {
		return [
			{
				label: "Bank name",
				value: bankInfo?.bank_name,
			},
			{
				label: "Account number",
				value: bankInfo?.acc_number,
			},
			{
				label: "Account Name",
				value: bankInfo?.acc_name,
			},
		];
	}, [bankInfo]);

	return (
		<>
			<div className="grid grid-cols-1 gap-10">
				{/* PERSONAL INFORMATION */}
				<div className="">
					<h3 className="font-semibold">Personal Information</h3>

					<div className="mt-6 mb-5 grid place-items-center">
						<ProfilePic image={profileInfo?.avatar || profile_pic} />
					</div>

					<div className="sm:px-1.5">
						<ul className="flex-column gap-4">
							{profile?.map((info, idx) => (
								<li
									key={idx}
									className="row-flex-btwn group w-full gap-4 text-foreground-100"
								>
									<p className="font-semibold leading-6">{info?.label}</p>
									<p
										className={cn(
											"font-light flex-1 min-w-[10ch] max-[380px]:max-w-[15ch] break-words text-end"
										)}
									>
										{info?.value || <span className="italic text-xs">N/A</span>}
									</p>
								</li>
							))}
						</ul>

						<p
							className="w-max text-sm row-flex-start gap-2 mt-6 text-foreground-variant font-semibold cursor-pointer"
							onClick={() => setOpenModal("edit-profile")}
						>
							<Edit className="size-5" />
							<span className="font-semibold">Edit Profile Info</span>
						</p>
					</div>
				</div>

				{/* BANK INFORMATION */}
				<div className="">
					<h3 className="font-semibold">Bank Information</h3>

					<div className="sm:px-1.5">
						<ul className="flex-column gap-4 mt-6">
							{bankInfoData?.map((bank, idx) => (
								<li
									key={idx}
									className="row-flex-btwn group w-full gap-4 text-foreground-100"
								>
									<p className="font-semibold capitalize">{bank?.label}</p>

									<p className="flex-1 font-light min-w-[10ch] max-[380px]:max-w-[15ch] break-words text-end">
										{bank.value || <span className="italic text-xs">N/A</span>}
									</p>
								</li>
							))}
						</ul>

						<p
							className="w-max text-sm row-flex-start gap-2 mt-6 mb-4 text-foreground-variant font-semibold cursor-pointer"
							onClick={() => setOpenModal("edit-bank")}
						>
							<Edit className="size-5" />
							<span className="font-semibold">Edit Bank Info</span>
						</p>
					</div>
				</div>
			</div>

			{openModal && (
				<Modal
					openModal={openModal === "edit-profile"}
					isTopContent={<div />}
					setOpenModal={() => setOpenModal(false)}
				>
					<EditProfile
						profileInfo={profileInfo}
						closeModal={() => setOpenModal(false)}
					/>
				</Modal>
			)}

			{openModal && (
				<Modal
					openModal={openModal === "edit-bank"}
					isTopContent={<div />}
					modalStyles="min-h-[380px]"
					setOpenModal={() => setOpenModal(false)}
				>
					<div className="relative h-[330px]">
						<EditBank
							bankInfo={bankInfo}
							closeModal={() => setOpenModal(false)}
							allBanks={allBanks}
							bankListError={bankListError}
						/>
					</div>
				</Modal>
			)}
		</>
	);
}

export default ProfileInfo;
