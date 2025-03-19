import { QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ConfirmationCodePage } from "./pages/confirmation-page/confirmation-page";
import { HomePage } from "./pages/home-page/home-page";
import { IntroPage } from "./pages/intro-page/intro-page";
import { OnboardingPage } from "./pages/onboarding-page/onboarding-page";
import { SearchPage } from "./pages/search-page/search-page";
import reactQueryClient from "./shared/api/query-client";
import ProfilePage from "./pages/profile-page/profile-page";
import SettingsPage from "./pages/settings-page/settings-page";
import AddAnnouncementPage from "./pages/add-announcement-page/add-announcement-page";
import { AddChatPage } from "./pages/add-chat-page/add-chat-page";

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <IntroPage />
            </motion.div>
          }
        />
        <Route
          path="/onboarding"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <OnboardingPage />
            </motion.div>
          }
        />
        <Route
          path="/confirmation"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ConfirmationCodePage />
            </motion.div>
          }
        />
        <Route
          path="/home"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <HomePage />
            </motion.div>
          }
        />
        <Route
          path="/search"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <SearchPage />
            </motion.div>
          }
        />
        <Route
          path="/profile"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ProfilePage />
            </motion.div>
          }
        />
        <Route
          path="/add-announcement"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <AddAnnouncementPage />
            </motion.div>
          }
        />
        <Route
          path="/add-chat"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <AddChatPage />
            </motion.div>
          }
        />
        <Route
          path="/settings"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <SettingsPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
