import styled from '@emotion/styled';
import tw from 'twin.macro';

import { getProjects } from '~/lib/projects';
import { Layout } from '~/layouts';
import { List } from '~/components';
import { ListActionType } from '~/types';

import type { ListAction, Projects } from '~/types';

interface ProjectProps {
	projects: string;
}

const Container = styled.div(tw`
	my-24 mx-2 sm:mx-6 lg:mb-28 lg:mx-8
`);

const Content = styled.div(tw`
	relative max-w-xl mx-auto
`);

const ProjectIcon = styled.span(tw`
	text-xl
`);

export default function ProjectsPage({ projects: serialisedProjects }: ProjectProps) {
	const projects = [
		{
			description: "NFT project with artist Elena Bastyte (elenabastyte.com).",
			homepage: "https://www.naughtyneighbors.io",
			name: "Naughty Neighbors NFT",
			url: "https://github.com/robertopablonoel/nn-website",
			icon: "🏘"
		},
		{
			description: "Artist discovery tool for record labels using Spotify data.",
			name: "Usic",
			url: "https://github.com/UsicTeamInc",
			icon: "🎸"
		},
		{
			description: "Calculates crypto exchange to buy from depending on quantity.",
			name: "Best Execution Calculator",
			url: "https://github.com/robertopablonoel/best-execution-calc",
			icon: "💸"
		},
		{
			description: "Generative machine learning algorithm for ByteBeat music generation.",
			paper: '/GeneticAlgo.pdf',
			name: "Genetic Algorithm for ByteBeat Music",
			url: "https://github.com/robertopablonoel/ByteBeat",
			icon: "🧬"
		},
		{
			description: "This program detects pitches in .mp3 files, reproduces them in MIDI, synthesizes them using custom wave formats, and reproduces them though both audio and video.",
			name: "Pitch Detection and Synthesis",
			url: "https://github.com/robertopablonoel/Pitch-Detection-and-Synthesis",
			icon: "🎹"
		},
		{
			description: "Rewriting the memory allocation and deallocation functions in C with first fit, best fit and worst fit.",
			name: "Memory Allocation in C",
			url: "https://github.com/robertopablonoel/Allocation-Project",
			icon: "🧠"
		}

	] as Projects;

	return (
		<Layout.Default seo={{ title: 'Roberto ─ projects' }}>
			<Container>
				<Content>
					<List.Container
						item={(project, index) => (
							<List.Item
								actions={[
									...(project.post
										? [
											{
												type: ListActionType.LINK,
												external: false,
												href: project.post,
												icon: 'feather:edit-3',
												label: `Blog post about ${project.name}`,
											} as ListAction,
										]
										: []),
									...(project.homepage
										? [
											{
												type: ListActionType.LINK,
												href: project.homepage,
												icon: 'feather:home',
												label: `${project.name} homepage`,
											} as ListAction,
										]
										: []),
									...(project.paper
										? [
											{
												type: ListActionType.LINK,
												href: project.paper,
												icon: 'feather:book-open',
												label: `${project.name} paper`,
											} as ListAction,
										]
										: []),
									{
										type: ListActionType.LINK,
										href: project.url,
										icon: 'feather:github',
										label: 'GitHub Repository',
										external: true
									},
								]}
								description={project.description}
								icon={<ProjectIcon>{project.icon}</ProjectIcon>}
								key={index}
								title={project.name}
							/>
						)}
						items={projects}
					/>
				</Content>
			</Container>
		</Layout.Default>
	);
}
