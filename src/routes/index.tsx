import { $, component$ } from '@builder.io/qwik';
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export default component$(() => {
	const nav = useNavigate();
	const { pokemonId, reveal, showBackImage, previousPokemon, nextPokemon, flipPokemon, toggleReveal } = usePokemonGame();

	const goToPokemon = $(() => nav(`/pokemon/${pokemonId.value}/`));

	return (
		<>
			<span class="text-2xl">Simple finder</span>

			<span class="text-9xl">{pokemonId.value}</span>

			<div onClick$={() => goToPokemon()}>
				<PokemonImage id={pokemonId.value} backImage={showBackImage.value} reveal={reveal.value} />
			</div>

			<div class="mt-2">
				<button onClick$={previousPokemon} class="btn btn-primary mr-2">
					Previous
				</button>
				<button onClick$={flipPokemon} class="btn btn-primary mr-2">
					Flip
				</button>
				<button onClick$={toggleReveal} class="btn btn-primary mr-2">
					Reveal
				</button>
				<button onClick$={nextPokemon} class="btn btn-primary">
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
