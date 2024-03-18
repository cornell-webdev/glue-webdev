export type Member = {
	value: string;
	label: string;
	canRemove: boolean;
};

export type ErrorType = {
	nameError: boolean;
	imgError: boolean;
	duplicateProject: boolean;
};

export type Project = {
	id: string;
	name: string;
	description: string;
	imgUrl: string;
};

export type ProjectFormValues = {
	selectedMembers: Member[];
	projectName?: string;
	projectDescription?: string;
	projectImage?: string;
};
