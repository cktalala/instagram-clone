"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { pokemonService, PokemonDetail } from "@/services/pokrmon";

interface SearchResult {
  id: number;
  username: string;
  fullName: string;
  avatar: string;
  isVerified: boolean;
}

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["searchPokemons", debouncedQuery],
    queryFn: () => pokemonService.searchPokemons(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  const transformedResults: SearchResult[] =
    searchResults?.map((pokemon: PokemonDetail) => ({
      id: pokemon.id,
      username: pokemon.name,
      fullName: `Pokemon #${pokemon.id}`,
      avatar:
        pokemon.sprites.other["official-artwork"].front_default ||
        "/images/profile.png",
      isVerified: pokemon.types.some((type) => type.type.name === "legendary"),
    })) || [];

  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  const handleRemoveRecent = (id: number) => {
    const updated = recentSearches.filter((item) => item.id !== id);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSelectResult = (result: SearchResult) => {
    const updated = [
      result,
      ...recentSearches.filter((item) => item.id !== result.id),
    ].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setSearchQuery("");
    setDebouncedQuery("");
  };

  const handleClearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const displayResults = debouncedQuery ? transformedResults : recentSearches;

  return (
    <SearchContainer>
      <SearchHeader>
        <SearchTitle>Search</SearchTitle>
        <SearchInputContainer>
          <SearchInputWrapper>
            <SearchIcon>
              <Search size={16} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <ClearButton onClick={handleClearSearch}>
                <X size={16} />
              </ClearButton>
            )}
          </SearchInputWrapper>
        </SearchInputContainer>
      </SearchHeader>

      <SearchContent>
        <RecentHeader>
          <RecentTitle>
            {debouncedQuery ? "Search Results" : "Recent"}
          </RecentTitle>
          {!debouncedQuery && recentSearches.length > 0 && (
            <ClearAllButton onClick={handleClearAll}>Clear all</ClearAllButton>
          )}
        </RecentHeader>

        <RecentList>
          {isLoading && debouncedQuery ? (
            <LoadingText>Searching...</LoadingText>
          ) : displayResults.length > 0 ? (
            displayResults.map((result) => (
              <SearchResultItem
                key={result.id}
                onClick={() =>
                  debouncedQuery ? handleSelectResult(result) : undefined
                }
              >
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
                {!debouncedQuery && (
                  <RemoveButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveRecent(result.id);
                    }}
                  >
                    <X size={16} />
                  </RemoveButton>
                )}
              </SearchResultItem>
            ))
          ) : debouncedQuery ? (
            <NoResultsText>No results found</NoResultsText>
          ) : (
            <NoResultsText>No recent searches</NoResultsText>
          )}
        </RecentList>
      </SearchContent>
    </SearchContainer>
  );
};

export default SearchComponent;

const SearchContainer = styled.div`
  width: 397px;
  height: 100vh;
  background: white;
  border-right: 1px solid #dbdbdb;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 73px;
  top: 0;
  z-index: 100;
  border-bottom-right-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

const SearchHeader = styled.div`
  padding: 24px 24px 16px 24px;
  border-bottom: 1px solid #dbdbdb;
`;

const SearchTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #000;
`;

const SearchInputContainer = styled.div`
  padding-top: 48px;
  padding-bottom: 16px;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #efefef;
  border-radius: 10px;
  padding: 8px 16px;
`;

const SearchIcon = styled.div`
  margin-right: 12px;
  color: #8e8e8e;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 16px;
  color: #000;

  &::placeholder {
    color: #8e8e8e;
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #8e8e8e;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  margin-left: 8px;

  &:hover {
    color: #000;
  }
`;

const SearchContent = styled.div`
  flex: 1;
  padding: 0 24px;
`;

const RecentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px 0 8px 0;
`;

const RecentTitle = styled.h3`
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

const RecentList = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    margin: 0 -8px;
    padding: 8px 8px;
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

  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
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

const LoadingText = styled.p`
  font-size: 16px;
  color: #8e8e8e;
  text-align: center;
  padding: 20px 0;
  margin: 0;
`;

const NoResultsText = styled.p`
  font-size: 16px;
  color: #8e8e8e;
  text-align: center;
  padding: 20px 0;
  margin: 0;
`;
