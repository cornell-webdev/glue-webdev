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

	// img storage paths
	// file data
	// TODO: can be cleaned up, lots of vars
	let imgPath = '';
	let imgUrl = '';
	let members: Member[] = [];
	let project: Project | undefined;
	let selectedImage: string | null = null;
	let fileInput: HTMLInputElement | null = null;

	type UpdateErrorType = {
		nameError: boolean;
		imgError: boolean;
		duplicateProject: boolean;
	};

	let updateErrorStates = {
		nameError: false,
		imgError: false,
		duplicateProject: false
	} as UpdateErrorType;

	let submitting = false;

	type Project = {
		id: string;
		name: string;
		description: string;
		imgUrl: string;
	};

	// supabase data
	export let data;
	import { page } from '$app/stores';

	let projectId: string;

	type Member = {
		value: string;
		label: string;
		canRemove: boolean;
	};

	type ProjectFormValues = {
		selectedMembers: Member[];
		projectName?: string;
		projectDescription?: string;
		projectImage?: string;
	};

	let projectFormValues = {
		selectedMembers: [],
		projectName: '',
		projectDescription: '',
		projectImage: ''
	} as ProjectFormValues;

	const updateSchema = yup.object().shape({
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
		projectId = window.location.pathname.split('/').pop() || '';
		const { data: allMembers } = await data?.supabase
			.from('profiles')
			.select('id,firstName, lastName');

		if (allMembers) {
			members = allMembers?.map((member) => ({
				value: member.id,
				label: `${member.firstName} ${member.lastName}`,
				canRemove: true
			}));
		}

		const { data: projectData } = await data?.supabase
			.from('projects')
			.select('id, name, description, imgUrl, profiles ( id, firstName, lastName )')
			.eq('id', projectId);

		console.log(projectData);

		project = projectData ? projectData[0] : undefined;

		// set project form values
		projectFormValues.projectName = project?.name;
		projectFormValues.projectDescription = project?.description;
		projectFormValues.projectImage = project?.imgUrl;
		projectFormValues.selectedMembers = projectData
			? projectData[0].profiles?.map((member) => ({
					value: member.id,
					label: `${member.firstName} ${member.lastName}`,
					canRemove: true
			  }))
			: [];
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
					}
				};

				reader.readAsDataURL(file);
			}
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

	async function handleProjectMembers() {
		const { data: existingRelations, error: fetchError } = await data?.supabase
			.from('projectuserrelation')
			.select('profile_id')
			.eq('project_id', projectId);

		console.log(existingRelations);

		if (fetchError) throw fetchError;

		const existingMemberIds = new Set(existingRelations?.map((relation) => relation.userId));
		const selectedMemberIds = new Set(
			projectFormValues.selectedMembers.map((member) => member.value)
		);

		const membersToRemove = existingRelations?.filter(
			(relation) => !selectedMemberIds.has(relation.userId)
		);
		const membersToAdd = projectFormValues.selectedMembers.filter(
			(member) => !existingMemberIds.has(member.value)
		);

		for (const member of membersToRemove) {
			const { error: deleteError } = await data?.supabase
				.from('projectuserrelation')
				.delete()
				.match({ profile_id: member.profile_id, project_id: projectId });

			if (deleteError) throw deleteError;
		}

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

	async function handleProjectUpdate(projectId: string) {
		submitting = true;

		try {
			// validate the form data
			await updateSchema.validate(projectFormValues, { abortEarly: false });

			console.log(projectFormValues)
			if (projectFormValues.projectName) {
				updateErrorStates.nameError = false;
				const { data: duplicateData } = await data?.supabase
					.from('projects')
					.select('name')
					.eq('name', projectFormValues.projectName)
					.neq('id', projectId);

				if (duplicateData && duplicateData.length > 0) {
					updateErrorStates.duplicateProject = true;
				} else {
					updateErrorStates.duplicateProject = false;
				}
			} else {
				updateErrorStates.nameError = true;
			}

			

			if (
				updateErrorStates.nameError ||
				updateErrorStates.imgError ||
				updateErrorStates.duplicateProject
			) {
				throw new Error('Validation error');
			}

			await handleProjectMembers();

			console.log('here')
			console.log(projectFormValues)
			console.log(projectId)
			
			const { data: updatedData, error: updateError } = await data?.supabase
				.from('projects')
				.update({
					name: projectFormValues.projectName,
					description: projectFormValues.projectDescription,
					imgUrl: projectFormValues.projectImage
				})
				.eq('id', projectId);
			console.log(updatedData)
			if (updateError) throw updateError;

			toast.push('✅ Your project was successfully updated');
			// await goto(`/project/${projectId}`);
		} catch (error) {
			toast.push(`❌ Error updating project`, {
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
			<h3 class="text-base font-semibold text-primary">{'Application → Update'}</h3>
			<h1 class="text-3xl font-bold">Update Project</h1>

			<!-- form section -->
			<div class="flex w-full max-w-full flex-col gap-2 py-2">
				<div class="flex flex-row items-end justify-center gap-4">
					<div class="form-control w-full gap-1" />
				</div>

				<MultiSelect
					options={members || []}
					bind:selectedOptions={projectFormValues.selectedMembers}
					heading="Members"
					placeholder="Search to add members" />

				<SectionInput
					heading="Name"
					type="text"
					placeholder="Name"
					required={true}
					initialValue={projectFormValues.projectName}
					on:input={(e) => (projectFormValues.projectName = e.detail)}
					inputName="projName"
					showError={updateErrorStates.nameError || updateErrorStates.duplicateProject}
					errorLabel={updateErrorStates.nameError
						? 'Enter a valid Project Name'
						: updateErrorStates.duplicateProject
						? 'Duplicate Project Entered'
						: ''} />

				<SectionInput
					heading="Description"
					type="textarea"
					placeholder="Description"
					initialValue={projectFormValues.projectDescription}
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
								updateErrorStates.imgError && 'border-2 border-red-400'
							}`}
							accept=".png,.jpeg,.jpg,.webp"
							name="imgUpload" />

						{#if project?.imgUrl || selectedImage}
							<img
								src={project?.imgUrl ?? selectedImage}
								class="mt-6 flex h-24 w-24 items-start justify-start rounded-2xl border-secondary"
								alt="input photo" />
						{/if}
					</div>
				</div>

				<!-- submission -->
				<button
					class="btn btn-primary mt-8 flex w-full flex-row"
					on:click={() => handleProjectUpdate(projectId)}>
					{#if submitting}
						<span class="loading loading-spinner" />
					{/if}
					Update
				</button>
			</div>
		</div>
	</div>
</PageContainer>
