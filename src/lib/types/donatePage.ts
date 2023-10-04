export interface DonatePageData {
	seo: BaseMetaData;
	title: string;
	description: string;
	content: PortableText;
	payment_methods: PaymentMethod[];
	payment_methods_description: string;
	coverImage: SanityImage;
	donors: Donator[];
	donate_roadmap: DonateRoadmap;
}
export interface Donator {
	_id: string;
	group: string;
	amount: number;
}

export interface PaymentMethod {
	name: string;
	number: string;
	Image: SanityImage;
}
export interface DonateRoadmap {
	title: string;
	description: PortableText;
	target: number;
}
