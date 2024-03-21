<script>
	// import { page } from '$app/stores';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import SectionBoldStatement from '$lib/components/glue/landing/SectionBoldStatement.svelte';
	import Product from '$lib/components/Product.svelte';
	import cornletHomeSrc from '$lib/assets/cornlet-home.jpg';
	import cornletIconSrc from '$lib/assets/cornlet-icon.svg';
	import cornletFeature1Src from '$lib/assets/cornlet-feature-1.jpg';
	import cornletFeature2Src from '$lib/assets/cornlet-feature-2.jpg';
	import cornletFeature3Src from '$lib/assets/cornlet-feature-3.jpg';
	import cornletFeature4Src from '$lib/assets/cornlet-feature-4.jpg';
	import revyIconSrc from '$lib/assets/revy-icon.svg';
	import revyHomeSrc from '$lib/assets/revy-home.jpg';
	import revyFeature1Src from '$lib/assets/revy-feature-1.jpg';
	import revyFeature2Src from '$lib/assets/revy-feature-2.jpg';
	import revyFeature3Src from '$lib/assets/revy-feature-3.jpg';
	import revyFeature4Src from '$lib/assets/revy-feature-4.jpg';

	// TODO: make projects dynamic based on database
	// $: ({ projects } = $page.data);
</script>

<div data-theme="dark">
	<PageContainer title="Projects" isHoriPadding={false} limitWidth={false}>
		<div class="pb-[20rem]">
			<SectionBoldStatement
				overline="Our projects"
				heading="We've built so many things out of interest and passion"
				desc="Our projects are either solving critical problems for the Cornell community or were a fun experience to build something cool " />

			<!-- Cornlet -->
			<Product
				projectName="Cornlet"
				mainTitle="Subletting has never been easier"
				brandColorRGB="144,49,49"
				brandColorBrightRGB="235,55,55"
				iconUrl={cornletIconSrc}
				description="Cornlet is a web-based platform where Cornell students can advertise or look for sublets. Finding a sublet doesn't have to be a hassle."
				link="https://www.cornlet.com"
				imgUrl={cornletHomeSrc}
				secondTitle="A new and better way to sublet your place"
				features={[
					{
						title: 'Browse sublets',
						desc: 'Explore a diverse array of available sublet options, ranging from cozy apartments to spacious homes.',
						imgSrc: cornletFeature1Src
					},
					{
						title: 'Find your perfect sublet',
						desc: 'Discover the ideal sublet tailored to your preferences and needs.',
						imgSrc: cornletFeature2Src
					},
					{
						title: 'Sign it before everyone else',
						desc: 'The sublet market can get competitive, especially for good deals.',
						imgSrc: cornletFeature3Src
					},
					{
						title: 'Keep your location private',
						desc: 'Keep your address secret to the public, until someone messages you.',
						imgSrc: cornletFeature4Src
					}
				]} />

			<!-- Revy -->
			<Product
				projectName="Revy"
				mainTitle="Find a carpool in minutes, not days"
				brandColorRGB="49,118,246"
				brandColorBrightRGB="33,79,164"
				iconUrl={revyIconSrc}
				description="Revy is a carpooling platform for Cornellians. Travel no longer has to be a financial burden with Revy."
				link="https://www.revycarpool.com"
				imgUrl={revyHomeSrc}
				secondTitle="Cut your travel costs by half with Revy"
				features={[
					{
						title: '@cornell.edu required',
						desc: 'Revy restricts all users to those with a @cornell.edu email.',
						imgSrc: revyFeature1Src
					},
					{
						title: 'Post with a few clicks',
						desc: 'Posting a carpool on Revy only takes a few clicks.',
						imgSrc: revyFeature2Src
					},
					{
						title: 'Approve or decline passengers',
						desc: 'As a driver, you have the freedom to approve passengers.',
						imgSrc: revyFeature3Src
					},
					{
						title: 'Find carpools on your terms',
						desc: 'Search for carpools on your route for your preferred date.',
						imgSrc: revyFeature4Src
					}
				]} />
		</div>
	</PageContainer>
</div>
