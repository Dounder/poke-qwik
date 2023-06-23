import { createContextId } from '@builder.io/qwik';
import type { SmallPokemon } from '~/interfaces';

export interface PokemonListState {
	page: number;
	isLoading: boolean;
	pokemons: SmallPokemon[];
	pagePosition: number;
}

export const PokemonListContext = createContextId<PokemonListState>('pokemon.list-context');
