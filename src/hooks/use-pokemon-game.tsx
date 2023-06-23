import { $, useComputed$, useContext } from '@builder.io/qwik';
import { PokemonGameContext } from '~/context';

export const usePokemonGame = () => {
	const pokemonGame = useContext(PokemonGameContext);

	const changePokemonId = $((value: number) => {
		if (pokemonGame.pokemonId + value < 1) return;

		pokemonGame.pokemonId += value;
		pokemonGame.reveal = false;
	});

	return {
		pokemonId: useComputed$(() => pokemonGame.pokemonId),
		reveal: useComputed$(() => pokemonGame.reveal),
		showBackImage: useComputed$(() => pokemonGame.showBackImage),

		nextPokemon: $(() => changePokemonId(1)),
		previousPokemon: $(() => changePokemonId(-1)),
		flipPokemon: $(() => (pokemonGame.showBackImage = !pokemonGame.showBackImage)),
		toggleReveal: $(() => (pokemonGame.reveal = !pokemonGame.reveal)),
	};
};
