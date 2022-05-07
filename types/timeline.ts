export interface TimelineEvent {
	date: Date | string;
	current: boolean;
	title: string;
	description?: string;
	icon: string;
	link?: {
		text: string;
		url: string;
	};
}

export type Timeline = Array<TimelineEvent>;
