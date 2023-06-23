import { $, component$, useContext } from '@builder.io/qwik';
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export default component$(() => {
	const nav = useNavigate();

	const pokemonGame = useContext(PokemonGameContext);

	const changePokemonId = $((value: number) => {
		if (pokemonGame.pokemonId + value < 1) return;

		pokemonGame.pokemonId += value;
		pokemonGame.reveal = false;
	});

	const goToPokemon = $(() => nav(`/pokemon/${pokemonGame.pokemonId}/`));

	return (
		<>
			<span class="text-2xl">Simple finder</span>

			<span class="text-9xl">{pokemonGame.pokemonId}</span>

			<div onClick$={() => goToPokemon()}>
				<PokemonImage id={pokemonGame.pokemonId} backImage={pokemonGame.showBackImage} reveal={pokemonGame.reveal} />
			</div>

			<div class="mt-2">
				<button onClick$={() => changePokemonId(-1)} class="btn btn-primary mr-2">
					Previous
				</button>
				<button onClick$={() => (pokemonGame.showBackImage = !pokemonGame.showBackImage)} class="btn btn-primary mr-2">
					Flip
				</button>
				<button onClick$={() => (pokemonGame.reveal = !pokemonGame.reveal)} class="btn btn-primary mr-2">
					Reveal
				</button>
				<button onClick$={() => changePokemonId(1)} class="btn btn-primary">
					Next
				</button>
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: 'PokeQwik',
	meta: [
		{
			name: 'description',
			content: 'PokeQwik - A Qwik app for Pokemon',
		},
	],
};
