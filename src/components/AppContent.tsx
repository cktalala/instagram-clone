"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import SearchComponent from "@/components/SearchComponent";

interface AppContentProps {
  children: React.ReactNode;
}

const AppContent = ({ children }: AppContentProps) => {
  const [activeItem, setActiveItem] = useState("home");

  const handleNavigation = (item: string) => {
    setActiveItem(item);
  };

  const renderContent = () => {
    switch (activeItem) {
      case "search":
        return (
          <>
            <Sidebar
              activeItem={activeItem}
              onItemClick={handleNavigation}
              isCollapsed={true}
            />
            <SearchComponent />
            <main style={{ marginLeft: "245px", flex: 1, minHeight: "100vh" }}>
              {children}
            </main>
          </>
        );
      default:
        return (
          <>
            <Sidebar
              activeItem={activeItem}
              onItemClick={handleNavigation}
              isCollapsed={false}
            />
            <main style={{ marginLeft: "245px", flex: 1, minHeight: "100vh" }}>
              {children}
            </main>
          </>
        );
    }
  };

  return <div style={{ display: "flex" }}>{renderContent()}</div>;
};

export default AppContent;
