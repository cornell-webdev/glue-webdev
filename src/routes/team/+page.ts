import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ parent }) => {
	const fetchProfiles = async () => {
		const { supabase } = await parent();
		const { data: profiles } = await supabase.from('profiles').select('*');
		return profiles;
	};

	const fetchLegacyProfiles = async () => {
		const { supabase } = await parent();
		const { data: legacyProfiles } = await supabase.from('legacy_profiles').select('*');
		return legacyProfiles;
	};

	return { profiles: fetchProfiles(), legacyProfiles: fetchLegacyProfiles() };
};
