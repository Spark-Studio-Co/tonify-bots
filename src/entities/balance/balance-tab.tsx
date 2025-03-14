import TonifyLogo from "@/shared/icons/tonify";

export const BalanceTab = () => {
  return (
    <div className="bg-[#DAE2FC] rounded-full py-[8px] px-3 flex items-center justify-center gap-2">
      <span className="text-main text-[18px] font-bold">100.00</span>{" "}
      <TonifyLogo />
    </div>
  );
};
