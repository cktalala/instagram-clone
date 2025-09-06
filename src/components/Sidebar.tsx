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

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const Sidebar = ({ activeItem = "home", onItemClick }: SidebarProps) => {
  const handleItemClick = (item: string) => {
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

  return (
    <SidebarContainer>
      <Logo>
        <h1>Instagram</h1>
      </Logo>

      <NavList>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavItem
              key={item.id}
              $isActive={activeItem === item.id}
              onClick={() => handleItemClick(item.id)}
            >
              <IconWrapper>
                <Icon />
              </IconWrapper>
              <NavText $isActive={activeItem === item.id}>{item.label}</NavText>
            </NavItem>
          );
        })}

        <NavItem
          $isActive={activeItem === "profile"}
          onClick={() => handleItemClick("profile")}
        >
          <ProfilePicture>
            <Image
              src="/images/profile.png"
              alt="Profile"
              width={22}
              height={22}
            />
          </ProfilePicture>
          <NavText>Profile</NavText>
        </NavItem>
      </NavList>

      <BottomSection>
        <NavItem onClick={() => handleItemClick("more")}>
          <IconWrapper>
            <Menu />
          </IconWrapper>
          <NavText>More</NavText>
        </NavItem>

        <MetaLogo>
          <Instagram size={16} />
          <span>Also from Meta</span>
        </MetaLogo>
      </BottomSection>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  width: 245px;
  height: 100vh;
  background: white;
  border-right: 1px solid #dbdbdb;
  position: fixed;
  left: 0;
  top: 0;
  padding: 12px 12px 20px 12px;
  display: flex;
  flex-direction: column;
  z-index: 100;
`;

const Logo = styled.div`
  padding: 25px 12px 16px 12px;
  margin-bottom: 19px;

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

const NavItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 4px;
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
`;

const IconWrapper = styled.div`
  margin-right: 16px;
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

const ProfilePicture = styled.div`
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
  margin-right: 16px;
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
