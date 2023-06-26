import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
	const id = Number(params.id);

	if (isNaN(id)) redirect(301, '/');

	if (id < 1 || id > 1281) redirect(301, '/');

	return id;
});

export default component$(() => {
	const pokemonId = usePokemonId();
	const { reveal, showBackImage, toggleReveal, flipPokemon } = usePokemonGame();

	return (
		<>
			<span>Pokemon: {pokemonId}</span>

			<PokemonImage id={pokemonId.value} reveal={reveal.value} backImage={showBackImage.value} />

			<div class="mt-2">
				<button onClick$={flipPokemon} class="btn btn-primary mr-2">
					Flip
				</button>
				<button onClick$={toggleReveal} class="btn btn-primary mr-2">
					Reveal
				</button>
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: 'Pokemon Detail',
};
