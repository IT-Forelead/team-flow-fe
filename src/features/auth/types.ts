import type { Role } from '@/types/common.ts';

export interface AuthToken {
	accessToken: string;
	refreshToken: string;
}

export interface LoginCredentials {
	username: string;
	password: string;
}

export interface CurrentUser {
	id: string;
	createdAt: string;
	firstname: string;
	lastname: string;
	email: string;
	role: Role;
	position: string;
}
