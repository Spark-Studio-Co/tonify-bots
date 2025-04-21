import onboarding from "@/assets/onboarding_03.svg";
import { Button } from "@/shared/ui/button/button";
import Pagination from "@/shared/ui/pagination/pagination";
import SplitText from "@/shared/ui/split-text/split-text";
import { useNavigate } from "react-router-dom";

export const OnboardingThirdBlock = () => {
  const navigate = useNavigate();

  return (
    <>
      <span className="text-dark text-[24px] mb-16  font-bold text-center w-[339px]">
        🚀 Продвижение с высоким доверием
      </span>
      <div className="flex flex-col gap-2">
        <img
          src={onboarding}
          className="w-[371px] h-[290px] m-auto"
          alt="Onboarding"
        />
        <SplitText
          onLetterAnimationComplete={() => console.log("finished")}
          text="Эффективная реклама в закрытых Telegram-каналах"
          className="text-dark text-[24px] mt-3 font-bold"
        />
        <p className="text-center text-base mt-2">
          Реклама в закрытых Telegram-каналах воспринимается как личная
          рекомендация, что значительно повышает отклик аудитории.
        </p>
        <Pagination
          currentPage={3}
          totalPages={3}
          onPageChange={() => console.log("lol")}
        />
      </div>
      <Button
        text="Продолжить"
        onClick={() => navigate("/set-pin")}
        className="mt-[111px]"
      />
      <Button
        text="Пропустить"
        className="mt-4"
        variant="secondary"
        onClick={() => navigate("/set-pin")}
      />
    </>
  );
};
