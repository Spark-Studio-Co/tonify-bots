
import Modal from "@/shared/layouts/modal-layout"
import { motion } from "framer-motion"
import { Bot, Shield, ArrowRight } from "lucide-react"
import { useInstructionModalStore } from "../store/use-instruction-modal.store"

export default function InstructionPopup() {
  const { isModalOpen, closeModal } = useInstructionModalStore()

  const steps = [
    {
      title: "Добавьте бота в чат",
      description: "После создания чата добавьте бота @AdsTonify_bot в качестве участника",
      icon: <Bot size={24} className="text-white" />,
      color: "#627ffe",
    },
    {
      title: "Назначьте бота администратором",
      description:
        "Откройте настройки чата, найдите @AdsTonify_bot в списке участников и назначьте его администратором",
      icon: <Shield size={24} className="text-white" />,
      color: "#7bc394",
    },
    {
      title: "Готово!",
      description: "Теперь бот может публиковать объявления в вашем чате",
      icon: <ArrowRight size={24} className="text-white" />,
      color: "#f59e0b",
    },
  ]

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Инструкция">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-gray-600">
                  Для публикации объявлений в чате, необходимо добавить нашего бота и дать ему права администратора
                </p>
              </div>

              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <Bot size={20} className="text-blue-500 mr-2" />
                  <span className="font-medium">@TonifyBot</span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("@TonifyBot")
                  }}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  Копировать
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={closeModal}
                className="w-full mt-6 py-3 px-6 rounded-xl text-white font-medium"
                style={{ backgroundColor: "var(--color-main, #627ffe)" }}
              >
                Понятно
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Modal>
    </>
  )
}
