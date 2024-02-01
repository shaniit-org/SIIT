import { c as create_ssr_component, a as add_attribute, v as validate_component, e as escape, i as each } from "../../../chunks/index3.js";
import moment from "moment";
import { S as SanityImage } from "../../../chunks/SanityImage.js";
import { M as Meta } from "../../../chunks/Meta.js";
import { S as SubHero } from "../../../chunks/SubHero.js";
const NLPArticle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<a${add_attribute("href", `/blogs/${data.slug}`, 0)} class="card card-hover p-6 cursor-pointer flex flex-col gap-8 md:flex-row md:gap-6 items-center"><div class="w-full h-full basis-[20%] aspect-video md:max-w-[330px] shrink-0 overflow-hidden">${validate_component(SanityImage, "SanityImage").$$render(
    $$result,
    {
      className: "rounded-xl w-full h-full object-cover",
      maxWidth: 300,
      image: data.coverImage,
      alt: data.title
    },
    {},
    {}
  )}</div>
	<div class="flex flex-col mt-4"><h3 class="h3 font-bold md:mb-2">${escape(data.title)}</h3>
		<span class="md:mb-2 block text-base mt-2 mb-4">${escape(moment(data.publishedAt).format("LL"))}</span>
		<p class="leading-relaxed line-clamp-3">${escape(data.description)}</p></div></a>`;
});
const NLPCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="card variant-soft-surface p-8 min-h-[160px] flex justify-between flex-col"><div class="flex gap-2 flex-col"><h2 class="h3 mb-2">${escape(data.title)}</h2>
		<p class="leading-relaxed">${escape(data.description)}</p></div>
	<div class="w-full flex flex-col"><div class="flex justify-between"><div class="aspect-square grid items-center"><iconify-icon icon="material-symbols:tools-pliers-wire-stripper" class="text-3xl rotate-45"></iconify-icon></div>

			<a${add_attribute("href", data.downloadlink, 0)} target="_blank" aria-label="Download" class="button variant-filled-primary rounded-xl text-sm mt-4 px-4 flex items-center gap-2 py-2 max-w-max"><span class="">More </span>
				<iconify-icon icon="formkit:arrowright" class=""></iconify-icon></a></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Meta, "Meta").$$render($$result, { data: data.data.seo }, {}, {})}
${validate_component(SubHero, "SubHero").$$render($$result, { title: "Natural language processing" }, {}, {})}
<div class="section-container box min-h-screen"><div class="flex flex-col"><p class="text-xl leading-relaxed max-w-[900px]">${escape(data.data.description)}</p></div>
	<div class="flex gap-12 flex-col mt-12"><div><div class="flex flex-col gap-2"><h2 class="h3 mb-4">Tools</h2></div>
			<div class="grid gap-4 grid-cols-1 md:grid-cols-2 max-w-[900px]">${each(data.data.tools, (tool) => {
    return `${validate_component(NLPCard, "NlpCard").$$render($$result, { data: tool }, {}, {})}`;
  })}</div></div>
		<div><div class="flex items-center gap-2"><h2 class="h3 mb-4">Articles</h2></div>
			<div class="flex flex-col gap-4 mt-2">${each(data.data.news, (tol) => {
    return `${validate_component(NLPArticle, "NlpArticle").$$render($$result, { data: tol }, {}, {})}`;
  })}</div></div></div></div>`;
});
export {
  Page as default
};
