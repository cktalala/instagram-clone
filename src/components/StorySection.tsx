"use client";

import { PokemonApiResponse } from "@/services/pokrmon";
import { getPokemonSpriteUrl } from "@/utils";
import { InfiniteData } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(true);
  const allPokemons = pokemonsData?.pages.flatMap((page) => page.results) || [];

  const updateChevronVisibility = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftChevron(scrollLeft > 0);
    setShowRightChevron(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const isNearEnd = scrollLeft + clientWidth >= scrollWidth - 100;

      updateChevronVisibility();

      if (isNearEnd && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    container.addEventListener("scroll", handleScroll);
    updateChevronVisibility();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, allPokemons]);

  const scrollLeft = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <StoryWrapper>
      {showLeftChevron && (
        <ChevronButton $position="left" onClick={scrollLeft}>
          <ChevronLeft size={24} />
        </ChevronButton>
      )}

      <StoryContainer ref={containerRef}>
        {allPokemons.map((story, index) => (
          <StoryItem key={`${story.name}-${index}`}>
            <StoryAvatar $imageUrl={getPokemonSpriteUrl(story.url)} />
            <StoryName>{story.name}</StoryName>
          </StoryItem>
        ))}
      </StoryContainer>

      {showRightChevron && (
        <ChevronButton $position="right" onClick={scrollRight}>
          <ChevronRight size={24} />
        </ChevronButton>
      )}
    </StoryWrapper>
  );
};

export default StorySection;

const StoryWrapper = styled.div`
  position: relative;
  background: white;
  width: 100%;
  max-width: 100vw;
`;

const StoryContainer = styled.div`
  display: flex;
  gap: 14px;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChevronButton = styled.button<{ $position: "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.$position === "left" ? "left: 8px;" : "right: 8px;")}
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%) scale(1.05);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const StoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
  cursor: pointer;
  flex-shrink: 0;
  width: auto;
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
