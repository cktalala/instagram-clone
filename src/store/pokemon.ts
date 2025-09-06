import { create } from "zustand";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonStore {
  pokemon: Pokemon | null;
  likedPokemons: Set<string>;
  bookmarkedPokemons: Set<string>;
  setPokemon: (pokemon: Pokemon) => void;
  toggleLike: (pokemonName: string) => void;
  toggleBookmark: (pokemonName: string) => void;
  isLiked: (pokemonName: string) => boolean;
  isBookmarked: (pokemonName: string) => boolean;
}

export const usePokemonStore = create<PokemonStore>((set, get) => ({
  pokemon: null,
  likedPokemons: new Set(),
  bookmarkedPokemons: new Set(),

  setPokemon: (pokemon) => set({ pokemon }),

  toggleLike: (pokemonName) => {
    const { likedPokemons } = get();
    const newLikedPokemons = new Set(likedPokemons);

    if (newLikedPokemons.has(pokemonName)) {
      newLikedPokemons.delete(pokemonName);
    } else {
      newLikedPokemons.add(pokemonName);
    }

    set({ likedPokemons: newLikedPokemons });
  },

  toggleBookmark: (pokemonName) => {
    const { bookmarkedPokemons } = get();
    const newBookmarkedPokemons = new Set(bookmarkedPokemons);

    if (newBookmarkedPokemons.has(pokemonName)) {
      newBookmarkedPokemons.delete(pokemonName);
    } else {
      newBookmarkedPokemons.add(pokemonName);
    }

    set({ bookmarkedPokemons: newBookmarkedPokemons });
  },

  isLiked: (pokemonName) => {
    const { likedPokemons } = get();
    return likedPokemons.has(pokemonName);
  },

  isBookmarked: (pokemonName) => {
    const { bookmarkedPokemons } = get();
    return bookmarkedPokemons.has(pokemonName);
  },
}));
