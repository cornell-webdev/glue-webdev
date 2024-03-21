<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import cornletHomeSrc from '$lib/assets/cornlet-home.jpg';
	import cornletIconSrc from '$lib/assets/cornlet-icon.svg';
	import IconOpenInNew from '$lib/icons/glue/IconOpenInNew.svelte';
	import RadialGradient from './glue/landing/RadialGradient.svelte';

	let element;
	let intersecting;
	let brandColor = '144,49,49';
	let brandColorBright = '235,55,55';
	let features = [
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
	];
</script>

<div class="my-[6rem]">
	<section
		class="{intersecting
			? 'is-visible before:opacity-100 before:[transform:rotate(180deg)_scale(3)] md:before:[transform:rotate(180deg)_scale(2)]'
			: 'before:rotate-180 before:opacity-40'}
    is-visible after:bg-[radial-gradient(ellipse_100%_40%_at_50%_60%,var(--brand-color),transparent) relative flex flex-col items-center
  overflow-x-clip before:pointer-events-none before:absolute before:h-[400px] before:w-full
  before:bg-[conic-gradient(from_90deg_at_80%_50%,var(--shadow-dark),rgb(var(--brand-color))),conic-gradient(from_270deg_at_20%_50%,rgb(var(--brand-color)),var(--shadow-dark))]
  before:bg-no-repeat before:opacity-100 before:transition-[transform,opacity] before:duration-500 before:ease-in
  before:[mask:radial-gradient(100%_50%_at_center_center,_black,_transparent)] before:[background-size:50%_100%,50%_100%]
  before:[background-position:1%_0%,99%_0%] after:pointer-events-none after:absolute
  after:inset-0"
		style="--brand-color: {brandColor}; --shadow-dark: #000212; --brand-color-bright: {brandColorBright};">
		<div class="z-10 mt-[6rem] mb-16">
			<div
				class="{intersecting
					? 'translate-y-0'
					: 'translate-y-[3rem]'} flex w-full flex-col items-center pt-[12rem] [transition:transform_1000ms_cubic-bezier(0.3,_1.17,_0.55,_0.99)_0s] ">
				<div class="flex items-center space-x-2 rounded-full bg-base-100 py-2 px-4 opacity-80">
					<img class="h-4 w-4 rounded-full" src={cornletIconSrc} />
					<p class="text-xs">Cornlet</p>
				</div>

				<h2
					class="mt-4 text-center text-4xl font-extrabold !leading-tight tracking-tight md:text-6xl">
					Subletting has
					<br />
					never been easier
				</h2>

				<p
					class="mt-6 w-[80%] max-w-lg text-center text-sm leading-relaxed text-base-content/70 md:text-lg">
					Cornlet is a web-based platform where Cornell students can advertise or look for sublets.
					Finding a sublet doesn't have to be a hassle.
				</p>

				<div class="mt-10">
					<a href="https://www.cornlet.com" target="_blank" rel="noreferrer">
						<button class="btn-secondary btn-sm btn text-xs md:btn-md">
							Visit Cornlet <IconOpenInNew />
						</button>
					</a>
				</div>

				<IntersectionObserver {element} bind:intersecting threshold={0.5}>
					<div bind:this={element} />
				</IntersectionObserver>

				<img class="mt-20 w-[80%] max-w-2xl rounded-xl" src={cornletHomeSrc} />

				<h2
					class="mt-48 text-center text-4xl font-extrabold !leading-tight tracking-tight md:text-5xl">
					Subletting is no
					<br />
					longer a hassle
				</h2>

				<p
					class="mt-8 w-[70%] max-w-xl text-center text-sm leading-relaxed text-base-content/70 md:text-lg">
					Cornlet allows Cornell students to give and find sublets on a centralized, web-based
					platform.
				</p>

				<div class="hidden md:block">
					<RadialGradient placement="left" />
				</div>

				<div class="mt-18 flex w-full justify-center">
					<div class=" grid w-full max-w-4xl grid-cols-1 gap-8 px-4 md:grid-cols-2">
						{#each features as feature}
							<div
								class="relative h-[400px] w-full overflow-hidden rounded-xl border
          border-base-content/20 bg-base-200 px-8 pt-10 after:absolute
          after:inset-0 after:box-border after:rounded-xl after:border after:border-[rgb(var(--brand-color-bright))]
          after:[mask-image:linear-gradient(to_bottom_right,_black_0%,_transparent_40%,_transparent_60%,_black_100%)]">
								<p class="text-2xl font-extrabold leading-tight text-base-content/90">
									{feature?.title}
								</p>
								<p class="text-md mt-3 leading-tight text-base-content/70">
									{feature?.desc}
								</p>
								<img
									class="width-[200%] mt-12 max-w-[200%] rounded-xl border border-base-content/10 opacity-90"
									src={feature?.imgSrc} />
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
