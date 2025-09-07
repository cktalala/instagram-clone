"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { X } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { PokemonDetail, pokemonService } from "@/services/pokrmon";

interface SearchResult {
  id: number;
  username: string;
  fullName: string;
  avatar: string;
  isVerified: boolean;
}

interface SearchDropdownProps {
  isVisible: boolean;
  searchValue: string;
  onClose: () => void;
}

const SearchDropdown = ({
  isVisible,
  searchValue,
  onClose,
}: SearchDropdownProps) => {
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (error) {
        console.error("Error loading recent searches:", error);
      }
    } else {
      setRecentSearches([]);
      localStorage.setItem("recentSearches", JSON.stringify([]));
    }
  }, []);

  const handleRemoveRecent = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const updated = recentSearches.filter((item) => item.id !== id);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["searchPokemon", debouncedQuery],
    queryFn: () => pokemonService.searchPokemons(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  const filteredResults = searchResults?.map((pokemon: PokemonDetail) => ({
    id: pokemon.id,
    username: pokemon.name,
    fullName: `Pokemon #${pokemon.id}`,
    avatar:
      pokemon.sprites.other["official-artwork"].front_default ||
      "/images/profile.png",
    isVerified: pokemon.types.some((type) => type.type.name === "legendary"),
  }));

  if (!isVisible) return null;

  return (
    <DropdownContainer>
      <DropdownContent>
        <DropdownHeader>
          <DropdownTitle>
            {searchValue ? "Search Results" : "Recent"}
          </DropdownTitle>
          {!searchValue && recentSearches.length > 0 && (
            <ClearAllButton onClick={handleClearAll}>Clear all</ClearAllButton>
          )}
        </DropdownHeader>

        <SearchResultsList>
          {filteredResults && filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <SearchResultItem key={result.id}>
                <ProfileSection>
                  <Avatar>
                    <Image
                      src={result.avatar}
                      alt={result.username}
                      width={44}
                      height={44}
                    />
                  </Avatar>
                  <UserInfo>
                    <Username>
                      {result.username}
                      {result.isVerified && <VerifiedBadge>✓</VerifiedBadge>}
                    </Username>
                    <FullName>{result.fullName}</FullName>
                  </UserInfo>
                </ProfileSection>
                {!searchValue && (
                  <RemoveButton
                    onClick={(e) => handleRemoveRecent(result.id, e)}
                  >
                    <X size={16} />
                  </RemoveButton>
                )}
              </SearchResultItem>
            ))
          ) : (
            <NoResultsText>
              {searchValue ? "No results found" : "No recent searches"}
            </NoResultsText>
          )}
        </SearchResultsList>
      </DropdownContent>
    </DropdownContainer>
  );
};

export default SearchDropdown;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  right: -25%;
  z-index: 100;
  margin-top: 8px;
`;

const DropdownContent = styled.div`
  background: white;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 400px;
  overflow-y: auto;
  min-width: 375px;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px 8px 20px;
  border-bottom: 1px solid #efefef;
`;

const DropdownTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #000;
`;

const ClearAllButton = styled.button`
  background: none;
  border: none;
  color: #0095f6;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: #00376b;
  }
`;

const SearchResultsList = styled.div`
  padding: 8px 0;
`;

const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Username = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #000;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const VerifiedBadge = styled.span`
  color: #0095f6;
  font-size: 12px;
`;

const FullName = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #8e8e8e;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #8e8e8e;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #000;
    background: rgba(0, 0, 0, 0.05);
  }
`;

const NoResultsText = styled.p`
  font-size: 16px;
  color: #8e8e8e;
  text-align: center;
  padding: 20px;
  margin: 0;
`;
