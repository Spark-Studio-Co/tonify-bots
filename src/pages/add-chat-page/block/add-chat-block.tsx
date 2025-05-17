"use client";

import type React from "react";

import { useState } from "react";
import { useToast } from "@/shared/layouts/toast-provider";
import { useCreateChat } from "@/entities/chat/hooks/mutations/use-create-chat.mutation";
import { useTelegram } from "@/shared/layouts/telegram-provider";
import { ChatHeader } from "./chat-header";
import { ChatForm } from "./chat-form";
import { LinkExamples } from "./link-examples";
import { SubmitButton } from "./submit-button";
import { ChatInfoBox } from "./chat-info-header";
import { SuccessPopup } from "./success-popup";

export default function AddChatBlock() {
  const [chatLink, setChatLink] = useState("");
  const [chatName, setChatName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successChatName, setSuccessChatName] = useState("");
  const { addToast } = useToast();
  const { user } = useTelegram();

  const { mutate: createChat, isPending } = useCreateChat();

  const handleChangeChatLink = (value: string) => {
    setChatLink(value);
    if (error) setError("");
  };

  const handleChangeChatName = (value: string) => {
    setChatName(value);
    if (error) setError("");
  };

  const handleTogglePrivate = () => {
    setIsPrivate((prevState) => !prevState);
    // Show toast for debugging
    addToast({
      title: "Настройка приватности",
      description: `Чат отмечен как ${!isPrivate ? "приватный" : "публичный"}`,
      type: "info",
      duration: 2000,
    });
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!chatName.trim() || !chatLink.trim()) {
      setError("Пожалуйста, заполните оба поля.");
      addToast({
        title: "Ошибка валидации",
        description: "Пожалуйста, заполните оба поля.",
        type: "error",
      });
      return;
    }

    const payload = {
      name: chatName.trim(),
      link: chatLink.trim(),
      status: "active",
      isPrivate: isPrivate,
      imageUrl: "/default-chat.png",
      telegramUsername: user?.username || String(user?.id || ""),
    };

    console.log("Submitting payload:", payload);

    createChat(payload, {
      onSuccess: () => {
        // Save the chat name for the success popup
        setSuccessChatName(chatName);

        // Show toast notification
        addToast({
          title: "Успешно!",
          description: `Чат "${chatName}" добавлен как ${
            isPrivate ? "приватный" : "публичный"
          }`,
          type: "success",
        });

        // Show success popup
        setShowSuccessPopup(true);

        // Reset form
        setChatName("");
        setChatLink("");
        setIsPrivate(false);
      },
      onError: (error) => {
        if (error.message?.includes("Ссылка на чат")) {
          setError(error.message);
        }
      },
    });
  };

  return (
    <div className="min-h-screen w-full pb-16">
      <div className="w-full">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <ChatHeader />
          <ChatInfoBox />
          <ChatForm
            chatName={chatName}
            chatLink={chatLink}
            isPrivate={isPrivate}
            error={error}
            onChangeChatName={handleChangeChatName}
            onChangeChatLink={handleChangeChatLink}
            onTogglePrivate={handleTogglePrivate}
          />
          <LinkExamples />
          <SubmitButton isPending={isPending} />
        </form>
      </div>
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={handleCloseSuccessPopup}
        title="Чат добавлен!"
        message={`Чат "${successChatName}" успешно добавлен и готов к использованию.`}
        autoCloseDelay={5000}
      />
    </div>
  );
}
