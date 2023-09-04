<script lang="ts">
	import { page } from '$app/stores';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import SectionHero from '$lib/components/glue/landing/SectionHero.svelte';

	$: ({ profiles, legacyProfiles } = $page.data);
</script>

<PageContainer>
	<SectionHero
		heroTopLine="Our passionate members"
		heroBottomLine="meet the core team"
		descTopLine="We're a team of driven, diverse group of Cornell students,"
		descBottomLine="passionate about building performant web applications" />

	<h2 class="text-4xl font-extrabold">Members</h2>
	<div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
		{#each profiles as profile}
			<div class="">
				<img
					class="h-[160px] w-[200px] overflow-hidden rounded-lg object-cover"
					width="200"
					height="200"
					src={profile?.avatarUrl}
					loading="eager" />
				<p class="mt-2 font-semibold">{profile?.firstName} {profile?.lastName}</p>
				<p class="text-sm text-base-content/80">{profile?.title}</p>
			</div>
		{/each}
	</div>

	<h2 class="mt-16 text-4xl font-extrabold">Alumni</h2>
	<div class="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
		{#each legacyProfiles as profile}
			<div class="">
				<img
					class="h-[160px] w-[200px] overflow-hidden rounded-lg object-cover"
					width="200"
					height="200"
					src={profile?.avatarUrl}
					loading="lazy" />
				<p class="mt-2 font-semibold">{profile?.firstName} {profile?.lastName}</p>
				<p class="text-sm text-base-content/80">{profile?.title}</p>
			</div>
		{/each}
	</div>
</PageContainer>
