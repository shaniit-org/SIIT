/**
 * @param {SanityImage} image
 * @returns {import('./type').ImageDimensions}
 */
export function getImageDimensions(image) {
	if (!image?.asset?._ref) {
		return {
			width: 600,
			height: 400,
			aspectRatio: 16 / 9
		};
	}
	const dimensions = image.asset._ref.split('-')[2];
	const [width, height] = dimensions.split('x').map(Number);
	if (!width || !height || Number.isNaN(width) || Number.isNaN(height)) {
		return {
			width: 600,
			height: 400,
			aspectRatio: 16 / 9
		};
	}
	return {
		width,
		height,
		aspectRatio: width / height
	};
}
