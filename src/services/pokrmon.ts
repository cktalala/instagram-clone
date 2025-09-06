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

  searchPokemons: async (query: string, limit: number = 10) => {
    if (!query.trim()) return [];

    // First get a list of Pokemon
    const response = await api.get<PokemonApiResponse>(`/pokemon?limit=1000`);

    // Filter by search query
    const filteredResults = response.data.results
      .filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, limit);

    // Get detailed info for each filtered Pokemon
    const detailPromises = filteredResults.map((pokemon) =>
      api.get<PokemonDetail>(`/pokemon/${pokemon.name}`)
    );

    const detailResponses = await Promise.all(detailPromises);
    return detailResponses.map((res) => res.data);
  },
};
