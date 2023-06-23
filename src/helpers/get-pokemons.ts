import type { PokemonListResponse, SmallPokemon } from '~/interfaces';

export const getSmallPokemons = async (offset: number = 0, limit: number = 0): Promise<SmallPokemon[]> => {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
	const { results } = (await res.json()) as PokemonListResponse;

	return results.map(({ name, url }) => {
		const id = url.split('/').at(-2)!;

		return { id, name };
	});
};
