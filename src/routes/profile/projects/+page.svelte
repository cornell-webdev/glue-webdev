<script lang="ts">
	import { page } from '$app/stores';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import { onMount } from 'svelte';
    import IconEye from '$lib/icons/glue/IconEye.svelte';
    import IconEditPen from '$lib/icons/glue/IconEditPen.svelte';

	$: ({ profile, supabase } = $page.data);

    type Project = {
        id: string;
        name: string;
        description: string;
        imgUrl: string;
    }

    let projects: Project[] = [];
    let isLoadingProjects = true;
    let currentTab = 'all';

    
const fetchMyProjects = async () => {
  const { data: projectData, error } = await supabase
    .from('projects')
    .select(`
      id, 
      name, 
      description, 
      imgUrl,
      projectuserrelation (
        profile_id,
        profiles!inner (
          id
        )
      )
    `)
    .eq('projectuserrelation.profile_id', profile.id);

  if (error) {
    console.error('Error fetching projects and profiles:', error);
    return;
  }

  projects = projectData;

};
  


  onMount(() => {
    
    fetchMyProjects();
  });
	
</script>

<PageContainer title="My projects">
	<div class="flex w-full justify-center py-8">
		<div class="w-full max-w-3xl  ">
            <div class="flex flex-col gap-8">
                <div class="flex flex-row justify-between">
                    <h1 class="text-3xl font-bold mb-4 h-full justify-center items-center ">My projects</h1>
                    
                    <div role="tablist" class="tabs tabs-boxed h-fit">
                        <button role="tab" class={`${currentTab == 'all' && "tab-active"} tab`} on:click={() => currentTab = 'all'}>All</button>
                        <button role="tab" class={`${currentTab == 'active' && "tab-active"} tab`} on:click={() => currentTab = 'active'}>Active</button>
                        <button role="tab" class={`${currentTab == 'past' && "tab-active"} tab`} on:click={() => currentTab = 'past'}>Past</button>
                    </div>
                </div>
                <div class="flex flex-col overflow-scroll gap-4 justify-start items-center">
                {#if !isLoadingProjects && projects.length == 0}
                    <p class="text-gray-500">You have no projects yet.</p>
                {:else}
                    {#if currentTab == 'all'}
                        {#each projects as project}
                            <div class="flex flex-row justify-start items-center">
                                <img src={project.imgUrl} alt="Project image" class="w-36 h-36 rounded-lg shadow-lg" />
                            <div class=" rounded-lg shadow py-4 px-8 mb-4 text-base-content flex flex-col gap-4">
                                <div class="flex md:flex-row md:justify-start flex-col justify-start gap-4">
                                    <h2 class="text-xl font-bold">{project.name}</h2>
                                    <div class="flex flex-row gap-3">
                                        <a href={`/project/update/${project?.id}`} class="btn btn-sm btn-secondary">
                                            <IconEditPen />
                                            Edit</a>
                                        <a href={`/project/${project?.id}`} class="btn btn-sm btn-secondary">
                                            <IconEye />Preview</a>
                                    </div>
                                </div>
                                <p>{project.description}</p>
                            </div>
                            </div>
                        {/each}
                
                    
                    {/if}
                {/if}
                </div>
            </div>
        </div>
            

			

	</div>
</PageContainer>
