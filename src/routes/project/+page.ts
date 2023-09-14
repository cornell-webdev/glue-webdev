import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ parent }) => {
	const fetchProjects = async () => {
		const { supabase } = await parent();
		const { data: projects } = await supabase.from('projects').select('*');
		return projects;
	};

	return { projects: fetchProjects() };
};
