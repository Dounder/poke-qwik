import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
	const id = Number(params.id);

	if (isNaN(id)) redirect(301, '/');

	if (id < 1 || id > 1281) redirect(301, '/');

	return id;
});

export default component$(() => {
	const pokemonId = usePokemonId();

	return (
		<>
			<span>Pokemon: {pokemonId}</span>

			<PokemonImage id={pokemonId.value} reveal />
		</>
	);
});

export const head: DocumentHead = {
	title: 'Pokemon Detail',
};
