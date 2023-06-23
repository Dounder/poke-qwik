import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, routeLoader$, useLocation, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-pokemons';
import type { SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ query, redirect, pathname }) => {
	const offset = Number(query.get('offset') || '0');

	if (offset < 0) redirect(301, pathname);
	if (isNaN(offset)) redirect(301, pathname);

	return getSmallPokemons(offset);
});

export default component$(() => {
	const pokemons = usePokemonList();
	const location = useLocation();
	const offset = useComputed$<number>(() => {
		const offset = Number(location.url.searchParams.get('offset') || '0');

		if (offset < 0) return 0;
		if (isNaN(offset)) return 0;

		return offset;
	});

	return (
		<>
			<div class="flex flex-col space-y-3">
				<span class="mt-5 text-5xl">Status</span>
				<span>Current offset: {offset}</span>
				<span>Browsing: {location.isNavigating ? 'true' : 'false'}</span>
			</div>

			<div class="mt-10 space-x-3">
				<Link href={`/pokemons/list-ssr/?offset=${offset.value - 10}`} class="btn btn-primary">
					Previous
				</Link>
				<Link href={`/pokemons/list-ssr/?offset=${offset.value + 10}`} class="btn btn-primary">
					Next
				</Link>
			</div>

			<div class="grid grid-cols-6 mt-5">
				{pokemons.value.map(({ name, id }) => (
					<div key={name} class="m-5 flex flex-col justify-center items-center">
						<PokemonImage id={id} reveal />
						<span class="capitalize">{name}</span>
					</div>
				))}
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: 'SSR Pokemon List',
};
