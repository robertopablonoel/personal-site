import type { MouseEvent } from 'react';

export enum ListActionType {
	BUTTON = 'button',
	LINK = 'link',
	FRAME = 'application/pdf',
}

interface ListActionBaseProps {
	icon: string;
	label: string;
}

export type ListAction =
	| ({
		type: ListActionType.BUTTON;
		onClick: (event: MouseEvent) => void;
	} & ListActionBaseProps)
	| ({
		type: ListActionType.LINK;
		external?: boolean;
		href: string;
		onClick?: (event: MouseEvent) => void;
	} & ListActionBaseProps)
	| ({
		type: ListActionType.FRAME;
		external?: boolean;
		href: string;
		onClick?: (event: MouseEvent) => void;
	} & ListActionBaseProps);
