<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Loading from '$lib/components/glue/Loading.svelte';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import TextInput from '$lib/components/glue/TextInput.svelte';
	import imageCompression from 'browser-image-compression';

	export let data;

	let firstName = '';
	let lastName = '';
	let isUploadLoading = false;
	let avatarPath = '';
	let avatarUrl = '';
	let gradYear = '';
	let title = '';
	let major = '';
	let isSaveLoading: boolean = false;

	const uploadPhoto = async (event: Event & { currentTarget: HTMLInputElement }) => {
		isUploadLoading = true;
		const avatarFile = event?.currentTarget?.files?.[0];

		if (avatarFile) {
			const options = {
				maxSizeMB: 2,
				maxWidthOrHeight: 256,
				useWebWorker: true
			};

			const compressedFile = await imageCompression(avatarFile, options);

			console.log(compressedFile);
			const { data: photo, error } = await data?.supabase.storage
				.from('avatars')
				.upload(`${data?.session?.user?.id}/${avatarFile?.name}`, compressedFile, {
					cacheControl: '3600',
					upsert: true
				});

			console.log(photo);
			console.log(error);

			if (photo?.path) {
				avatarPath = photo?.path;
				const { data: publicUrlData } = data?.supabase.storage
					.from('avatars')
					.getPublicUrl(avatarPath);
				avatarUrl = publicUrlData?.publicUrl || '';
			}

			isUploadLoading = false;
		}
	};

	const saveProfile = async () => {
		isSaveLoading = true;

		const redirectTo = $page.url.searchParams.get('redirectTo');
		$page.url.searchParams.delete('redirectTo');
		const url = `${$page.url.origin}${redirectTo || '/'}`;

		await data?.supabase
			.from('profiles')
			.upsert({
				id: data?.session?.user?.id,
				firstName,
				lastName,
				gradYear,
				title,
				major,
				avatarUrl: avatarUrl
			})
			.single();

		await invalidateAll();
		goto(url);

		isSaveLoading = false;
	};
</script>

<PageContainer title="Set up your profile" layout="mobile-only">
	<div class="flex w-full justify-center">
		<div class="w-full md:max-w-md">
			<h1 class="text-4xl font-bold">Complete your profile</h1>
			<p class="mt-4 text-sm text-base-content/80">* indictates required field</p>
			<form class="mt-8">
				<div class="mt-3">
					<TextInput bind:value={firstName} label="First name*" required />
				</div>
				<div class="mt-3">
					<TextInput bind:value={lastName} label="Last name*" required />
				</div>
				<div class="mt-3">
					<TextInput bind:value={gradYear} label="Graduation year*" required placeholder="YYYY" />
					<p class="ml-1 mt-1.5 text-xs text-base-content/80">
						Please write out the full year, like "2024"
					</p>
				</div>
				<div class="mt-3">
					<TextInput bind:value={major} label="Major*" required />
					<p class="ml-1 mt-1.5 text-xs text-base-content/80">
						Please write out the full major name
					</p>
				</div>
				<div class="mt-3">
					<TextInput bind:value={title} label="Title / Position*" required />
					<p class="ml-1 mt-1.5 text-xs text-base-content/80">
						ex) Software Engineer, Designer, Product Manager, etc
					</p>
				</div>
				<div class="mt-8">
					<p class="ml-1 text-sm font-semibold text-base-content/90">Photo*</p>
					<input
						type="file"
						class="file-input file-input-bordered file-input-sm mt-4 w-full max-w-xs"
						required
						on:input={uploadPhoto}
						accept="image/png, image/jpeg" />
					{#if isUploadLoading}
						<div class="mt-4">
							<Loading />
						</div>
					{/if}
					{#if avatarPath}
						<div class="avatar mt-4">
							<div class="w-36 max-w-full rounded-xl border border-base-content/10">
								<img src={avatarUrl} alt="avatar" />
							</div>
						</div>
					{/if}
				</div>
				<button
					class="btn btn-primary mt-8"
					on:click={saveProfile}
					disabled={isUploadLoading || isSaveLoading}>
					{#if isSaveLoading}
						<span class="loading loading-spinner" />
					{/if}
					Save profile
				</button>
			</form>
		</div>
	</div>
</PageContainer>
