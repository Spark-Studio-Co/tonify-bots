import { useRef, useState, useEffect } from "react";

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "Выберите...",
  className = "",
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <button
        type="button"
        className={`w-full flex justify-between items-center py-2 px-3 rounded-lg border border-gray-200 text-sm bg-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[var(--color-main,#627ffe)] ${
          open ? "ring-2 ring-[var(--color-main,#627ffe)]" : ""
        }`}
        style={{ color: "var(--color-dark, #121826)" }}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{options.find((o) => o === value) || placeholder}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto animate-fade-in">
          {options.length === 0 && (
            <li className="px-4 py-2 text-gray-400">Нет вариантов</li>
          )}
          {options.map((option) => (
            <li
              key={option}
              className={`px-4 py-2 cursor-pointer hover:bg-[var(--color-main-light,#eff3fc)] transition rounded-lg ${
                value === option
                  ? "bg-[var(--color-main-light,#eff3fc)] text-[var(--color-main,#627ffe)] font-semibold"
                  : ""
              }`}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
