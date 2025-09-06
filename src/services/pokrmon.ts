import api from "./api";

export interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

// service
export const pokemonService = {
  getPokemons: async (offset: number = 0, limit: number = 20) => {
    const response = await api.get<PokemonApiResponse>(
      `/pokemon?offset=${offset}&limit=${limit}`
    );
    return response.data;
  },

  getPokemonDetail: async (name: string) => {
    const response = await api.get<PokemonDetail>(`/pokemon/${name}`);
    return response.data;
  },
};
