import { g as getContext, c as create_ssr_component, f as subscribe, e as escape, a as add_attribute, v as validate_component } from "../../chunks/index3.js";
import { S as SubHero } from "../../chunks/SubHero.js";
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let meta;
  let domain;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  meta = {
    title: "SIIT - Shan Institute of Information Technology",
    description: $page && $page?.error?.message
  };
  domain = {}.VITE_PUBLIC_DOMAIN;
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1k1q5lx_START -->${$$result.title = `<title>${escape(meta.title)}</title>`, ""}<meta name="title"${add_attribute("content", meta.title, 0)}><meta name="description"${add_attribute("content", meta.description, 0)}><meta property="og:type" content="website"><meta property="og:url"${add_attribute("content", domain, 0)}><meta property="og:title"${add_attribute("content", meta.title, 0)}><meta property="og:description"${add_attribute("content", meta.description, 0)}><meta property="og:image"${add_attribute("content", "/images/siit.png", 0)}><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${add_attribute("content", domain, 0)}><meta property="twitter:title"${add_attribute("content", meta.title, 0)}><meta property="twitter:description"${add_attribute("content", meta.description, 0)}><meta property="twitter:image" content="/images/siit.png"><!-- HEAD_svelte-1k1q5lx_END -->`, ""}
${validate_component(SubHero, "SubHero").$$render($$result, { title: "Oops 😥" }, {}, {})}
<div class="section-container box"><div><p class="mb-4 text-sm lg:text-4xl lg:leading-[2]">Page you are looking does not exist or has been removed.
		</p>

		<a href="/" class="btn variant-soft-primary">Go to Home</a></div></div>`;
});
export {
  Error$1 as default
};
