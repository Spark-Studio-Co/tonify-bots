"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Layout } from "../../shared/layouts/layout"
import { OnboardingFirstBlock } from "./blocks/onboarding-first-block"
import { OnboardingSecondBlock } from "./blocks/onboarding-second-block"
import { OnboardingThirdBlock } from "./blocks/onboarding-third-block"
import { useOnboardingStore } from "./model/use-onboarding-store"

export const OnboardingPage = () => {
  const { currentState } = useOnboardingStore()

  return (
    <Layout isAuth={false}>
      <AnimatePresence mode="wait">
        {currentState === 1 && (
          <motion.div
            className="flex flex-col items-center justify-center"
            key="step-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <OnboardingFirstBlock />
          </motion.div>
        )}
        {currentState === 2 && (
          <motion.div
            key="step-2"
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <OnboardingSecondBlock />
          </motion.div>
        )}
        {currentState === 3 && (
          <motion.div
            key="step-3"
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <OnboardingThirdBlock />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}
