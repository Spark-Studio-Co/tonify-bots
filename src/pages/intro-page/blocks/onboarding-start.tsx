import { Button } from "@/shared/ui/button/button";
import Orb from "@/shared/ui/orb/orb";
import SplitText from "@/shared/ui/split-text/split-text";
import { useNavigate } from "react-router-dom";

export const OnboardingStart = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-[450px]">
        <Orb
          hoverIntensity={0.1}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>
      <SplitText
        onLetterAnimationComplete={() => console.log("finished")}
        text="TONIFY ADS"
        className="text-dark text-[40px] font-bold"
      />
      <p className="text-center text-base mt-2">
        Закрытые Telegram-каналы — это аудитория без лишнего шума и конкуренции.
        Мы подбираем топовые площадки.
      </p>
      <Button
        text="Продолжить"
        onClick={() => navigate("/onboarding")}
        className="mt-[161px]"
      />
    </>
  );
};
