export type LoginFormValues = {
	email: string;
	password: string;
	resetCode?: string;
};

export type sendEamilValues = {
	email: string;
};
export type validationFormValues = {
	email: string;
	resetCode: string[];
};
export type validationValues = {
	email: string;
	resetCode: string;
};
export type ResetPassword = {
	password: string;
	email: string;
};
export type ChangePassword = {
	oldPassword: string;
	newPassword: string;
};

export type googleLoginResponse = {
	url: string;
};
