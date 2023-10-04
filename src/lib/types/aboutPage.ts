import type { Author } from '.';

export interface AboutMission {
	_type: 'aboutMission';
	title: string;
	image: SanityImage;
	description: PortableText;
}

export interface AboutBanner {
	image: SanityImage;
	_type: 'aboutBanner';
	title: string;
	description: string;
}

export interface RowBanner {
	_type: 'rowBanner';
	title: string;
	description: string;
}

export interface AboutTeamMember {
	_type: 'teamMember';
	title: string;
	teams: Author[];
}

export type AboutSection = RowBanner | AboutBanner | AboutMission | AboutTeamMember;

export type AboutPageData = {
	seo: BaseMetaData;
	sections: AboutSection[];
};
