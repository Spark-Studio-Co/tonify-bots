import Modal from "@/shared/layouts/modal-layout";
import { motion } from "framer-motion";
import { useModalBalanceStore } from "./store/use-modal-balance-store";

export default function BalanceModal() {
  const { isModalOpen, closeModal, balance } = useModalBalanceStore();

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title="Управление балансом"
    >
      <div className="space-y-6">
        {/* Balance Display */}
        <div className="flex flex-col items-center">
          <div
            className="px-8 py-3 rounded-full text-2xl font-semibold"
            style={{ backgroundColor: "var(--color-main-light, #eff3fc)" }}
          >
            <span style={{ color: "var(--color-main, #627ffe)" }}>
              {balance.toFixed(2)} TON
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-6 rounded-xl text-white font-medium transition-shadow"
            style={{
              backgroundColor: "var(--color-main, #627ffe)",
              boxShadow: "0 4px 14px rgba(98, 127, 254, 0.2)",
            }}
          >
            Пополнить
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-6 rounded-xl text-white font-medium transition-shadow"
            style={{
              backgroundColor: "var(--color-secondary, #7bc394)",
              boxShadow: "0 4px 14px rgba(123, 195, 148, 0.2)",
            }}
          >
            Вывести
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
