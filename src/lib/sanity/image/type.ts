export interface ImageProps {
    image: SanityImage;
    maxWidth?: number | string;
    alt?: string;
    minimumWidthStep?: number;
    customWidthSteps?: number[];
    sizes?: string;
}

export interface ImageDimensions {
    aspectRatio: number;
    width: number;
    height: number;
}
