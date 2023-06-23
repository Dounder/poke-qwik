import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';

import { PokemonGameContext, PokemonListContext, type PokemonGameState, type PokemonListState } from '~/context';

export const PokemonProvider = component$(() => {
	const pokemonGame = useStore<PokemonGameState>({
		pokemonId: 5,
		reveal: true,
		showBackImage: false,
	});

	const pokemonList = useStore<PokemonListState>({
		isLoading: false,
		pokemons: [],
		page: 0,
		pagePosition: 0,
	});

	useContextProvider(PokemonGameContext, pokemonGame);
	useContextProvider(PokemonListContext, pokemonList);

	useVisibleTask$(() => {
		const pokemonGameFromStorage = localStorage.getItem('pokemonGame');

		if (pokemonGameFromStorage) Object.assign(pokemonGame, JSON.parse(pokemonGameFromStorage));
	});

	useVisibleTask$(({ track }) => {
		track(() => [pokemonGame.pokemonId, pokemonGame.reveal, pokemonGame.showBackImage]);

		localStorage.setItem('pokemonGame', JSON.stringify(pokemonGame));
	});

	return <Slot />;
});
