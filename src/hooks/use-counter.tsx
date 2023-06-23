import { $, useComputed$, useSignal } from '@builder.io/qwik';

export const useCounter = (initialValue: number = 0) => {
	const counter = useSignal(initialValue);

	const increase = $(() => counter.value++);

	const decrease = $(() => counter.value > 0 && counter.value--);

	return { counter: useComputed$(() => counter.value), increase, decrease };
};
