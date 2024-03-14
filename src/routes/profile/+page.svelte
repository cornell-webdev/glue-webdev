<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import Select from '$lib/components/glue/Select.svelte';
	import TextInput from '$lib/components/glue/TextInput.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';

	$: ({ profile, supabase } = $page.data);

	let firstName = '';
	let lastName = '';
	let cohort = '';
	let gradYear = '';
	let isActive = true;
	let major = '';
	let title = '';

	let gradYearOptions: { value: string; label: string }[] = [];
	let cohortOptions = [
		{ value: 'EBoard', label: 'EBoard' },
		{ value: 'EBoard Alumni', label: 'EBoard Alumni' }
	];
	let isSaveLoading = false;
	let startYear = 2023;

	// compute grad year options
	for (let i = 0; i < 8; i++) {
		gradYearOptions.push({
			label: String(startYear + i),
			value: String(startYear + i)
		});
		cohortOptions.push({
			label: `Fall ${String(startYear + i)}`,
			value: `Fall ${String(startYear + i)}`
		});
		cohortOptions.push({
			label: `Spring ${String(startYear + i)}`,
			value: `Spring ${String(startYear + i)}`
		});
	}

	onMount(() => {
		firstName = profile?.firstName;
		lastName = profile?.lastName;
		cohort = profile?.cohort;
		gradYear = String(profile?.gradYear);
		isActive = profile?.isActive;
		major = profile?.major;
		title = profile?.title;
	});

	const handleSave = async () => {
		isSaveLoading = true;

		const { error } = await supabase
			.from('profiles')
			.update({ firstName, lastName, cohort, gradYear, isActive, major, title })
			.eq('id', profile?.id)
			.select();

		if (error) toast.push('❌ There was an error with saving your profile');
		else toast.push('✅ Profile saved');
		invalidateAll();

		isSaveLoading = false;
	};
</script>

<PageContainer title="My profile" layout="mobile-only">
	<div class="flex w-full justify-center">
		<div class="w-full max-w-2xl ">
			<h1 class="mt-4 text-4xl font-extrabold">My profile</h1>
			<div class="mt-6 flex flex-wrap">
				<div class="mt-6 w-72 space-y-4">
					<TextInput label="First name" bind:value={firstName} />
					<TextInput label="Last name" bind:value={lastName} />
					<Select label="Graduation year" options={gradYearOptions} bind:value={gradYear} />
					<Select label="Cohort" options={cohortOptions} bind:value={cohort} />
					<TextInput label="Major" bind:value={major} />
					<TextInput label="Position title" bind:value={title} />
					<p class="text-xs text-base-content/70">ex) "Designer", "Software Engineer", "PM"</p>
				</div>
				<div class="mt-6 md:ml-24">
					<p class="text-lg font-medium">Photo</p>
					<img class="mt-2 h-40 w-40 rounded" src={profile?.avatarUrl} />
				</div>
			</div>

			<button class="btn-primary btn mt-10" disabled={isSaveLoading} on:click={handleSave}>
				{#if isSaveLoading}
					<span class="loading loading-spinner loading-sm" />
				{/if}
				Save profile
			</button>
		</div>
	</div>
</PageContainer>
