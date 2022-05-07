import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = 'Roberto - Dev';
	const description = "Hey 👋 I'm Roberto, a developer";

	return {
		title,
		description,
		canonical: `https://robertonoel.com/${router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: 'Roberto',
			url: `https://robertonoel.com/${router.asPath}`,
			type: 'website',
			images: [
				{
					url: '/banner.png',
					alt: description,
					width: 1280,
					height: 720,
				},
			],
		},
		twitter: {
			cardType: 'summary_large_image',
			handle: '@bitwiseberto',
			site: '@bitwiseberto',
		},
		...props,
	};
}
