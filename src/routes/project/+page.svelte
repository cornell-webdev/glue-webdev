<script>
	// import { page } from '$app/stores';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import SectionBoldStatement from '$lib/components/glue/landing/SectionBoldStatement.svelte';
	import Product from '$lib/components/Product.svelte';
	import cornletHomeSrc from '$lib/assets/cornlet-home.jpg';
	import cornletIconSrc from '$lib/assets/cornlet-icon.svg';
	import revyIconSrc from '$lib/assets/revy-icon.svg';
	import revyHomeSrc from '$lib/assets/revy-home.jpg';

	// TODO: make projects dynamic based on database
	// $: ({ projects } = $page.data);
</script>

<PageContainer title="Projects" isHoriPadding={false} limitWidth={false}>
	<div data-theme="dark">
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
					title: 'New feature here',
					desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, dolores!',
					imgSrc: cornletHomeSrc
				},
				{
					title: 'New feature here',
					desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, dolores!',
					imgSrc: cornletHomeSrc
				},
				{
					title: 'New feature here',
					desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, dolores!',
					imgSrc: cornletHomeSrc
				},
				{
					title: 'New feature here',
					desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, dolores!',
					imgSrc: cornletHomeSrc
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
					title: 'New feature here',
					desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, dolores!',
					imgSrc: cornletHomeSrc
				},
				{
					title: 'New feature here',
					desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, dolores!',
					imgSrc: cornletHomeSrc
				},
				{
					title: 'New feature here',
					desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, dolores!',
					imgSrc: cornletHomeSrc
				},
				{
					title: 'New feature here',
					desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, dolores!',
					imgSrc: cornletHomeSrc
				}
			]} />
	</div>
</PageContainer>
