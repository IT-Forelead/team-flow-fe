import type { Role } from '@/types/common.ts';
import {
	BrainIcon,
	ChartNoAxesCombinedIcon,
	HomeIcon,
	SettingsIcon,
	UsersIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';

export interface SidebarMenuItem {
	title: string;
	titleKey?: string; // Translation key
	url: string;
	icon?: ReactNode;
	isActive?: boolean;
	disabled?: boolean;
	roles?: Role[];
	items?: SidebarSubMenuItem[];
}

export interface SidebarSubMenuItem {
	title: string;
	titleKey?: string; // Translation key
	url: string;
	icon?: ReactNode;
	disabled?: boolean;
	roles?: Role[];
}

export interface SidebarFooterItem {
	title: string;
	titleKey?: string; // Translation key
	url: string;
	icon: ReactNode;
	roles?: Role[];
}

export const mainMenuItems: SidebarMenuItem[] = [
	// {
	// 	title: 'Dashboard',
	// 	titleKey: 'navigation.dashboard',
	// 	icon: <LayoutDashboardIcon />,
	// 	url: '',
	// 	items: [
	// 		{
	// 			title: 'Reports',
	// 			titleKey: 'navigation.reports',
	// 			url: '/reports',
	// 		},
	// 	],
	// },
	{
		title: 'Home',
		titleKey: 'navigation.home',
		icon: <HomeIcon />,
		url: '/',
	},
	{
		title: 'Dashboard',
		titleKey: 'navigation.dashboard',
		icon: <ChartNoAxesCombinedIcon />,
		url: '/dashboard',
	},
	{
		title: 'Users',
		titleKey: 'navigation.users',
		url: '/users',
		icon: <UsersIcon />,
		roles: [],
	},
	{
		title: 'AI Agents',
		titleKey: 'navigation.agents',
		url: '/ai-agents',
		icon: <BrainIcon />,
		roles: [],
	},
];

export const footerMenuItems: SidebarFooterItem[] = [
	{
		title: 'Settings',
		titleKey: 'navigation.settings',
		url: '/settings',
		icon: <SettingsIcon />,
		roles: [],
	},
];
