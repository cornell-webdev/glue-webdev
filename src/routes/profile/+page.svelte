<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import Select from '$lib/components/glue/Select.svelte';
	import TextInput from '$lib/components/glue/TextInput.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	import Compressor from 'compressorjs';

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
	let isChangingPhoto = false;
	let isUploadLoading = false;

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

	const uploadPhoto = async (event: Event & { currentTarget: HTMLInputElement }) => {
		const avatarFile = event?.currentTarget?.files?.[0];
		if (!avatarFile) return;

		isUploadLoading = true;

		new Compressor(avatarFile, {
			quality: 0.6,
			convertSize: 1,
			success: async (compressedFile) => {
				try {
					const { data: photo, error: storageError } = await $page?.data?.supabase.storage
						.from('avatars')
						.upload(`${$page?.data?.session?.user?.id}/${avatarFile?.name}`, compressedFile, {
							cacheControl: '3600',
							upsert: true
						});
					if (storageError || !photo?.path) throw new Error();

					let avatarPath = photo?.path;
					const { data: publicUrlData } = $page?.data?.supabase.storage
						.from('avatars')
						.getPublicUrl(avatarPath);
					let avatarUrl = publicUrlData?.publicUrl || '';

					const { error: updateProfileError } = await supabase
						.from('profiles')
						.update({ avatarUrl })
						.eq('id', profile?.id)
						.select();

					if (updateProfileError) throw new Error(updateProfileError);

					toast.push('✅ Profile saved');
				} catch (error) {
					toast.push('❌ There was an error with saving your profile');
					// TODO: log error message on Sentry
				}

				isUploadLoading = false;
			},
			error(err) {
				toast.push('❌ There was an error with saving your profile');
				isUploadLoading = false;
			}
		});
	};
</script>

<PageContainer title="My profile" layout="mobile-only">
	<div class="flex w-full justify-center">
		<div class="w-full max-w-3xl ">
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
					<p class="text-lg font-bold">Photo</p>
					{#if isUploadLoading}
						<div class="flex h-40 w-40 items-center justify-center">
							<span class="loading loading-spinner loading-sm" />
						</div>
					{:else}
						<img class="mt-2 h-40 w-40 rounded object-cover" src={profile?.avatarUrl} />
					{/if}

					<div class="mt-4">
						{#if isChangingPhoto}
							<input
								type="file"
								class="file-input-bordered file-input file-input-sm w-full max-w-xs"
								required
								on:input={uploadPhoto}
								accept="image/png, image/jpeg" />
						{:else}
							<button
								class="btn-secondary btn-block btn-xs btn"
								on:click={() => {
									isChangingPhoto = true;
								}}>
								Change photo
							</button>
						{/if}
					</div>
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
