import { component$, useComputed$, useSignal, useTask$ } from '@builder.io/qwik';

interface Props {
	id: number | string;
	size?: number;
	backImage?: boolean;
	reveal?: boolean;
}

export const PokemonImage = component$(({ id, size = 200, backImage: backImage = false, reveal = false }: Props) => {
	const imageLoaded = useSignal(false);

	useTask$(({ track }) => {
		track(() => id);
		imageLoaded.value = false;
	});

	const imageUrl = useComputed$(() => {
		if (id === '') return '';

		return backImage
			? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
			: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
	});

	return (
		<div class="flex items-center justify-center" style={{ width: `${size}px`, height: `${size}px` }}>
			{!imageLoaded.value && <span class="text-2xl text-center">Loading...</span>}
			<img
				src={imageUrl.value}
				alt="Pokemon Sprite"
				width={200}
				height={200}
				style={{ width: `${size}px` }}
				onLoad$={() => (imageLoaded.value = true)}
				class={[{ hidden: !imageLoaded.value, 'brightness-0': !reveal }, 'transition-all']}
			/>
		</div>
	);
});
