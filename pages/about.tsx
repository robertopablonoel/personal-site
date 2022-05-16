import styled from '@emotion/styled';
import tw from 'twin.macro';
import { Layout } from '~/layouts';

import type { Timeline, TimelineEvent } from '~/types';

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

const Title = styled.h1`
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

const Description = styled.p(tw`
	justify-center text-center\
	my-2 \
	text-gray-300 \
	text-base \
`);

export default function TimelinePage({ timeline: rawTimeline }: TimelineProps) {

    return (
        <Layout.Default seo={{ title: 'Roberto ─ timeline' }}>
            <Container>
                <Content>
                    <AboutCard>
                        <AboutBody>
                            <Title>
                                <span>About Me</span>
                            </Title>
                            <Description>Hi, I'm Roberto, I currently work as a Software Engineer at Capital One. I'm fluent in several backend / frontend tools,
                                and have deep experience with AWS from a DevOps and Network Automation perspective.
                                I have also worked on several side projects in the Web3 space, having launched NFTs on the Ethereum and Solidity blockchains.

                                Aside from my professional experience, I'm
                            </Description>
                        </AboutBody>
                    </AboutCard>
                </Content>
            </Container>
        </Layout.Default>
    );
}
