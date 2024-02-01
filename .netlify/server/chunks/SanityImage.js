import { c as create_ssr_component, l as spread, n as escape_attribute_value, o as escape_object } from "./index3.js";
import { g as getImageProps } from "./config.js";
const SanityImage_svelte_svelte_type_style_lang = "";
const css = {
  code: "img.svelte-199ffoa{transition:500ms all ease-in-out;transform-origin:center}img[data-loaded='false'].svelte-199ffoa{filter:blur(5px);opacity:0.5;scale:1.01}img[data-loaded='true'].svelte-199ffoa{scale:1;opacity:1}",
  map: null
};
const SanityImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let imageProps;
  let loaded = false;
  let { image } = $$props;
  let { className = "" } = $$props;
  let { loading = "lazy" } = $$props;
  let { alt = "" } = $$props;
  let { maxWidth = 800 } = $$props;
  if ($$props.image === void 0 && $$bindings.image && image !== void 0)
    $$bindings.image(image);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  if ($$props.maxWidth === void 0 && $$bindings.maxWidth && maxWidth !== void 0)
    $$bindings.maxWidth(maxWidth);
  $$result.css.add(css);
  imageProps = getImageProps({ image, maxWidth });
  return `<img${spread(
    [
      { class: escape_attribute_value(className) },
      {
        "data-loaded": escape_attribute_value(loaded)
      },
      { alt: escape_attribute_value(alt || " ") },
      escape_object(imageProps),
      { loading: escape_attribute_value(loading) }
    ],
    { classes: "svelte-199ffoa" }
  )}>`;
});
export {
  SanityImage as S
};
