import { $, component$, useContext, useOnDocument, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonListContext } from '~/context';
import { getSmallPokemons } from '~/helpers/get-pokemons';

export default component$(() => {
	const pokemonState = useContext(PokemonListContext);

	useTask$(async ({ track }) => {
		track(() => pokemonState.page);

		const pokemons = await getSmallPokemons(pokemonState.page * 30, 30);

		// Prevent duplicates when scrolling fast
		if (pokemons.some((pokemon) => pokemonState.pokemons.some((p) => p.id === pokemon.id))) return;

		pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
		pokemonState.isLoading = false;
	});

	useVisibleTask$(() => {
		window.scrollTo(0, pokemonState.pagePosition);
	});

	useOnDocument(
		'scroll',
		$(() => {
			const maxScroll = document.body.scrollHeight - window.innerHeight;
			const currentScroll = window.scrollY + 200;

			if (currentScroll >= maxScroll && !pokemonState.isLoading) {
				pokemonState.isLoading = true;
				pokemonState.page++;
				pokemonState.pagePosition = window.scrollY;
			}
		})
	);

	return (
		<>
			<div class="flex flex-col space-y-3">
				<span class="mt-5 text-5xl">Status</span>
				<span>Current page: {pokemonState.page}</span>
			</div>

			<div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
				{pokemonState.pokemons.map(({ name, id }) => (
					<div key={id} class="m-5 flex flex-col justify-center items-center">
						<PokemonImage id={id} reveal />
						<span class="capitalize">{name}</span>
					</div>
				))}

				{pokemonState.isLoading && (
					<div class="py-10 m-5 flex flex-col justify-center items-center">
						<div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
						<span class="capitalize">Loading...</span>
					</div>
				)}
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: 'Client Pokemons List',
};
