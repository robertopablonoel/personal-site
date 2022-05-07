import styled from '@emotion/styled';
import tw from 'twin.macro';
import { format, parse } from 'date-fns';
import { Icon } from '@iconify/react';

import { Button, Pill } from '~/components';
import { Layout } from '~/layouts';

import type { GetStaticProps } from 'next';

import type { Timeline, TimelineEvent } from '~/types';

import ReactRoundedImage from "react-rounded-image";

interface TimelineProps {
	timeline?: Timeline;
}

const Container = styled.div(tw`
	flex flex-grow min-h-screen \
	pt-16 pb-12
`);

const Content = styled.div(tw`
	flex-grow flex flex-col justify-center max-w-sm sm:max-w-2xl w-full \
	mx-auto px-0 sm:px-16
`);

const List = styled.ul(tw`
	-mb-8
`);

const ListItem = styled.li(tw`
	my-1
`);

const ListItemContainer = styled.div(tw`
	relative \
	pb-8
`);

const TimelineConnector = styled.span(tw`
	absolute top-1 left-1/2 w-0.5 h-full \
	-ml-px \
	bg-gray-200 dark:bg-gray-600
`);

const EventCard = styled.div(tw`
	relative flex items-center space-x-3 \
	bg-gray-50 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 \
	backdrop-filter backdrop-blur-sm \
	px-2 py-3 \
	border-2 border-gray-200 dark:border-gray-600 \
	rounded-lg
`);

const EventIconContainer = styled.div(tw`
	relative flex items-center justify-center w-12 h-12 \
	bg-primary-500 bg-opacity-15 \
	backdrop-filter backdrop-blur-sm saturate-200 \
	mx-2 px-1 \
	rounded-full
`);

const EventIcon = styled(Icon)(tw`
	w-6 h-6 \
	text-primary-500
`);

const EventBody = styled.div(tw`
	min-w-0 flex-1
`);

const Title = styled.h1`
	${tw`
		flex flex-wrap justify-between \
		mb-2 \
		text-gray-500 dark:text-white \
		text-lg tracking-tight font-bold
	`}

	div {
		${tw`mt-2 sm:mt-0`}
	}
`;

const Spacer = styled.span(tw`
	flex-1 sm:hidden
`);

const Description = styled.p(tw`
	my-2 \
	text-gray-300 \
	text-base
`);

const EventLinkButton = styled(Button.Outline)(tw`
	mt-2
`);

const EventLinkButtonIcon = styled(Icon)(tw`
	ml-3
`);

const AboutCard = styled.div(tw`
	relative flex items-center space-x-3 \
	bg-gray-50 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 \
	backdrop-filter backdrop-blur-sm \
	px-2 py-3 \
	border-2 border-gray-200 dark:border-gray-600 \
	rounded-lg
`);

const AboutBody = styled.div(tw`
	min-w-0 flex-1
`);

const ImageContainer = styled.div(tw`
	relative flex items-center space-x-3 \
	place-content-center
`);

const AboutTitle = styled.h1`
	${tw`
		flex flex-wrap justify-center \
		mb-2 \
		text-gray-500 dark:text-white \
		text-lg tracking-tight font-bold
	`}

	div {
		${tw`mt-2 sm:mt-0`}
	}
`;

const AboutDescription = styled.p(tw`
	justify-center text-center\
	text-gray-300 dark:text-gray-200\
	text-[17px] \
	m-2

`);


export const getStaticProps: GetStaticProps<TimelineProps> = async () => {
	const { default: rawTimeline } = await import('~/data/timeline.json');
	const timeline = (rawTimeline as Array<TimelineEvent>);

	return {
		props: {
			timeline,
		},
	};
};

export default function TimelinePage({ timeline: rawTimeline }: TimelineProps) {
	const timeline = rawTimeline.map((event) => ({
		...event,
		// Note: Custom parser needed as Safari on iOS doesn't like the standard `new Date()` parsing
		date: parse(event.date.toString(), 'MM-dd-yyyy', new Date()),
	}));

	return (
		<Layout.Default seo={{ title: 'Roberto ─ timeline' }}>
			<Container>
				<Content>
					<List role="list">
						<ListItem>
							<ListItemContainer tw="">
								<ImageContainer>
									<ReactRoundedImage
										image='/me.jpeg'
										roundedColor="rgba(0, 114, 255, var(--tw-text-opacity))"
										imageWidth="250"
										imageHeight="250"
										roundedSize="5"
										borderRadius="70"
									/>
								</ImageContainer>
							</ListItemContainer>
						</ListItem>
						<ListItem>
							<ListItemContainer tw="">
								<AboutCard>
									<AboutBody>
										<AboutTitle>
											<span>About Me</span>
										</AboutTitle>
										<AboutDescription>Hi, I&apos;m Roberto, I currently work as a Software Engineer at Capital One. I&apos;m fluent in several backend / frontend frameworks,
											and have deep experience with AWS from a DevOps and Network Automation perspective.
											I have also worked on several side projects in the Web3 space, having launched NFTs on the Ethereum and Solidity blockchains.
										</AboutDescription>
									</AboutBody>
								</AboutCard>
							</ListItemContainer>
						</ListItem>
						{timeline.map((event, index) => (
							<ListItem key={event.title}>
								<ListItemContainer tw="">
									<TimelineConnector aria-hidden="true" />

									<EventCard>
										<EventIconContainer>
											<EventIcon icon={event.icon} aria-hidden="true" />
										</EventIconContainer>

										<EventBody>
											<Title>
												<span>{event.title}</span>
												<Spacer />
												<Pill.Date small={true}>
													{!event.current && (
														format(event.date, 'PP'))}
													{event.current && (
														format(event.date, 'PP') + " — Now")}
												</Pill.Date>
											</Title>

											<Description>{event.description}</Description>

											{event.link && (
												<EventLinkButton
													small={true}
													href={event.link.url}
													target="_blank"
													rel="noopener noreferrer"
												>
													{event.link.text}
													<EventLinkButtonIcon icon="feather:external-link" />
												</EventLinkButton>
											)}
										</EventBody>
									</EventCard>
								</ListItemContainer>
							</ListItem>
						))}
					</List>
				</Content>
			</Container>
		</Layout.Default>
	);
}
