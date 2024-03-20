<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import cornletHomeSrc from '$lib/assets/cornlet-home.jpg';
	import cornletIconSrc from '$lib/assets/cornlet-icon.svg';
	import IconOpenInNew from '$lib/icons/glue/IconOpenInNew.svelte';
	import Saos from 'saos';

	let element;
	let intersecting;
	let brandColor = '144,49,49';
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
		style="--brand-color: {brandColor}; --shadow-dark: #000212;">
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

				<p class="mt-6 w-[80%] text-center text-sm leading-relaxed text-base-content/70">
					Cornlet is a web-based platform where Cornell students can advertise or look for sublets.
					Finding a sublet doesn't have to be a hassle.
				</p>

				<div class="mt-10">
					<a href="https://www.cornlet.com" target="_blank" rel="noreferrer">
						<button class="btn-secondary btn-sm btn text-xs">
							Visit Cornlet <IconOpenInNew />
						</button>
					</a>
				</div>
			</div>

			<IntersectionObserver {element} bind:intersecting threshold={0.5}>
				<div bind:this={element} />
			</IntersectionObserver>

			<div class="mt-20 flex w-full justify-center">
				<img class="w-[80%] rounded-xl" src={cornletHomeSrc} />
			</div>

			<Saos animation={'fade-in 0.5s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'} once={false}>
				<div class="mt-48 max-w-lg px-6">
					<p
						class="mx-auto mt-10 max-w-xl text-center text-lg font-normal leading-relaxed text-base-content/70 md:text-lg">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente velit mollitia
						repellendus illum pariatur atque repellat qui, cum fugit iste.
					</p>

					<p
						class="mx-auto mt-10 max-w-xl text-center text-lg font-normal leading-relaxed text-base-content/70 md:text-lg">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente velit mollitia
						repellendus illum pariatur atque repellat qui, cum fugit iste.
					</p>
				</div>
			</Saos>
		</div>
	</section>
</div>
