import logo from "@/assets/tonify.svg";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="Tonify" />
      <span className="text-main text-[21px] font-bold">Tonify</span>
    </div>
  );
};
