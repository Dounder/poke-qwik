import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';

import Navbar from '~/components/shared/navbar/navbar';

import { PokemonProvider } from '~/context';
import styles from './styles.css?inline';

export const onGet: RequestHandler = async ({ cacheControl }) => {
	cacheControl({
		staleWhileRevalidate: 60 * 60 * 24 * 7,

		maxAge: 5,
	});
};

export const useServerTimeLoader = routeLoader$(() => {
	return {
		date: new Date().toISOString(),
	};
});

export default component$(() => {
	useStyles$(styles);

	return (
		<PokemonProvider>
			<Navbar />
			<main class="flex flex-col items-center justify-center">
				<Slot />
			</main>
		</PokemonProvider>
	);
});
