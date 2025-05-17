"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Copy, Clock, CheckCircle, XCircle } from "lucide-react";
import { useGetMe } from "@/entities/auth/queries/use-get-me.query.ts";
import { useBindWallet } from "@/entities/wallet/hooks/useBindWallet";
import { useCreateTopUp } from "@/entities/wallet/hooks/useCreateTopUp";
import { useWalletHistory } from "@/entities/wallet/hooks/useWalletHistory";
import WebApp from "@twa-dev/sdk";

export default function WalletBlock() {
  const { data: user, isLoading: isUserLoading } = useGetMe();
  const { mutate: bindWallet, isPending: isBindingWallet } = useBindWallet();
  const { mutate: createTopUp, isPending: isCreatingTopUp } = useCreateTopUp();
  const { data: history, isLoading: isHistoryLoading } = useWalletHistory();
  const [walletAddress, setWalletAddress] = useState("");
  const [topUpAmount, setTopUpAmount] = useState("");
  const [showTopUpDetails, setShowTopUpDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<"bind" | "topup" | "history">(
    "bind"
  );

  const depositAddress = "UQBFnYnYx7M4in4PgU7F6Ykpj8H1jLt6MxiWH5oMrZFzYFgm";
  const depositMemo = "MEMO123456789";

  const handleBindWallet = () => {
    if (!walletAddress) return;

    bindWallet(
      {
        userId: user?.userId || 0,
        walletAddress,
      },
      {
        onSuccess: () => {
          WebApp.showAlert("Кошелек успешно привязан!");
          setWalletAddress("");
        },
      }
    );
  };

  const handleCreateTopUp = () => {
    if (!topUpAmount || isNaN(Number(topUpAmount))) return;

    createTopUp(
      {
        userId: user?.userId || 0,
        amount: Number(topUpAmount),
      },
      {
        onSuccess: () => {
          setShowTopUpDetails(true);
        },
      }
    );
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    WebApp.showAlert("Скопировано в буфер обмена!");
  };

  return (
    <div className="min-h-screen w-full pb-20">
      <div className="container mx-auto max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-main-light flex items-center justify-center">
            <Wallet size={32} style={{ color: "var(--color-main, #627ffe)" }} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Ваш баланс</h2>
            <div className="text-sm text-gray-500">TON</div>
          </div>
          <div className="flex items-baseline">
            <span
              className="text-3xl font-bold"
              style={{ color: "var(--color-main, #627ffe)" }}
            >
              {isUserLoading ? "..." : user?.balance?.toFixed(2) || "0.00"}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              {/* Здесь будет отображаться ожидающая сумма */}
              {/* + 0.5 в обработке */}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("bind")}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === "bind"
                  ? "text-main border-b-2 border-main"
                  : "text-gray-500"
              }`}
            >
              Привязать кошелек
            </button>
            <button
              onClick={() => setActiveTab("topup")}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === "topup"
                  ? "text-main border-b-2 border-main"
                  : "text-gray-500"
              }`}
            >
              Пополнить
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === "history"
                  ? "text-main border-b-2 border-main"
                  : "text-gray-500"
              }`}
            >
              История
            </button>
          </div>
          <div className="p-4">
            {activeTab === "bind" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Подключите свой TON кошелек, чтобы получать оплату за ваши
                  объявления.
                </p>
                <div>
                  <label
                    htmlFor="walletAddress"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Адрес кошелька
                  </label>
                  <input
                    type="text"
                    id="walletAddress"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Введите адрес вашего TON кошелька"
                    className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBindWallet}
                  disabled={isBindingWallet || !walletAddress}
                  className="w-full py-3 px-6 rounded-xl text-white font-medium disabled:opacity-50"
                  style={{
                    backgroundColor: "var(--color-main, #627ffe)",
                    boxShadow: "0 4px 14px rgba(98, 127, 254, 0.2)",
                  }}
                >
                  {isBindingWallet ? "Привязка..." : "Привязать кошелек"}
                </motion.button>
              </div>
            )}
            {activeTab === "topup" && (
              <div className="space-y-4">
                {!showTopUpDetails ? (
                  <>
                    <p className="text-sm text-gray-600">
                      Пополните счет, чтобы создавать и продвигать объявления.
                    </p>

                    <div>
                      <label
                        htmlFor="topUpAmount"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Сумма (TON)
                      </label>
                      <input
                        type="number"
                        id="topUpAmount"
                        value={topUpAmount}
                        onChange={(e) => setTopUpAmount(e.target.value)}
                        placeholder="Введите сумму пополнения"
                        className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCreateTopUp}
                      disabled={
                        isCreatingTopUp ||
                        !topUpAmount ||
                        isNaN(Number(topUpAmount))
                      }
                      className="w-full py-3 px-6 rounded-xl text-white font-medium disabled:opacity-50"
                      style={{
                        backgroundColor: "var(--color-main, #627ffe)",
                        boxShadow: "0 4px 14px rgba(98, 127, 254, 0.2)",
                      }}
                    >
                      {isCreatingTopUp ? "Создание..." : "Создать заявку"}
                    </motion.button>
                  </>
                ) : (
                  <>
                    <div className="bg-main-light rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-gray-900">
                          Адрес для пополнения
                        </h3>
                        <button
                          onClick={() => handleCopyToClipboard(depositAddress)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Copy size={16} className="text-main" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 break-all">
                        {depositAddress}
                      </p>
                    </div>

                    <div className="bg-main-light rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-gray-900">
                          MEMO (Обязательно)
                        </h3>
                        <button
                          onClick={() => handleCopyToClipboard(depositMemo)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Copy size={16} className="text-main" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">{depositMemo}</p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Важно:</strong> Всегда указывайте MEMO при
                        отправке средств. Транзакции без правильного MEMO не
                        могут быть зачислены на ваш счет.
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowTopUpDetails(false)}
                      className="w-full py-3 px-6 rounded-xl text-white font-medium"
                      style={{
                        backgroundColor: "var(--color-secondary, #7bc394)",
                      }}
                    >
                      Вернуться к пополнению
                    </motion.button>
                  </>
                )}
              </div>
            )}
            {activeTab === "history" && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">
                  История транзакций
                </h3>

                {isHistoryLoading ? (
                  <div className="text-center py-4">Загрузка истории...</div>
                ) : history && history.length > 0 ? (
                  <div className="space-y-3">
                    {history.map((transaction, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-3 flex items-center"
                      >
                        <div className="mr-3">
                          {transaction.status === "completed" ? (
                            <CheckCircle size={20} className="text-green-500" />
                          ) : transaction.status === "pending" ? (
                            <Clock size={20} className="text-yellow-500" />
                          ) : (
                            <XCircle size={20} className="text-red-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium text-gray-900">
                              {transaction.type === "topup"
                                ? "Пополнение"
                                : "Вывод"}
                            </span>
                            <span
                              className="text-sm font-medium"
                              style={{
                                color:
                                  transaction.type === "topup"
                                    ? "var(--color-secondary)"
                                    : "var(--color-main)",
                              }}
                            >
                              {transaction.type === "topup" ? "+" : "-"}
                              {transaction.amount} TON
                            </span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500">
                              {transaction.date}
                            </span>
                            <span className="text-xs text-gray-500">
                              {transaction.status === "completed"
                                ? "Выполнено"
                                : transaction.status === "pending"
                                ? "В обработке"
                                : "Ошибка"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    История транзакций пуста
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
