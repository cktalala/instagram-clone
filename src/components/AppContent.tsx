"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import styled from "styled-components";

interface AppContentProps {
  children: React.ReactNode;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useEffect : () => {};

const AppContent = ({ children }: AppContentProps) => {
  const [activeItem, setActiveItem] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!isClient) return;

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1264);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isClient]);

  const handleNavigation = (item: string) => {
    setActiveItem(item);
  };

  const getMainContentMargin = () => {
    if (isMobile) return "0";
    if (isTablet || activeItem === "search") return "73px";
    return "245px";
  };

  const handleHeaderSearchFocus = () => {
    setActiveItem("search");
  };

  const renderContent = () => {
    switch (activeItem) {
      case "search":
        return (
          <>
            <Header onSearchFocus={handleHeaderSearchFocus} />
            <Sidebar
              activeItem={activeItem}
              onItemClick={handleNavigation}
              isCollapsed={true}
            />
            <MainContent
              $marginLeft={getMainContentMargin()}
              $isMobile={isMobile}
              $hasHeader={isMobile}
            >
              {children}
            </MainContent>
          </>
        );
      default:
        return (
          <>
            <Header onSearchFocus={handleHeaderSearchFocus} />
            <Sidebar
              activeItem={activeItem}
              onItemClick={handleNavigation}
              isCollapsed={false}
            />
            <MainContent
              $marginLeft={getMainContentMargin()}
              $isMobile={isMobile}
              $hasHeader={isMobile}
            >
              {children}
            </MainContent>
          </>
        );
    }
  };

  return <AppContainer>{renderContent()}</AppContainer>;
};

export default AppContent;

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main<{
  $marginLeft: string;
  $isMobile: boolean;
  $hasHeader: boolean;
}>`
  margin-left: ${(props) => props.$marginLeft};
  flex: 1;
  min-height: 100vh;
  padding-top: ${(props) => (props.$hasHeader ? "60px" : "0")};
  padding-bottom: ${(props) => (props.$isMobile ? "60px" : "0")};
  transition: margin-left 0.3s ease;

  @media (max-width: 767px) {
    margin-left: 0;
    padding-top: 60px;
  }
`;
