import imageUrlBuilder from "@sanity/image-url";
function getImageDimensions(image) {
  if (!image?.asset?._ref) {
    return {
      width: 600,
      height: 400,
      aspectRatio: 16 / 9
    };
  }
  const dimensions = image.asset._ref.split("-")[2];
  const [width, height] = dimensions.split("x").map(Number);
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
const imageBuilder = imageUrlBuilder({
  projectId: "za3lzlmc",
  dataset: "live"
});
const urlFor = (image) => imageBuilder.image(image);
const LARGEST_VIEWPORT = 1920;
const DEFAULT_MIN_STEP = 0.1;
const DEFAULT_WIDTH_STEPS = [400, 600, 850, 1e3, 1150];
const DEFAULT_FULL_WIDTH_STEPS = [360, 414, 768, 1366, 1536, 1920];
function getImageProps({
  image,
  // Number of the largest width it can assume in the design
  // or "100vw" if it occupies the whole width
  maxWidth: userMaxWidth,
  /**
   * The minimal width difference, in PERCENTAGE (decimal), between the image's srcSet variations.
   *
   * -> 0.10 (10%) by default.
   */
  minimumWidthStep = DEFAULT_MIN_STEP,
  // List of width sizes to use in the srcSet (NON-RETINA)
  customWidthSteps,
  // Custom <img> element's `sizes` attribute
  sizes
}) {
  if (!image?.asset?._ref) {
    return {};
  }
  const maxWidth = typeof userMaxWidth === "number" ? userMaxWidth : LARGEST_VIEWPORT;
  const builder = imageBuilder.image(image).fit("max").auto("format");
  const imageDimensions = getImageDimensions(image);
  const baseSizes = [
    maxWidth,
    ...customWidthSteps || (typeof userMaxWidth === "number" ? DEFAULT_WIDTH_STEPS : DEFAULT_FULL_WIDTH_STEPS)
  ];
  const retinaSizes = Array.from(
    // De-duplicate sizes with a Set
    /* @__PURE__ */ new Set([
      ...baseSizes,
      ...baseSizes.map((size) => size * 2),
      ...baseSizes.map((size) => size * 3)
    ])
  ).sort((a, b) => a - b).filter(
    (size) => (
      // Exclude sizes 10% or more larger than the image itself. Sizes slightly larger
      // than the image are included to ensure we always get closest to the highest
      // quality for an image. Sanity's CDN won't scale the image above its limits.
      size <= imageDimensions?.width * 1.1 && // Exclude those larger than maxWidth's retina (x3)
      size <= maxWidth * 3
    )
  ).filter((size, i, arr) => {
    const nextSize = arr[i + 1];
    if (nextSize) {
      return nextSize / size > minimumWidthStep + 1;
    }
    return true;
  });
  return {
    // Use the original image as the `src` for the <img>
    src: builder.width(maxWidth).url(),
    // Build a `{URL} {SIZE}w, ...` string for the srcset
    srcset: retinaSizes.map((size) => `${builder.width(size).url()} ${size}w`).join(", "),
    sizes: userMaxWidth == "100vw" ? "100vw" : sizes || `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`,
    // Let's also tell the browser what's the size of the image so it can calculate aspect ratios
    width: retinaSizes[0],
    height: imageDimensions && retinaSizes[0] / imageDimensions.aspectRatio
  };
}
export {
  getImageProps as g,
  urlFor as u
};
