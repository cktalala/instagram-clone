"use client";

import { PokemonApiResponse } from "@/services/pokrmon";
import { getPokemonSpriteUrl } from "@/utils";
import { InfiniteData } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import styled from "styled-components";

interface StorySectionProps {
  pokemonsData: InfiniteData<PokemonApiResponse> | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const StorySection = ({
  pokemonsData,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: StorySectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const allPokemons = pokemonsData?.pages.flatMap((page) => page.results) || [];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const isNearEnd = scrollLeft + clientWidth >= scrollWidth - 100;

      if (isNearEnd && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div>
      <StoryContainer ref={containerRef}>
        {allPokemons.map((story, index) => (
          <StoryItem key={`${story.name}-${index}`}>
            <StoryAvatar $imageUrl={getPokemonSpriteUrl(story.url)} />
            <StoryName>{story.name}</StoryName>
          </StoryItem>
        ))}
      </StoryContainer>
    </div>
  );
};

export default StorySection;

const StoryContainer = styled.div`
  background: white;
  display: flex;
  gap: 14px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
  cursor: pointer;
`;

const StoryAvatar = styled.div<{ $imageUrl: string }>`
  width: 80px;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;

  &::after {
    content: "";
    width: 74px;
    height: 74px;
    border-radius: 50%;
    background-image: url(${(props) => props.$imageUrl});
    background-size: cover;
    background-position: center;
    border: 2px solid white;
    background-color: #fff;
  }
`;

const StoryName = styled.span`
  font-size: 12px;
  color: #262626;
  text-align: center;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
