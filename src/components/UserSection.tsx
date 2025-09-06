import { PokemonApiResponse } from "@/services/pokrmon";
import { getPokemonSpriteUrl } from "@/utils";
import { InfiniteData } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

interface UserSectionProps {
  pokemonsData: InfiniteData<PokemonApiResponse> | undefined;
}

const UserSection = ({ pokemonsData }: UserSectionProps) => {
  const allPokemons = pokemonsData?.pages.flatMap((page) => page.results) || [];
  return (
    <Container>
      <UserSectionContainer>
        <UserNaeContainer>
          <ImageProfile
            src="/images/profile.png"
            alt="user"
            width={45}
            height={45}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#262626" }}>
              Phet
            </p>
            <p style={{ fontSize: 14, fontWeight: 400, color: "#8e8e8e" }}>
              Phatchara Sangkeaw
            </p>
          </div>
        </UserNaeContainer>

        <Link href="/">
          <p style={{ fontSize: 12, fontWeight: 600, color: "#004cfe" }}>
            Switch
          </p>
        </Link>
      </UserSectionContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#7a7a7a",
            padding: "16px 0px",
          }}
        >
          Suggested for you
        </p>
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#262626",
            padding: "16px 0px",
          }}
        >
          See All
        </p>
      </div>
      {allPokemons.slice(0, 5).map((pokemon) => (
        <FriendSectionContainer key={pokemon.name}>
          <UserNaeContainer>
            <ImageProfile
              src={getPokemonSpriteUrl(pokemon.url)}
              alt="user"
              width={45}
              height={45}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#262626" }}>
                {pokemon.name}
              </p>
              <p style={{ fontSize: 14, fontWeight: 400, color: "#8e8e8e" }}>
                {pokemon.name}
              </p>
            </div>
          </UserNaeContainer>

          <Link href="/">
            <p style={{ fontSize: 12, fontWeight: 600, color: "#004cfe" }}>
              Follow
            </p>
          </Link>
        </FriendSectionContainer>
      ))}
      <div
        style={{ display: "flex", alignItems: "center", padding: "16px 0px" }}
      >
        <p style={{ fontSize: 12, fontWeight: 500, color: "#bcbcbc" }}>
          About Help Press API Jobs Privacy Terms Locations Language Meta
          Verified
          <br />
          <br />© 2025 Instagram from Meta
        </p>
      </div>
    </Container>
  );
};

export default UserSection;

const Container = styled.div`
  background: white;
  max-width: 80%;
`;

const ImageProfile = styled(Image)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const UserSectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0px;
`;

const FriendSectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0px;
`;

const UserNaeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
