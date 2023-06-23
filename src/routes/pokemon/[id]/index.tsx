import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
	const id = Number(params.id);

	if (isNaN(id)) redirect(301, '/');

	if (id < 1 || id > 1281) redirect(301, '/');

	return id;
});

export default component$(() => {
	const pokemonId = usePokemonId();
	const pokemonGame = useContext(PokemonGameContext);

	return (
		<>
			<span>Pokemon: {pokemonId}</span>

			<PokemonImage id={pokemonId.value} reveal={pokemonGame.reveal} backImage={pokemonGame.showBackImage} />
		</>
	);
});

export const head: DocumentHead = {
	title: 'Pokemon Detail',
};
