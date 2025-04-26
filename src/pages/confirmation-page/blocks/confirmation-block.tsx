"use client"

import { useVerifyCode } from "@/entities/auth/hooks/mutations/use-verify-auth.mutation"
import { Button } from "@/shared/ui/button/button"
import { LockKeyhole, RefreshCw } from "lucide-react"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ConfirmationCodeBlock() {
  const navigate = useNavigate()
  const [code, setCode] = useState<string[]>(Array(5).fill(""))
  const [timeLeft, setTimeLeft] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { mutate } = useVerifyCode()

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 5)

    // Start countdown timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    // Focus first input on mount
    setTimeout(() => {
      inputRefs.current[0]?.focus()
    }, 100)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    // Take only the last character if multiple are pasted
    newCode[index] = value.slice(-1)
    setCode(newCode)

    // If value is entered and not the last box, move to next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // If backspace is pressed and current input is empty, move to previous input
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // Arrow key navigation
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault()
      inputRefs.current[index - 1]?.focus()
    }

    if (e.key === "ArrowRight" && index < 4) {
      e.preventDefault()
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // If pasted data is a number and has the right length
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split("").slice(0, 5)
      const newCode = [...code]

      digits.forEach((digit, index) => {
        if (index < 5) {
          newCode[index] = digit
        }
      })

      setCode(newCode)

      // Focus the next empty input or the last one if all filled
      const nextEmptyIndex = newCode.findIndex((val) => !val)
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus()
      } else {
        inputRefs.current[4]?.focus()
      }
    }
  }

  const handleResendCode = () => {
    if (timeLeft > 0) return

    setIsResending(true)
    // Simulate API call to resend code
    setTimeout(() => {
      setTimeLeft(60)
      setIsResending(false)
      setCode(Array(5).fill(""))
      inputRefs.current[0]?.focus()
    }, 1500)
  }

  const handleVerify = () => {
    const fullCode = code.join("")
    if (fullCode.length === 5) {
      mutate(
        {
          chatId: localStorage.getItem("chatId") || "", // или откуда ты получаешь chatId
          code: fullCode,
        },
        {
          onSuccess: () => {
            navigate("/home")
          },
          onError: (err: any) => {
            console.error("❌ Verification error:", err)
            alert("Неверный код. Попробуйте снова.")
          },
        },
      )
    }
  }

  const isCodeComplete = code.every((digit) => digit !== "")

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="rounded-2xl p-8 shadow-lg"
        style={{
          backgroundColor: "var(--color-main-light, #eff3fc)",
          boxShadow: "0 10px 25px rgba(98, 127, 254, 0.1)",
        }}
      >
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{
              backgroundColor: "var(--color-main, #627ffe)",
              boxShadow: "0 4px 10px rgba(98, 127, 254, 0.3)",
            }}
          >
            <LockKeyhole size={28} color="white" />
          </div>
          <h2 className="text-center text-2xl font-bold mb-2" style={{ color: "var(--color-dark, #121826)" }}>
            Подтверждение
          </h2>
          <p className="text-center text-sm max-w-xs" style={{ color: "var(--color-dark, #121826)", opacity: 0.7 }}>
            Мы отправили код подтверждения на ваш номер телефона. Пожалуйста, введите его ниже.
          </p>
        </div>
        <div className="flex justify-center gap-3 mb-8">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="relative">
                <input
                  ref={(el: any) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={code[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-14 h-14 sm:w-16 sm:h-16 text-center text-xl font-bold rounded-lg focus:outline-none transition-all duration-200"
                  style={{
                    backgroundColor: code[index] ? "white" : "var(--color-main-light, #eff3fc)",
                    border: `2px solid ${code[index] ? "var(--color-main, #627ffe)" : "rgba(98, 127, 254, 0.3)"}`,
                    color: "var(--color-dark, #121826)",
                    boxShadow: code[index] ? "0 2px 8px rgba(98, 127, 254, 0.15)" : "none",
                    transform: code[index] ? "translateY(-2px)" : "none",
                  }}
                  aria-label={`Digit ${index + 1} of confirmation code`}
                />
                {index < 4 && (
                  <div
                    className="hidden sm:block absolute top-1/2 -right-2 w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: "var(--color-main, #627ffe)",
                      opacity: 0.5,
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
              </div>
            ))}
        </div>
        <div className="flex flex-col items-center gap-4">
          <Button text="Подтвердить" onClick={handleVerify} disabled={!isCodeComplete} />
          <div className="flex items-center mt-2">
            <button
              onClick={handleResendCode}
              disabled={timeLeft > 0 || isResending}
              className="flex items-center text-sm font-medium transition-all duration-200"
              style={{
                color: timeLeft > 0 ? "rgba(18, 24, 38, 0.5)" : "var(--color-main, #627ffe)",
                cursor: timeLeft > 0 ? "default" : "pointer",
              }}
            >
              {isResending ? (
                <RefreshCw size={14} className="mr-2 animate-spin" />
              ) : (
                <RefreshCw size={14} className="mr-2" />
              )}
              {timeLeft > 0 ? `Отправить повторно через ${timeLeft}с` : "Отправить код повторно"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
