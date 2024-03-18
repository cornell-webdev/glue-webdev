<script lang="ts">
	import * as yup from 'yup';

	import SectionInput from '$lib/components/glue/form/SectionInput.svelte';
	import MultiSelect from '$lib/components/glue/form/Multiselect.svelte';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import photoPath from '$lib/assets/product-logos.png';
	import { goto, invalidateAll } from '$app/navigation';
	import imageCompression from 'browser-image-compression';
	import { onMount } from 'svelte';
	import { toast } from '@zerodevx/svelte-toast';

	import type {Member, ErrorType, Project, ProjectFormValues} from '$lib/types/project';

	// img storage paths
	let imgPath = '';
	let imgUrl = '';

	let createErrorStates = {
		nameError: false,
		imgError: false,
		duplicateProject: false
	} as ErrorType;

	// file data
	let selectedImage: string | null = null;
	let fileInput: HTMLInputElement | null = null;

	let submitting = false;

	// supabase data
	export let data;

	let members: Member[] | undefined = [];

	let projectFormValues = {
		selectedMembers: [],
		projectName: '',
		projectDescription: '',
		projectImage: ''
	} as ProjectFormValues;

	const createSchema = yup.object().shape({
		members: yup.array().of(
			yup.object().shape({
				value: yup.string().required(),
				label: yup.string().required(),
				canRemove: yup.boolean().required()
			})
		),
		projectName: yup
			.string()
			.required('Project name is required')
			.min(3, 'Project name must be at least 3 characters long'),
		projectDescription: yup.string(),
		projectImage: yup.string().required('Project image is required')
	});

	onMount(async () => {
		const { data: allMembers } = await data?.supabase
			.from('profiles')
			.select('id,firstName, lastName');

		members = allMembers?.map((member) => ({
			value: member.id,
			label: `${member.firstName} ${member.lastName}`,
			canRemove: true
		}));

		const { data: currentMember } = await data?.supabase
			.from('profiles')
			.select('id,firstName, lastName')
			.eq('id', data?.session?.user.id);

		projectFormValues.selectedMembers = currentMember?.map((member) => ({
			value: member.id,
			label: `${member.firstName} ${member.lastName}`,
			canRemove: false
		})) ?? [];
	});

	// handle image upload
	const handleImgChange = async (): Promise<void> => {
		if (fileInput && fileInput.files && fileInput.files.length > 0) {
			const file = fileInput.files[0];
			if (file) {
				const reader = new FileReader();

				reader.onload = function (e) {
					if (e.target && e.target.result) {
						selectedImage = e.target.result as string;
						createErrorStates.imgError = false;
					}
				};

				reader.readAsDataURL(file);
			} 
		} else {
			createErrorStates.imgError = true;
		}
	};

	// handle image compression and upload
	const uploadPhoto = async (projName: string, imgFile: File): Promise<string | undefined> => {
		if (imgFile) {
			const options = {
				maxSizeMB: 2,
				maxWidthOrHeight: 256,
				useWebWorker: true
			};

			const compressedFile = await imageCompression(imgFile, options);

			const { data: photo, error } = await data?.supabase.storage
				.from('projects')
				.upload(`${projName}.${compressedFile.type.split('/')[1]}`, compressedFile, {
					cacheControl: '3600',
					upsert: true
				});

			if (error) {
				console.error('Upload error:', error);
				return undefined;
			}

			if (photo?.path) {
				imgPath = photo?.path;
				const { data: publicUrlData } = data?.supabase.storage
					.from('projects')
					.getPublicUrl(imgPath);
				imgUrl = publicUrlData?.publicUrl;

				return imgUrl;
			}
		}
	};

	async function handleProjectMembers(projectId: string) {
		const membersToAdd = projectFormValues.selectedMembers
		const newRelations = membersToAdd.map((member) => ({
			profile_id: member.value,
			project_id: projectId
		}));

		if (newRelations.length > 0) {
			const { error: insertError } = await data?.supabase
				.from('projectuserrelation')
				.insert(newRelations);

			if (insertError) throw insertError;
		}
	}

	async function handleProjectCreate() {
		submitting = true;

		try {

			if (projectFormValues.projectName) {
				createErrorStates.nameError = false;
				const { data: duplicateData } = await data?.supabase
					.from('projects')
					.select('name')
					.eq('name', projectFormValues.projectName);

				if (duplicateData && duplicateData.length > 0) {
					createErrorStates.duplicateProject = true;
				} else {
					createErrorStates.duplicateProject = false;
				}
			} else {
				createErrorStates.nameError = true;
			}

			
			if (fileInput && fileInput.files && fileInput.files.length > 0) {
				const file = fileInput.files[0];

				if (file && projectFormValues.projectName) {
					const imageUrl = await uploadPhoto(projectFormValues.projectName, file);

					if (imageUrl) {
						projectFormValues.projectImage = imageUrl;
						createErrorStates.imgError = false;
					} 
				}
			} else {
				createErrorStates.imgError = true;
				throw new Error('Image upload error');
			}

			// validate the form data after img is added
			await createSchema.validate(projectFormValues, { abortEarly: false });

			if (
				createErrorStates.nameError ||
				createErrorStates.imgError ||
				createErrorStates.duplicateProject
			) {
				throw new Error('Validation error');
			}

			const { data: createdData, error: updateError } = await data?.supabase
				.from('projects')
				.insert({
					name: projectFormValues.projectName,
					description: projectFormValues.projectDescription,
					imgUrl: projectFormValues.projectImage
				}).select();
		
			if (updateError) throw updateError;
			

			await handleProjectMembers(createdData[0].id);

			toast.push('✅ Your project was successfully created');
			await goto(`/project/${createdData[0].id}`);
		} catch (error) {
			toast.push(`❌ Error creating project`, {
				theme: { '--toastBackground': '#F56565', '--toastBarBackground': '#C53030' }
			});
		} finally {
			submitting = false;
		}
	}

