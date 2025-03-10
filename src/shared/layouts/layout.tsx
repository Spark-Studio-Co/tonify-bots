import React from "react";

interface ILayout {
  children: React.ReactNode;
}

export const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className="contain-block m-auto min-h-[100vh] py-[64px] flex flex-col items-center justify-center">
      {children}
    </div>
  );
};
