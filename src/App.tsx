import { QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { TelegramProvider } from "./shared/layouts/telegram-provider";
import reactQueryClient from "./shared/api/query-client";

// Pages
import { IntroPage } from "./pages/intro-page/intro-page";
import { LoginPage } from "./pages/login-page/login-page";
import { OnboardingPage } from "./pages/onboarding-page/onboarding-page";
import { ConfirmationCodePage } from "./pages/confirmation-page/confirmation-page";
import { SetPin } from "./pages/set-pin/set-pin";

import { HomePage } from "./pages/home-page/home-page";
import { SearchPage } from "./pages/search-page/search-page";
import ProfilePage from "./pages/profile-page/profile-page";
import SettingsPage from "./pages/settings-page/settings-page";
import AddAnnouncementPage from "./pages/add-announcement-page/add-announcement-page";
import { AddChatPage } from "./pages/add-chat-page/add-chat-page";
import WalletPage from "./pages/wallet-page/wallet-page";
import DraftsPage from "./pages/drafts-page/drafts-page";
import CreateDraftPage from "./pages/create-draft-page/create-draft-page";
import EditDraftPage from "./pages/edit-draft-page/edit-draft-page";
import PublishAnnouncementPage from "./pages/publish-announcement-page/publish-announcement-page";
import PublicationLogPage from "./pages/publication-log-page/publication-log-page";
import AdminPage from "./pages/admin-page/admin-page";
import { ProtectedRoute } from "./shared/lib/protected-route";
import { useAuthData } from "./entities/auth/store/use-auth.store";
import { ToastProvider } from "./shared/layouts/toast-provider";

// Animations
const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
};

const wrapWithMotion = (element: any) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {element}
  </motion.div>
);

const publicRoutes = [
  { path: "/", element: <IntroPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/onboarding", element: <OnboardingPage /> },
  { path: "/confirmation", element: <ConfirmationCodePage /> },
  { path: "/set-pin", element: <SetPin /> },
];

const authRoutes = [
  { path: "/home", element: <HomePage /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/add-announcement", element: <AddAnnouncementPage /> },
  { path: "/add-chat", element: <AddChatPage /> },
  { path: "/settings", element: <SettingsPage /> },
  { path: "/wallet", element: <WalletPage /> },
  { path: "/drafts", element: <DraftsPage /> },
  { path: "/create-draft", element: <CreateDraftPage /> },
  { path: "/edit-draft/:id", element: <EditDraftPage /> },
  { path: "/publish-announcement/:id", element: <PublishAnnouncementPage /> },
  { path: "/publication-log", element: <PublicationLogPage /> },
  { path: "/admin", element: <AdminPage /> },
];

const AnimatedRoutes = () => {
  const location = useLocation();
  const { token } = useAuthData();

  const isPublicPath = publicRoutes.some(
    (route) => route.path === location.pathname
  );

  if (token && isPublicPath) {
    return <Navigate to="/home" replace />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={wrapWithMotion(element)} />
        ))}
        {authRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute>{wrapWithMotion(element)}</ProtectedRoute>}
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <BrowserRouter>
        <TelegramProvider>
          <ToastProvider>
            <AnimatedRoutes />
          </ToastProvider>
        </TelegramProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
