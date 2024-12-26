import { cn } from "@/lib/utils";

import { Edit, profile_pic } from "@/constants/icons";
import { useState } from "react";
import { Modal } from "@/components/ui/components/Modal";
import { EditBank, EditProfile } from "./profile-modal";
import ProfilePic from "./profile-pic";

type ProfileInfoProps = {
  profileInfo?: any;
};

function ProfileInfo({ profileInfo }: ProfileInfoProps) {
  const [openModal, setOpenModal] = useState<false | "edit-profile" | "edit-bank">(false);
  const profile = [
    {
      label: "Full name",
      value: profileInfo?.fullName || "John Omoseni",
    },
    {
      label: "Email",
      value: profileInfo?.emailAddress,
    },
    {
      label: "Phone number",
      value: profileInfo?.phoneNumber,
    },
  ];

  const bankInfo = [
    {
      label: "Bank name",
      value: profileInfo?.bankName,
    },
    {
      label: "Account number",
      value: profileInfo?.accountNumber,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-10">
        {/* PERSONAL INFORMATION */}
        <div className="">
          <h3 className="font-semibold">Personal Information</h3>

          <div className="mt-6 mb-5 grid place-items-center">
            <ProfilePic image={profileInfo?.profilePicture || profile_pic} />
          </div>

          <div className="sm:px-1.5">
            <ul className="flex-column gap-4">
              {profile?.map((info, idx) => (
                <li key={idx} className="row-flex-btwn group w-full gap-4 text-foreground-100">
                  <p className="font-semibold">{info?.label}</p>
                  <p
                    className={cn(
                      "font-light flex-1 min-w-[10ch] max-[380px]:max-w-[15ch] break-words text-end"
                    )}
                  >
                    {info?.value || <span className="italic text-xs">unknown</span>}
                  </p>
                </li>
              ))}
            </ul>

            <p
              className="text-sm row-flex-start gap-2 mt-6 text-foreground-variant font-semibold cursor-pointer"
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
              {bankInfo?.map((bank, idx) => (
                <li key={idx} className="row-flex-btwn group w-full gap-4 text-foreground-100">
                  <p className="font-semibold">{bank?.label}</p>

                  <p className="flex-1 font-light min-w-[10ch] max-[380px]:max-w-[15ch] break-words text-end">
                    {bank.value || <span className="italic text-xs">N/A</span>}
                  </p>
                </li>
              ))}
            </ul>

            <p
              className="text-sm row-flex-start gap-2 mt-6 text-foreground-variant font-semibold cursor-pointer"
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
          <EditProfile closeModal={() => setOpenModal(false)} />
        </Modal>
      )}

      {openModal && (
        <Modal
          openModal={openModal === "edit-bank"}
          isTopContent={<div />}
          setOpenModal={() => setOpenModal(false)}
        >
          <EditBank closeModal={() => setOpenModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default ProfileInfo;
