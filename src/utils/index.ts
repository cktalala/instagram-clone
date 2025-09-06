export const getPokemonIdFromUrl = (url: string): string | null => {
  try {
    const cleanUrl = url.replace(/\/$/, "");
    const urlParts = cleanUrl.split("/");
    const id = urlParts[urlParts.length - 1];

    if (id && !isNaN(Number(id))) {
      return id;
    }

    return null;
  } catch (error) {
    console.error("Error extracting Pokemon ID from URL:", error);
    return null;
  }
};

export const getPokemonSpriteUrl = (pokemonUrl: string): string => {
  const id = getPokemonIdFromUrl(pokemonUrl);
  if (id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
  return "";
};
