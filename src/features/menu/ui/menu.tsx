import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useMenuStore } from "../model/use-menu-store";

export function BurgerMenu() {
  const { isOpen, closeMenu } = useMenuStore();
  const menuRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isOpen
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeMenu]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40"
            onClick={closeMenu}
          />

          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white z-50 shadow-xl flex flex-col"
          >
            <div className="p-4 flex justify-between items-center border-b border-gray-100">
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--color-main, #627ffe)" }}
              >
                Меню
              </h2>
              <button
                onClick={closeMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} style={{ color: "var(--color-dark, #121826)" }} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
