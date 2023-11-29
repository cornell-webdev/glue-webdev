import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ parent }) => {
	const fetchProfileGroups = async () => {
		const { supabase } = await parent();
		const { data: profiles } = await supabase.from('profiles').select('*');
		const profileGroupDict = {};
		for (const profile of profiles) {
			const { cohort } = profile;
			if (cohort in profileGroupDict) {
				profileGroupDict[cohort]?.push(profile);
			} else {
				profileGroupDict[cohort] = [profile];
			}
		}
		const profileGroups = Object.entries(profileGroupDict)?.map(([cohort, profiles]) => ({
			name: cohort,
			profiles
		}));
		return profileGroups;
	};

	return { profileGroups: fetchProfileGroups() };
};
