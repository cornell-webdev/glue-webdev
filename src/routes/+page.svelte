<script lang="ts">
	import SectionBoldStatement from '$lib/components/glue/landing/SectionBoldStatement.svelte';
	import SectionFadingCards from '$lib/components/glue/landing/SectionFadingCards.svelte';
	import SectionInfo from '$lib/components/glue/landing/SectionInfo.svelte';
	import SectionRotatingCirclesHero from '$lib/components/glue/landing/SectionRotatingCirclesHero.svelte';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import productLogosSrc from '$lib/assets/product-logos.png';
	import growthSrc from '$lib/assets/growth.svg';
	import logoCornletSrc from '$lib/assets/logo-cornlet.png';
	import logoRideHubSrc from '$lib/assets/logo-ridehub.png';
	import logoRsvpSrc from '$lib/assets/logo-rsvp.png';
</script>

<PageContainer title="Home">
	<SectionRotatingCirclesHero
		heroTopLine="Passion for"
		heroBottomLine="web development"
		desc="Cornell webdev is a software engineering team that is passionate about building performant web applications."
		linkLabel="Join us"
		linkHref="/join-us" />
	<SectionFadingCards
		heading="80+ web apps built"
		cardCols={[
			[
				{
					heading: 'Cornlet',
					subheading: 'Sublet marketplace',
					desc: 'Cornell University is a private research university that provides an exceptional education for undergraduates and graduate and professional students.',
					imagePath: logoCornletSrc
				},
				{
					heading: 'RSVP',
					subheading: 'Concert tickets',
					desc: 'Stanford University is a prestigious private research institution located in Stanford, California. Founded in 1885 by Leland and Jane Stanford, it is renowned for its top-notch academic programs, cutting-edge research, and world-class faculty. ',
					imagePath: logoRsvpSrc
				}
			],
			[
				{
					heading: 'RideHub',
					subheading: 'Carpool with students',
					desc: 'Yale University is a private Ivy League research university in New Haven, Connecticut. Founded in 1701, it is the third-oldest institution of higher education in the United States and one of the nine Colonial Colleges chartered before the American Revolution.',
					imagePath: logoRideHubSrc
				},
				{
					heading: 'ThriftHub',
					subheading: 'Thrifting marketplace',
					desc: 'Princeton University is a private Ivy League research university in Princeton, New Jersey. Founded in 1746 in Elizabeth as the College of New Jersey, Princeton is the fourth-oldest institution of higher education in the United States and one of the nine Colonial Colleges chartered before the American Revolution. ',
					imagePath: '/logo-princeton.png'
				}
			],
			[
				{
					heading: 'Gigaship',
					subheading: 'College job board',
					desc: 'The University of Pennsylvania is a private Ivy League research university located in Philadelphia, Pennsylvania. Founded in 1740, it is the fourth-oldest institution of higher education in the United States. ',
					imagePath: '/logo-penn.png'
				},
				{
					heading: 'ReferHub',
					subheading: 'Job referral matching',
					desc: 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636, it is the oldest institution of higher education in the United States and the first to be established in the New World.',
					imagePath: '/logo-harvard.jpg'
				}
			]
		]} />
	<SectionBoldStatement
		overline="Our philosophy"
		heading="Build fast, fail forward"
		desc="We don't believe in working on a project for 3 years and trying to deploy the perfect product."
		desc2="We want to deploy an MVP in 1-2 months, see how the market reacts, and iterate based on user analytics and feedback." />
	<SectionInfo
		overline="Step 1 - Team Matching"
		heading="Attend our team matching socials"
		desc="In the first few weeks of a semester, we host multiple team matching socials, where you can meet and interact with potential teammates for this semester cohort. " />
	<SectionInfo
		isReversed={true}
		overline="Step 2 - Application"
		heading="Apply as a team for the semester cohort"
		desc="With the teammates you formed during the team finding socials, apply as a team. We are looking for genuine passion in the idea, strong design and software engineering skills." />
	<SectionBoldStatement
		overline="Our belief"
		heading="We strive to be an inclusive team for everyone at Cornell"
		desc="We have a firm belief that if you're smart enough to get into Cornell, you're smart enough to build web apps. We don't require a resume or prior experience to join."
		desc2="We aim to accept at least 80% of the team applications we receive." />
	<SectionInfo
		overline="Step 3 - Build"
		heading="Build a web application with your team"
		desc="You will receive constant support and guidance from the mentors in our e-board. We prioritize speed and agility. Our philosophy is to build, launch, and iterate based on user feedback."
		photoPath={productLogosSrc} />
	<SectionInfo
		isReversed={true}
		overline="Step 4 - Demo"
		heading="Complete a MVP by the end of the semester"
		desc="Each team has their own, flexible timeline, but we still highly encourage all teams to at least deploy a MVP by the end of the semester."
		photoPath={growthSrc} />
	<!-- <SectionInfo
		overline="Step 5 - Join the e-board"
		heading="Invitation to join the executive board"
		desc="Those who successfully complete their project as a cohort member will be invited to join the executive board. They will be given leadership positions to mentor future cohorts of passionate designers and engineers." /> -->
	<!-- TODO: stats section -->
	<SectionBoldStatement
		overline="Join us"
		heading="Ready to join our driven team of engineers and designers?"
		desc="Cornell webdev is a software engineering team at Cornell that aims to build performant web applications."
		linkLabel="Join us"
		linkHref="/join-us" />
</PageContainer>
