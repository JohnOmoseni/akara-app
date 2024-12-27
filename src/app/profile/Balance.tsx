import Button from "@/components/reuseables/CustomButton";
import { Modal } from "@/components/ui/components/Modal";
import { EyeOff, WalletIcon } from "@/constants/icons";
import { useState } from "react";
import { FundWallet, WithdrawFund } from "./balance-modal";

type Props = {};

function Balance({}: Props) {
  const [openModal, setOpenModal] = useState<false | "fund" | "withdraw">(false);
  return (
    <>
      <div className="flex-column gap-8 sm:gap-10">
        <div className="relative py-8 sm:py-10 pb-8 px-4 sm:px-6 bg-secondary isolate h-[min(350px,_40vh)] rounded-lg shadow-sm overflow-hidden">
          <div className="flex-column gap-3 text-foreground-variant-foreground h-full w-[90%] min-[500px]:w-[70%]">
            <h3 className="font-semibold text-base">Available Balance</h3>

            <h1 className="text-3xl md:text-4xl font-semibold grid grid-cols-[max-content_max-content] items-center gap-2 leading-none">
              ₦2,000,000
              <EyeOff className="size-5 cursor-pointer" />
            </h1>

            <div className="row-flex-btwn gap-6 mt-auto">
              <Button
                title="Fund"
                onClick={() => setOpenModal("fund")}
                className="bg-white text-foreground-variant min-w-[100px] md:min-w-[130px]"
              />
              <Button
                title="Withdraw"
                onClick={() => setOpenModal("withdraw")}
                className="bg-white text-foreground-variant min-w-[100px] md:min-w-[130px]"
              />
            </div>
          </div>

          <div className="absolute inset-0 bg-black/30 pointer-events-none -z-10" />

          <WalletIcon className="absolute -top-2 -right-3 max-[400px]:size-52 size-60 -z-10" />
        </div>

        <Transactions />
      </div>

      <>
        {openModal && (
          <Modal
            openModal={openModal === "fund"}
            isTopContent={<div />}
            setOpenModal={() => setOpenModal(false)}
          >
            <FundWallet closeModal={() => setOpenModal(false)} />
          </Modal>
        )}

        {openModal && (
          <Modal
            openModal={openModal === "withdraw"}
            isTopContent={<div />}
            setOpenModal={() => setOpenModal(false)}
          >
            <WithdrawFund closeModal={() => setOpenModal(false)} />
          </Modal>
        )}
      </>
    </>
  );
}

export default Balance;

const Transactions = () => {
  return (
    <div className="flex-column gap-2">
      <h3 className="font-semibold">Transaction History</h3>

      <ul className="flex-column gap-5 card">
        {Array.from({ length: 4 }).map((_, idx) => {
          return (
            <li key={idx} className="grid grid-cols-[max-content_1fr] gap-2">
              <div></div>

              <div className="flex-column gap-1 w-full">
                <p className="text-sm break-all">
                  ₦2,000,000 credited into your wallet via fund wallet
                </p>

                <p className="text-xs  text-grey row-flex-start gap-2 tracking-wide">
                  <span>03:40pm - 23 Sept, 2024</span>
                  <span className="size-2 bg-grey-100 rounded-full clip-circle" />
                  <span>10.25 AM</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <Button
        title="Download transaction history"
        variant="outline"
        className="text-foreground-variant border-none sm:mt-4 ml-4 w-max"
      />
    </div>
  );
};
