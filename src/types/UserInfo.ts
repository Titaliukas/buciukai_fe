import Roles from '../enum/Roles';

export interface UserInfo {
	username: string;
	name: string;
	surname: string;
	email: string;
	phoneNumber: string | null;
	birthdate: Date | null;
	city: string | null;
	postalCode: string | null;
	role: Roles;
}
