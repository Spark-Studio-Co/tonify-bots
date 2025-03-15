"use client";

import type { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function SettingsSection({
  title,
  children,
  className = "",
}: SettingsSectionProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <h2
        className="text-sm font-medium mb-2 px-1"
        style={{ color: "var(--color-main, #627ffe)" }}
      >
        {title}
      </h2>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        {children}
      </div>
    </div>
  );
}
