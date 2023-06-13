<!-- SanityImage.svelte -->
<script>
	import getImageProps from '../utils/getImageProps';

    let loaded = false
	export let image;
	export let loading = "lazy"
</script>

<img
  data-loaded={loaded}
  on:load={() => loaded = true}
  style="height: auto"
  {loading}
  fetchPriority={loading === "eager" ? "high" : undefined}
  alt={image.alt || " "}
  {// Pass src, srcset and sizes to the image element
    ...getImageProps({
      image,
      maxWidth: 600
    })
  }
/>
<style>
  img {
    transition: .15s opacity;
  }
  img[data-loaded="false"] {
    opacity: 0;
  }
</style>
