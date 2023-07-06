import type { Author } from '.';

export interface AboutMission {
	_type: 'aboutMission';
	title: string;
	image: SanityImage;
	description: PortableText;
}

export interface AboutBanner {
	_type: 'aboutBanner';
	title: string;
	description: string;
}

export type AboutSection = AboutBanner | AboutBanner | AboutMission;

export type AboutPageData = {
	seo: BaseMetaData;
	sections: AboutSection[];
	teamMembers: Author[];
};
