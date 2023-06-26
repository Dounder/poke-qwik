import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, routeAction$, zod$, z } from '@builder.io/qwik-city';

import styles from './login.css?inline';

export const useLoginUserAction = routeAction$(
	(data, { cookie, redirect }) => {
		const { email, password } = data;

		if (email !== 'glasdou@gmail.com' || password !== '123123')
			return { success: false, message: 'Email and password are required' };

		cookie.set('jwt', '123456789', { secure: true, path: '/' });
		redirect(302, '/');

		return { success: true, message: 'Login success', jwt: '123456789' };
	},
	zod$({
		email: z.string().email(),
		password: z.string().min(6),
	})
);

export default component$(() => {
	useStylesScoped$(styles);
	const action = useLoginUserAction();

	return (
		<Form action={action} class="login-form mt-5">
			<div class="relative">
				<input name="email" type="text" placeholder="Email address" />
				<label for="email">Email Address</label>
			</div>
			<div class="relative">
				<input name="password" type="password" placeholder="Password" />
				<label for="password">Password</label>
			</div>
			<div class="relative">
				<button type="submit">Ingresar</button>
			</div>
			{action.value?.success && <code>Authenticated: {action.value.jwt}</code>}

			<code>{JSON.stringify(action.value, null, 2)}</code>
		</Form>
	);
});
