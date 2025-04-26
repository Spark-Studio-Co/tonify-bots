"use client"

import { Button } from "@/shared/ui/button/button"
import { LockKeyhole } from "lucide-react"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import WebApp from "@twa-dev/sdk"
import { useNavigate } from "react-router-dom"
import { useSetPin } from "@/entities/auth/api/post/set-pin.ts"

export default function SetPinBlock() {
  const navigate = useNavigate()
  const [pin, setPin] = useState<string[]>(Array(5).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const { mutate: setPinMutation, isPending } = useSetPin()

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 5)
    setTimeout(() => {
      inputRefs.current[0]?.focus()
    }, 100)
  }, [])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newPin = [...pin]
    newPin[index] = value.slice(-1)
    setPin(newPin)
    if (value && index < 4) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) inputRefs.current[index - 1]?.focus()

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
    const pasted = e.clipboardData.getData("text/plain").trim()
    if (!/^\d+$/.test(pasted)) return
    const digits = pasted.split("").slice(0, 5)
    const newPin = [...pin]
    digits.forEach((digit, idx) => {
      if (idx < 5) newPin[idx] = digit
    })
    setPin(newPin)
    const nextIndex = newPin.findIndex((val) => !val)
    if (nextIndex !== -1) inputRefs.current[nextIndex]?.focus()
    else inputRefs.current[4]?.focus()
  }

  const handleSubmit = () => {
    const fullPin = pin.join("")
    if (fullPin.length === 5) {
      setPinMutation(
        {
          pin: fullPin,
          telegramUsername: WebApp.initDataUnsafe?.user?.username ?? "",
        },
        {
          onSuccess: () => {
            navigate("/login")
          },
          onError: () => {
            alert("❌ Не удалось сохранить PIN. Попробуйте позже.")
          },
        },
      )
    }
  }

  const isComplete = pin.every((digit) => digit !== "")

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl p-8 shadow-lg bg-[--color-main-light]">
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
          <h2 className="text-center text-2xl font-bold mb-2 text-[--color-dark]">Создайте PIN-код</h2>
          <p className="text-center text-sm max-w-xs text-[--color-dark] opacity-70">
            Придумайте 5-значный PIN для входа. Его нужно будет вводить при каждом запуске.
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={pin[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-14 h-14 sm:w-16 sm:h-16 text-center text-xl font-bold rounded-lg border-2 transition-all duration-200 focus:outline-none"
                style={{
                  backgroundColor: pin[index] ? "white" : "var(--color-main-light, #eff3fc)",
                  borderColor: pin[index] ? "var(--color-main, #627ffe)" : "rgba(98, 127, 254, 0.3)",
                  color: "var(--color-dark, #121826)",
                  boxShadow: pin[index] ? "0 2px 8px rgba(98, 127, 254, 0.15)" : "none",
                  transform: pin[index] ? "translateY(-2px)" : "none",
                }}
              />
            ))}
        </div>

        <div className="flex justify-center">
          <Button
            text={isPending ? "Сохраняем..." : "Сохранить PIN"}
            onClick={handleSubmit}
            disabled={!isComplete || isPending}
          />
        </div>
      </div>
    </div>
  )
}
