import {
    BarChart3Icon, BrainIcon,
    CalendarIcon,
    FileTextIcon,
    LayoutDashboardIcon, Settings2Icon,
    SettingsIcon, Users2Icon, UsersIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';

export interface SidebarMenuItem {
	title: string;
	titleKey?: string; // Translation key
	url: string;
	icon?: ReactNode;
	isActive?: boolean;
	disabled?: boolean;
	privileges?: string[];
	items?: SidebarSubMenuItem[];
}

export interface SidebarSubMenuItem {
	title: string;
	titleKey?: string; // Translation key
	url: string;
	icon?: ReactNode;
	disabled?: boolean;
	privileges?: string[];
}

export interface SidebarFooterItem {
	title: string;
	titleKey?: string; // Translation key
	url: string;
	icon: ReactNode;
}

export const mainMenuItems: SidebarMenuItem[] = [
	{
		title: 'Dashboard',
		titleKey: 'navigation.dashboard',
		icon: <LayoutDashboardIcon />,
		url: '',
		items: [
			{
				title: 'Reports',
				titleKey: 'navigation.reports',
				url: '/reports',
			},
		],
	},
	{
		title: 'AIAgents',
		titleKey: 'navigation.users',
		url: '/users',
		icon: <UsersIcon />,
	},
    {
        title: 'AI Agents',
        titleKey: 'navigation.agents',
        url: '/agents',
        icon: <BrainIcon />,
    },
];

export const footerMenuItems: SidebarFooterItem[] = [
	{
		title: 'AIAgents',
		titleKey: 'navigation.settings',
		url: '/settings',
		icon: <SettingsIcon />,
	},
	{
		title: 'Help',
		titleKey: 'navigation.help',
		url: '/help',
		icon: <FileTextIcon />,
	},
];
