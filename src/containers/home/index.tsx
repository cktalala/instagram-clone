"use client";

import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  background-color: #fff;
  min-height: 100vh;
  padding: 24px;
  grid-template-columns: 2fr 1fr;
`;

const HomeContainer: React.FC = () => {
  return (
    <Container>
      <div></div>
    </Container>
  );
};

export default HomeContainer;
