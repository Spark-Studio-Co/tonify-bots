import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { Input } from "@/shared/ui/input/input";
import { Button } from "@/shared/ui/button/button";
import { useLoginUser } from "@/entities/auth/hooks/mutations/use-login.mutation";
import { useNavigate } from "react-router-dom";
import WebApp from "@twa-dev/sdk";

export default function LoginBlock() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useLoginUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pin) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    setError("");

    login(
      {
        telegramUsername: WebApp!.initDataUnsafe!.user!.username || "",
        pin,
      },
      {
        onSuccess: (data) => {
          localStorage.setItem("accessToken", data.accessToken);
          navigate("/home");
        },
        onError: (err: any) => {
          console.error("Login error:", err);
          setError("Ошибка входа. Проверьте данные и попробуйте снова." + err );
        },
      }
    );

  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white text-gray-900">
      <div className="w-full max-w-md mx-auto">
        <div className="rounded-2xl p-8 bg-[--color-main-light] shadow-lg shadow-[rgba(98,127,254,0.1)]">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[--color-main] shadow-md shadow-[rgba(98,127,254,0.3)] flex items-center justify-center mb-4">
              <LockKeyhole size={28} color="#627ffe" />
            </div>
            <h2 className="text-center text-2xl font-bold mb-2 text-[--color-dark]">
              Вход в аккаунт
            </h2>
            <p className="text-center text-sm max-w-xs text-[--color-dark] opacity-70">
              Введите ваш пинкод для входа в систему
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <Input
                id="pin"
                type="password"
                label="Пинкод"
                placeholder="Введите ваш пинкод"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className={`bg-white border-2 h-14 px-4 transition-all duration-200 ${
                  pin
                    ? "border-[rgba(98,127,254,0.3)] shadow-[0_2px_8px_rgba(98,127,254,0.15)] -translate-y-0.5"
                    : "border-opacity-30"
                } focus:border-[--color-main]`}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="flex flex-col items-center gap-4">
              <Button
                type="submit"
                variant="primary"
                text={isLoading ? "Входим..." : "Войти"}
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
