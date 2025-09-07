"use client";

import { PokemonApiResponse } from "@/services/pokrmon";
import { usePokemonStore } from "@/store/pokemon";
import { getPokemonSpriteUrl } from "@/utils";
import { InfiniteData } from "@tanstack/react-query";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface PostCardProps {
  pokemonsData: InfiniteData<PokemonApiResponse> | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const PostCard = ({
  pokemonsData,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: PostCardProps) => {
  const allPokemons = pokemonsData?.pages.flatMap((page) => page.results) || [];
  const [clickedImage, setClickedImage] = useState<string | null>(null);

  const { toggleLike, toggleBookmark, isLiked, isBookmarked } =
    usePokemonStore();

  const handleImageClick = (pokemonName: string) => {
    setClickedImage(pokemonName);
    setTimeout(() => setClickedImage(null), 200);
  };

  const handleLikeClick = (pokemonName: string) => {
    toggleLike(pokemonName);
  };

  const handleBookmarkClick = (pokemonName: string) => {
    toggleBookmark(pokemonName);
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 1000;

      if (isNearBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <Container>
      {allPokemons.map((pokemon, index) => (
        <Card key={index}>
          <PostHeader>
            <PostAvatar $imageUrl={getPokemonSpriteUrl(pokemon.url)} />
            <PostUsername>{pokemon.name}</PostUsername>
          </PostHeader>
          <PostImage onClick={() => handleImageClick(pokemon.name)}>
            <PostImageContainer
              src={getPokemonSpriteUrl(pokemon.url)}
              alt={pokemon.name}
              width={480}
              height={468}
              $isClicked={clickedImage === pokemon.name}
            />
          </PostImage>
          <PostActions>
            <PostActionSection>
              <ActionButton onClick={() => handleLikeClick(pokemon.name)}>
                <Heart
                  size={24}
                  fill={isLiked(pokemon.name) ? "#ed4956" : "none"}
                  color={isLiked(pokemon.name) ? "#ed4956" : "#262626"}
                />
              </ActionButton>
              <ActionButton>
                <MessageCircle size={24} />
              </ActionButton>
              <ActionButton>
                <Send size={24} />
              </ActionButton>
            </PostActionSection>
            <ActionButton onClick={() => handleBookmarkClick(pokemon.name)}>
              <Bookmark
                size={24}
                fill={isBookmarked(pokemon.name) ? "#262626" : "none"}
                color="#262626"
              />
            </ActionButton>
          </PostActions>
          <PostCaption>
            <strong>{pokemon.name}</strong>
          </PostCaption>
        </Card>
      ))}
    </Container>
  );
};

export default PostCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Card = styled.div`
  background: white;
  border-bottom: 1px solid #dbdbdb;

  overflow: hidden;
  max-width: 480px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0;
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  gap: 12px;
`;

const PostImageContainer = styled(Image)<{ $isClicked: boolean }>`
  width: 100%;
  height: 468px;
  background: url("https://i.pinimg.com/736x/e1/60/8e/e1608eff46f97e2b1f6f9b40ae698dff.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  transition: transform 0.2s ease, filter 0.2s ease;
  cursor: pointer;

  ${(props) =>
    props.$isClicked &&
    `
    transform: scale(0.98);
    filter: brightness(0.9);
  `}

  &:hover {
    transform: scale(1.02);
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(0.98);
    filter: brightness(0.9);
  }
`;

const PostAvatar = styled.div<{ $imageUrl: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-position: center;
`;

const PostUsername = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #262626;
`;

const PostImage = styled.div`
  width: 100%;
  height: 468px;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const PostActions = styled.div`
  padding-top: 14px;
  padding-bottom: 14px;
  display: flex;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 14px 16px;
  }
`;

const PostActionSection = styled.div`
  display: flex;
  gap: 16px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #262626;
  transition: transform 0.1s ease;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const PostCaption = styled.div`
  padding: 0 16px 16px 16px;
  font-size: 14px;
  color: #262626;
`;
