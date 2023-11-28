<script lang="ts">
	import { page } from '$app/stores';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import SectionHero from '$lib/components/glue/landing/SectionHero.svelte';
	import groupPhotoSrc from '$lib/assets/group-photo-md.png';

	$: ({ profiles } = $page.data);
</script>

<PageContainer>
	<SectionHero
		heroTopLine="Our passionate members"
		heroBottomLine="meet the core team"
		descTopLine="We're a team of driven, diverse group of Cornell students,"
		descBottomLine="passionate about building performant web applications"
		mainImageSrc={groupPhotoSrc} />

	<h2 class="text-4xl font-extrabold">Members</h2>
	<div class="mt-6 flex flex-wrap justify-start">
		{#each profiles as profile}
			<div class="w-1/2 py-6 pr-6 md:w-1/3 lg:w-1/4">
				<img
					class="h-[280px] w-full overflow-hidden rounded-lg object-cover "
					src={profile?.avatarUrl}
					loading="lazy" />
				<p class="mt-3 text-lg font-semibold">{profile?.firstName} {profile?.lastName}</p>
				<p class="text-sm text-base-content/80">{profile?.title}</p>
			</div>
		{/each}
	</div>
	</div>
</PageContainer>
