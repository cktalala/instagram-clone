"use client";

import {
  Home,
  Search,
  Compass,
  Video,
  MessageCircle,
  Heart,
  PlusSquare,
  Menu,
  Instagram,
} from "lucide-react";
import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearchComponent from "./SearchComponent";

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
  isCollapsed?: boolean;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useEffect : () => {};

const Sidebar = ({
  activeItem = "home",
  onItemClick,
  isCollapsed = false,
}: SidebarProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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

  const handleItemClick = (item: string) => {
    if (item === "search" && !isMobile) {
      setShowSearch(!showSearch);
    } else {
      setShowSearch(false);
    }

    if (onItemClick) {
      onItemClick(item);
    }
  };

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "explore", icon: Compass, label: "Explore" },
    { id: "reels", icon: Video, label: "Reels" },
    { id: "messages", icon: MessageCircle, label: "Messages" },
    { id: "notifications", icon: Heart, label: "Notifications" },
    { id: "create", icon: PlusSquare, label: "Create" },
  ];

  if (isMobile) {
    return (
      <MobileNavContainer>
        <MobileNavList>
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <MobileNavItem
                key={item.id}
                $isActive={activeItem === item.id}
                onClick={() => handleItemClick(item.id)}
              >
                <Icon />
              </MobileNavItem>
            );
          })}
          <MobileNavItem
            $isActive={activeItem === "profile"}
            onClick={() => handleItemClick("profile")}
          >
            <MobileProfilePicture>
              <Image
                src="/images/profile.png"
                alt="Profile"
                width={24}
                height={24}
              />
            </MobileProfilePicture>
          </MobileNavItem>
        </MobileNavList>
      </MobileNavContainer>
    );
  }

  const shouldBeCollapsed = isTablet || isCollapsed || showSearch;

  return (
    <>
      <SidebarContainer $isCollapsed={shouldBeCollapsed} $isMobile={isMobile}>
        <Logo $isCollapsed={shouldBeCollapsed}>
          {shouldBeCollapsed ? <Instagram size={24} /> : <h1>Instagram</h1>}
        </Logo>

        <NavList>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavItem
                key={item.id}
                $isActive={activeItem === item.id}
                $isCollapsed={shouldBeCollapsed}
                onClick={() => handleItemClick(item.id)}
              >
                <IconWrapper $isCollapsed={shouldBeCollapsed}>
                  <Icon />
                </IconWrapper>
                {!shouldBeCollapsed && (
                  <NavText $isActive={activeItem === item.id}>
                    {item.label}
                  </NavText>
                )}
              </NavItem>
            );
          })}

          <NavItem
            $isActive={activeItem === "profile"}
            $isCollapsed={shouldBeCollapsed}
            onClick={() => handleItemClick("profile")}
          >
            <ProfilePicture $isCollapsed={shouldBeCollapsed}>
              <Image
                src="/images/profile.png"
                alt="Profile"
                width={22}
                height={22}
              />
            </ProfilePicture>
            {!shouldBeCollapsed && <NavText>Profile</NavText>}
          </NavItem>
        </NavList>

        <BottomSection>
          <NavItem
            $isCollapsed={shouldBeCollapsed}
            onClick={() => handleItemClick("more")}
          >
            <IconWrapper>
              <Menu />
            </IconWrapper>
            {!shouldBeCollapsed && <NavText>More</NavText>}
          </NavItem>

          {!shouldBeCollapsed && (
            <MetaLogo>
              <Instagram size={16} />
              <span>Also from Meta</span>
            </MetaLogo>
          )}
        </BottomSection>
      </SidebarContainer>

      {showSearch && <SearchComponent />}
    </>
  );
};

const SidebarContainer = styled.div<{
  $isCollapsed: boolean;
  $isMobile: boolean;
}>`
  width: ${(props) => (props.$isCollapsed ? "73px" : "245px")};
  height: 100vh;
  background: white;
  border-right: 1px solid #dbdbdb;
  position: fixed;
  left: 0;
  top: 0;
  padding: ${(props) =>
    props.$isCollapsed ? "12px 8px 20px 8px" : "12px 12px 20px 12px"};
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: width 0.3s ease;

  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileNavContainer = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-top: 1px solid #dbdbdb;
    z-index: 100;
    height: 60px;
  }
`;

const MobileNavList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 0 16px;
`;

const MobileNavItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f2f2f2;
  }

  ${(props) =>
    props.$isActive &&
    `
    background-color: #f2f2f2;
  `}

  svg {
    width: 24px;
    height: 24px;
    stroke-width: ${(props) => (props.$isActive ? "2" : "1.5")};
  }
`;

const MobileProfilePicture = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid white;
  }
`;

const Logo = styled.div<{ $isCollapsed: boolean }>`
  padding: ${(props) =>
    props.$isCollapsed ? "25px 12px 16px 12px" : "25px 12px 16px 12px"};
  margin-bottom: 19px;
  display: flex;
  justify-content: ${(props) => (props.$isCollapsed ? "center" : "flex-start")};

  h1 {
    font-family: "Lobster Two", cursive;
    font-size: 24px;
    font-weight: 400;
    margin: 0;
    color: #000;
  }
`;

const NavList = styled.nav`
  flex: 1;
`;

const NavItem = styled.div<{ $isActive?: boolean; $isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${(props) => (props.$isCollapsed ? "12px 8px" : "12px")};
  margin-bottom: 4px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  justify-content: ${(props) => (props.$isCollapsed ? "center" : "flex-start")};

  &:hover {
    background-color: #f2f2f2;
  }

  ${(props) =>
    props.$isActive &&
    `
    background-color: #f2f2f2;
  `}
`;

const IconWrapper = styled.div<{ $isCollapsed?: boolean }>`
  margin-right: ${(props) => (props.$isCollapsed ? "0px" : "16px")};
  display: flex;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
    stroke-width: 1.5;
  }
`;

const NavText = styled.span<{ $isActive?: boolean }>`
  font-size: 16px;
  font-weight: ${(props) => (props.$isActive ? "600" : "400")};
  color: #000;
`;

const ProfilePicture = styled.div<{ $isCollapsed?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  margin-right: ${(props) => (props.$isCollapsed ? "0px" : "16px")};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid white;
  }
`;

const BottomSection = styled.div`
  margin-top: auto;
`;

const MetaLogo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  color: #737373;
  font-size: 14px;

  svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`;

export default Sidebar;
