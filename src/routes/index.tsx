import { $, component$, useSignal } from '@builder.io/qwik';
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {
	const nav = useNavigate();
	const pokemonId = useSignal(1);
	const showBackImage = useSignal(false);
	const reveal = useSignal(false);

	const changePokemonId = $((value: number) => {
		if (pokemonId.value + value < 1) return;

		pokemonId.value += value;
		reveal.value = false;
	});

	const goToPokemon = $(() => nav(`/pokemon/${pokemonId.value}/`));

	return (
		<>
			<span class="text-2xl">Simple finder</span>

			<span class="text-9xl">{pokemonId}</span>

			<div onClick$={() => goToPokemon()}>
				<PokemonImage id={pokemonId.value} backImage={showBackImage.value} reveal={reveal.value} />
			</div>

			<div class="mt-2">
				<button onClick$={() => changePokemonId(-1)} class="btn btn-primary mr-2">
					Previous
				</button>
				<button onClick$={() => (showBackImage.value = !showBackImage.value)} class="btn btn-primary mr-2">
					Flip
				</button>
				<button onClick$={() => (reveal.value = !reveal.value)} class="btn btn-primary mr-2">
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
