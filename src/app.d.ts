// See https://kit.svelte.dev/docs/types#app
import {
	SanityImageDimensions,
	SanityImageWithAssetStub,
	SanityReference
} from '@sanity/image-url/lib/types/types';
import type { InputValue } from '@portabletext/svelte/ptTypes';
import type { decl } from 'postcss';

declare global {
	type PortableText = InputValue;

	interface Link {
		title: string;
		url: string;
		_key: string;
	}

	type SanityImage = SanityImageWithAssetStub & {
		image: SanityImageWithAssetStub;
		alt?: string;
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
		title: string;
		description: string;
		url?: string;
		image?: string;
		ogImage?: SanityImage;
	}
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Platform {
			env: {
				COUNTER: DurableObjectNamespace;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}
declare module 'svelte-share-buttons-component' {}

export {};
