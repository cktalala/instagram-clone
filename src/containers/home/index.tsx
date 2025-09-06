"use client";

import StorySection from "@/components/StorySection";
import { pokemonService } from "@/services/pokrmon";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";

const HomeContainer = () => {
  const {
    data: pokemonsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: ({ pageParam = 0 }) => pokemonService.getPokemons(pageParam, 20),
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return parseInt(url.searchParams.get("offset") || "0");
      }
      return undefined;
    },
    initialPageParam: 0,
  });

  return (
    <Container>
      <FeedContainer>
        <StorySection
          pokemonsData={pokemonsData}
          fetchNextPage={fetchNextPage}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </FeedContainer>
      <div>fff</div>
    </Container>
  );
};

export default HomeContainer;

const Container = styled.div`
  display: grid;
  background-color: #fff;
  min-height: 100vh;
  padding: 24px;
  grid-template-columns: 2fr 1fr;
`;

const FeedContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
