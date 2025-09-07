"use client";

import { Search, Heart, Instagram } from "lucide-react";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import SearchDropdown from "./SearchDropdown";

interface HeaderProps {
  onSearchFocus?: () => void;
  onSearchBlur?: () => void;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useEffect : () => {};

const Header = ({ onSearchFocus, onSearchBlur }: HeaderProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!isClient) return;

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isClient]);

  const handleSearchFocus = () => {
    setShowSearchDropdown(true);
    if (onSearchFocus) onSearchFocus();
  };

  const handleSearchBlur = () => {
    // Don't immediately hide dropdown on blur, let click outside handle it
    if (onSearchBlur) onSearchBlur();
  };

  const handleCloseDropdown = () => {
    setShowSearchDropdown(false);
  };

  return (
    <HeaderContainer $isMobile={isMobile}>
      <HeaderContent>
        <LogoSection>
          <LogoText>Instagram</LogoText>
        </LogoSection>
        <SearchSectionContainer>
          <SearchSection $isMobile={isMobile}>
            <SearchContainer ref={searchContainerRef}>
              <SearchIcon>
                <Search size={16} />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              <SearchDropdown
                isVisible={showSearchDropdown}
                searchValue={searchValue}
                onClose={handleCloseDropdown}
              />
            </SearchContainer>
          </SearchSection>

          <ActionsSection>
            <ActionButton>
              <Heart size={24} />
            </ActionButton>
          </ActionsSection>
        </SearchSectionContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header<{ $isMobile: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  border-bottom: 1px solid #dbdbdb;
  z-index: 90;
  display: ${(props) => (props.$isMobile ? "block" : "none")};

  @media (max-width: 767px) {
    display: block;
  }
`;

const SearchSectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 975px;
  margin: 0 auto;
  padding: 0 16px;
`;

const LogoSection = styled.div`
  flex: 0 0 auto;
`;

const LogoText = styled.h1`
  font-family: "Lobster Two", cursive;
  font-size: 24px;
  font-weight: 400;
  margin: 0;
  color: #000;
`;

const SearchSection = styled.div<{ $isMobile: boolean }>`
  flex: 1;
  max-width: ${(props) => (props.$isMobile ? "200px" : "268px")};
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #8e8e8e;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 36px;
  background: #efefef;
  border: none;
  border-radius: 8px;
  padding: 0 16px 0 40px;
  font-size: 14px;
  color: #262626;
  outline: none;

  &::placeholder {
    color: #8e8e8e;
  }

  &:focus {
    background: white;
    border: 1px solid #dbdbdb;
  }
`;

const ActionsSection = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f2f2f2;
  }

  svg {
    stroke-width: 1.5;
  }
`;
