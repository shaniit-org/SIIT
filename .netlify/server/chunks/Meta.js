import { c as create_ssr_component, e as escape, a as add_attribute } from "./index3.js";
import { u as urlFor } from "./config.js";
const Meta = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title;
  let description;
  let ogImage;
  let domain;
  let image;
  let defaultMeta = {
    title: "SIIT - Shan Institute of Information Technology",
    description: "Shan Institute of Information Technology"
  };
  let { data = defaultMeta } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ title, description, ogImage } = data);
  domain = {}.VITE_PUBLIC_DOMAIN;
  image = ogImage && urlFor(ogImage).width(1200).height(628).url();
  return `${$$result.head += `<!-- HEAD_svelte-leyvdy_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}<meta name="title"${add_attribute("content", title, 0)}><meta name="description"${add_attribute("content", description, 0)}><meta property="og:type" content="website"><meta property="og:url"${add_attribute("content", domain, 0)}><meta property="og:title"${add_attribute("content", title, 0)}><meta property="og:description"${add_attribute("content", description, 0)}><meta property="og:image"${add_attribute("content", image, 0)}><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${add_attribute("content", domain, 0)}><meta property="twitter:title"${add_attribute("content", title, 0)}><meta property="twitter:description"${add_attribute("content", description, 0)}><meta property="twitter:image"${add_attribute("content", image, 0)}><!-- HEAD_svelte-leyvdy_END -->`, ""}`;
});
export {
  Meta as M
};
