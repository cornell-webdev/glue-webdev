<script>
	import { page } from '$app/stores';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import SectionBoldStatement from '$lib/components/glue/landing/SectionBoldStatement.svelte';
	import Saos from 'saos';
	import Product from '$lib/components/Product.svelte';

	$: ({ projects } = $page.data);
</script>

<PageContainer title="Projects" isHoriPadding={false}>
	<SectionBoldStatement
		overline="Our projects"
		heading="We've built so many things out of interest and passion"
		desc="Our projects are either solving critical problems for the Cornell community or were a fun experience to build something cool " />

	<Product />
</PageContainer>
