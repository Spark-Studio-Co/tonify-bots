import onboarding from "@/assets/onboarding_02.svg";
import { Button } from "@/shared/ui/button/button";
import Pagination from "@/shared/ui/pagination/pagination";
import SplitText from "@/shared/ui/split-text/split-text";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "../model/use-onboarding-store";

export const OnboardingSecondBlock = () => {
  const navigate = useNavigate();
  const { setCurrentState } = useOnboardingStore();

  return (
    <>
      <span className="text-dark text-[24px] mb-16  font-bold text-center w-[339px]">
        🎯 Точный таргетинг и высокая вовлеченность
      </span>
      <div className="flex flex-col gap-2">
        <img
          src={onboarding}
          className="w-[371px] h-[290px] m-auto"
          alt="Onboarding"
        />
        <SplitText
          onLetterAnimationComplete={() => console.log("finished")}
          text="Максимальный эффект без лишнего шума"
          className="text-dark text-[24px] mt-3 font-bold"
        />
        <p className="text-center text-base mt-2">
          Закрытые каналы – это вовлеченная аудитория, минимальная конкуренция и
          высокая конверсия.
        </p>
        <Pagination
          currentPage={2}
          totalPages={3}
          onPageChange={() => console.log("lol")}
        />
      </div>
      <Button
        text="Продолжить"
        onClick={() => setCurrentState(3)}
        className="mt-[111px]"
      />
      <Button
        text="Пропустить"
        className="mt-4"
        variant="secondary"
        onClick={() => navigate("/register")}
      />
    </>
  );
};