</script>

<PageContainer title="About us" isHoriPadding={false}>
	<div class="flex w-full flex-row items-start justify-evenly">
		<!-- image section -->
		<div class="max-w-1/3 relative mt-48 flex w-2/3">
			<div class="bg-gradient absolute inset-0 origin-bottom-right rotate-3 transform rounded-lg" />
			<div class="z-10 overflow-hidden rounded-lg bg-white p-3 py-24 shadow-lg md:p-6">
				<img src={photoPath} width="1092" height="878" alt="Calendar overlay" loading="lazy" />
			</div>
		</div>

		<div class="ml-24 mt-8 flex w-2/3 flex-col gap-2 p-16">
			<!-- heading -->
			<h3 class="text-base font-semibold text-primary">{'Application → Build'}</h3>
			<h1 class="text-3xl font-bold">Create a New Project</h1>
			<p class=" mt-1 text-sm text-base-content/80">* indictates required field</p>

			<!-- form section -->
			<div class="flex w-full max-w-full flex-col gap-2 py-2">
				<div class="flex flex-row items-end justify-center gap-4">
					<div class="form-control w-full gap-1" />
				</div>

				<MultiSelect
					options={members || []}
					bind:selectedOptions={projectFormValues.selectedMembers}
					heading="Members"
					placeholder="Search Members" />

				<SectionInput
					heading="Name"
					type="text"
					placeholder="Name"
					required={true}
					on:input={(e) => (projectFormValues.projectName = e.detail)}
					inputName="projName"
					showError={createErrorStates.nameError || createErrorStates.duplicateProject}
					errorLabel={createErrorStates.nameError
						? 'Enter a valid Project Name'
						: createErrorStates.duplicateProject
						? 'Duplicate Project Entered'
						: ''} />

				<SectionInput
					heading="Description"
					type="textarea"
					placeholder="Description"
					on:input={(e) => (projectFormValues.projectDescription = e.detail)}
					inputName="projDesc" />

				<div class="flex flex-col gap-1">
				
						<label class="label">
							<span class="label-text text-base font-semibold">Project Image*</span>
						</label>
					


					<div class="flex flex-col items-start justify-start">
						<input
							bind:this={fileInput}
							on:change={handleImgChange}
							type="file"
							class={`file-input file-input-bordered file-input-sm w-full max-w-xs ${
								createErrorStates.imgError && 'border-2 border-red-400'
							}`}
							accept=".png,.jpeg,.jpg"
							name="imgUpload" />

						{#if selectedImage}
							<img
								src={selectedImage}
								class="mt-6 flex h-24 w-24 items-start justify-start rounded-2xl border-secondary"
								alt="input photo" />
						{/if}
					</div>
				</div>

				<!-- submission -->
				<button
					class="btn btn-primary mt-8 flex w-full flex-row"
					on:click={() => handleProjectCreate()}>
					{#if submitting}
						<span class="loading loading-spinner" />
					{/if}
					Submit
				</button>
			</div>
		</div>
	</div>
</PageContainer>
