import { $, component$, useOnDocument, useStore, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

import { getSmallPokemons } from '~/helpers/get-pokemons';
import type { SmallPokemon } from '~/interfaces';

interface PokemonState {
	page: number;
	pokemons: SmallPokemon[];
	isLoading: boolean;
}

export default component$(() => {
	const pokemonState = useStore<PokemonState>({
		pokemons: [],
		page: 0,
		isLoading: false,
	});

	useTask$(async ({ track }) => {
		track(() => pokemonState.page);

		const pokemons = await getSmallPokemons(pokemonState.page * 10, 30);
		pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
		pokemonState.isLoading = false;
	});

	useOnDocument(
		'scroll',
		$(() => {
			const maxScroll = document.body.scrollHeight - window.innerHeight;
			const currentScroll = window.scrollY + 200;

			if (currentScroll >= maxScroll && !pokemonState.isLoading) {
				pokemonState.isLoading = true;
				pokemonState.page++;
			}
		})
	);

	return (
		<>
			<div class="flex flex-col space-y-3">
				<span class="mt-5 text-5xl">Status</span>
				<span>Current page: {pokemonState.page}</span>
				<span>Browsing: {}</span>
			</div>

			<div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
				{pokemonState.pokemons.map(({ name, id }) => (
					<div key={id} class="m-5 flex flex-col justify-center items-center">
						<PokemonImage id={id} reveal />
						<span class="capitalize">{name}</span>
					</div>
				))}
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: 'Client Pokemons List',
};
