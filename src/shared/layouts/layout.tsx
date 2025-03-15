import BottomTab from "@/features/bottom-tab/ui/bottom-tab";
import { Header } from "@/features/header/header";
import { BurgerMenu } from "@/features/menu/ui/menu";
import React from "react";

interface ILayout {
  children: React.ReactNode;
  isAuth?: boolean;
}

export const Layout: React.FC<ILayout> = ({ children, isAuth = true }) => {
  return (
    <div className="contain-block m-auto min-h-[100vh] py-[32px] flex flex-col items-center justify-center">
      {isAuth && <Header />}
      {children}
      <BurgerMenu />
      {isAuth && <BottomTab />}
    </div>
  );
};
