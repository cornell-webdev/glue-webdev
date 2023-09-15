<script lang="ts">
	export let showModal: boolean;

	export let modalID: string = '';

	let thisModal: HTMLDialogElement;

	$: if (thisModal && showModal) thisModal.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={thisModal}
	on:close={() => (showModal = false)}
	on:click|self={() => thisModal.close()}
	class="modal"
	id={modalID}>
	<div class="modal-box outline-none">
		<slot />

		<form method="dialog">
			<div class="modal-action mt-4">
				<button class="btn-neutral btn-block btn">Close</button>
			</div>
		</form>
	</div>
</dialog>
