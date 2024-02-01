import { c as create_ssr_component, v as validate_component, e as escape, i as each, a as add_attribute } from "../../../chunks/index3.js";
import { S as SubHero } from "../../../chunks/SubHero.js";
import { S as SanityImage } from "../../../chunks/SanityImage.js";
import { a as searchByTitle } from "../../../chunks/search-by-title.js";
import { M as Meta } from "../../../chunks/Meta.js";
const UserGuideCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="card overflow-hidden">${validate_component(SanityImage, "SanityImage").$$render(
    $$result,
    {
      maxWidth: 800,
      image: data.coverImage,
      alt: data.title,
      className: "w-full h-[380px] aspect-[9/16] object-cover"
    },
    {},
    {}
  )}
	<div class="flex flex-col p-8"><h2 class="h3 mb-1">${escape(data.title)}</h2>
		<div class="mb-4 mt-2">${each(data.categories, (cat) => {
    return `<span class="m-0 badge variant-soft-primary pt-2">${escape(cat.title)}</span>`;
  })}</div>
		<p class="text-sm line-clamp-3 leading-loose">${escape(data.description)}</p>

		${data.downloadlink ? `<a${add_attribute("href", data.downloadlink, 0)} target="_blank" aria-label="Download" class="button variant-filled-primary rounded-token mt-4 px-4 flex items-center gap-2 py-2 max-w-max text-sm"><span class="pt-1">Download </span>
				<iconify-icon icon="material-symbols:download" class="text-xl"></iconify-icon></a>` : ``}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let result;
  let { data } = $$props;
  const { userguides, seo } = data.data;
  let keyword = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  result = searchByTitle(userguides, keyword);
  return `${validate_component(Meta, "Meta").$$render($$result, { data: seo }, {}, {})}
${validate_component(SubHero, "SubHero").$$render($$result, { title: "User Guides" }, {}, {})}
<div class="min-h-screen flex flex-col section-container box"><input id="search" placeholder="Search user guides..." class="ml-auto input px-3 py-2 pt-3 rounded-xl max-w-[300px]"${add_attribute("value", keyword, 0)}>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">${each(result, (item) => {
    return `${validate_component(UserGuideCard, "UserGuideCard").$$render($$result, { data: item }, {}, {})}`;
  })}</div></div>`;
});
export {
  Page as default
};
