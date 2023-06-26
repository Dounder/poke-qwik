import { Slot, component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import Navbar from '~/components/shared/navbar/navbar';

export const useCheckAuthCookie = routeLoader$(({ cookie, redirect }) => {
	const jwt = cookie.get('jwt');

	if (!jwt) redirect(302, '/login');

	console.log('jwt', jwt);
});

export default component$(() => {
	return (
		<>
			<Navbar />

			<div class="flex-center mt-5">
				<span class="text-5xl">Dashboard Layout</span>

				<Slot />
			</div>
		</>
	);
});
