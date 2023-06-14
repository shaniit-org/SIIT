// See https://kit.svelte.dev/docs/types#app
import {
	SanityImageDimensions,
	SanityImageWithAssetStub,
	SanityReference
} from '@sanity/image-url/lib/types/types';

declare global {
	interface PortableText {
		_key: string;
		_type: string;
		children: any[];
		markDefs: any[];
		style: string;
	}

	interface Link {
		title: string;
		href: string;
		_key: string;
	}

	type SanityImage = SanityImageWithAssetStub & {
		image: SanityImageWithAssetStub;
		asset: SanityReference;
		crop?: SanityImageCrop;
		hotspot?: SanityImageHotspot;
		_type: 'image';
		_key: string;
		_sanityAsset: string;
		_sanityAssetId: string;
		url: string;
		metadata: SanityImageMetadata;
		dimensions: SanityImageDimensions;
	};
	export interface BaseMetaData {
		title?: string;
		description?: string;
		url?: string;
		image?: string;
	}
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
