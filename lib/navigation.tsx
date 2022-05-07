import { useMemo } from 'react';
import { useTheme } from 'next-themes';
import { usePersistantState, useStatus } from '~/lib';

import { NavigationItemType, Theme } from '~/types';

import type { NavigationItem, NavigationItems } from '~/types';

const staticMenuItems: Array<Array<NavigationItem>> = [
	[
		{
			type: NavigationItemType.LINK,
			icon: 'feather:home',
			text: 'Home',
			href: 'https://drive.google.com/file/d/1xPbrD7gIdmDoR4fIfyzVheBkp3dhXTV_/view?usp=sharing',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:copy',
			text: 'Projects',
			href: 'https://drive.google.com/file/d/1xPbrD7gIdmDoR4fIfyzVheBkp3dhXTV_/view?usp=sharing',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:smile',
			text: 'About Me',
			href: 'https://drive.google.com/file/d/1xPbrD7gIdmDoR4fIfyzVheBkp3dhXTV_/view?usp=sharing',
		},
	],
	[
		{
			type: NavigationItemType.LINK,
			icon: 'feather:book',
			text: 'Resume',
			href: 'https://drive.google.com/file/d/1xPbrD7gIdmDoR4fIfyzVheBkp3dhXTV_/view?usp=sharing',
			external: true,
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:github',
			text: 'GitHub',
			href: 'https://github.com/robertopablonoel',
			external: true,
		},
	],
];

export function useNavigation() {
	const state = usePersistantState();
	const { animations: background, sound } = state.get();
	const { theme, setTheme } = useTheme();

	const isDark = useMemo(() => {
		if (theme === Theme.SYSTEM)
			return window.matchMedia('(prefers-color-scheme: dark)').matches;

		return theme === Theme.DARK;
	}, [theme]);

	const menuItems: NavigationItems = [
		...staticMenuItems
	];

	const settingsItems: NavigationItems = [
		[
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:image',
				endIcon: background ? 'feather:check-square' : 'feather:square',
				text: `Animations ${background ? 'On' : 'Off'}`,
				onClick: () =>
					state.set((settings) => ({
						...settings,
						animations: !settings.animations,
					})),
			},
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:moon',
				endIcon: isDark ? 'feather:check-square' : 'feather:square',
				text: `Dark Theme ${isDark ? 'On' : 'Off'}`,
				onClick: () => setTheme(isDark ? 'light' : 'dark'),
			},
			{
				type: NavigationItemType.ACTION,
				icon: sound ? 'feather:volume-2' : 'feather:volume-x',
				endIcon: sound ? 'feather:check-square' : 'feather:square',
				text: `Sounds ${sound ? 'On' : 'Off'}`,
				onClick: () =>
					state.set((settings) => ({
						...settings,
						sound: !settings.sound,
					})),
			},
		],
	];

	return {
		menu: menuItems,
		settings: settingsItems,
	};
}
