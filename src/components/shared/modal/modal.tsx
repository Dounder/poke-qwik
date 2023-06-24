import { type PropFunction, Slot, component$, useStylesScoped$, $ } from '@builder.io/qwik';
import ModalStyles from './modal.css?inline';

interface Props {
	show: boolean;
	closeFn: PropFunction<() => void>;
	persistent?: boolean;
	size?: 'sm' | 'md' | 'lg';
}

export const Modal = component$(({ show, closeFn, persistent = false, size = 'md' }: Props) => {
	useStylesScoped$(ModalStyles);

	return (
		<div onClick$={persistent ? $(() => {}) : closeFn} class={show ? 'modal-background' : 'hidden'}>
			<div class={['modal-content', `modal-${size}`]} onClick$={(e) => e.stopPropagation()}>
				<div class="mt-3 text-center">
					<h3 class="modal-title">
						<Slot name="title" />
					</h3>

					<div class="mt-2 px-7 py-3">
						<div class="modal-content-text">
							<Slot name="content" />
						</div>
					</div>

					<div class="items-center">
						<button onClick$={closeFn} class="modal-button">
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
});
