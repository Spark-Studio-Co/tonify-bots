import onboarding from "@/assets/onboarding_01.svg";
import { Button } from "@/shared/ui/button/button";
import Pagination from "@/shared/ui/pagination/pagination";
import SplitText from "@/shared/ui/split-text/split-text";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "../model/use-onboarding-store";

export const OnboardingFirstBlock = () => {
  const navigate = useNavigate();
  const { setCurrentState } = useOnboardingStore();

  return (
    <>
      <span className="text-dark text-[24px] mb-16  font-bold text-center w-[283px]">
        Реклама в закрытых Telegram-каналах 🚀
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
          Закрытые Telegram-каналы — это аудитория без лишнего шума и
          конкуренции. Мы подбираем топовые площадки.
        </p>
        <Pagination
          currentPage={1}
          totalPages={3}
          onPageChange={() => console.log("lol")}
        />
      </div>
      <Button
        text="Продолжить"
        onClick={() => setCurrentState(2)}
        className="mt-[111px]"
      />
      <Button
        text="Пропустить"
        className="mt-4"
        variant="secondary"
        onClick={() => navigate("/login")}
      />
    </>
  );
};
