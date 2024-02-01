import { c as create_ssr_component, a as add_attribute, v as validate_component, e as escape, i as each } from "../../../chunks/index3.js";
import { S as SubHero } from "../../../chunks/SubHero.js";
import { M as Meta } from "../../../chunks/Meta.js";
import moment from "moment";
import { S as SanityImage } from "../../../chunks/SanityImage.js";
import { s as sortByDate } from "../../../chunks/search-by-title.js";
const EventCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<a${add_attribute("href", `/events/${data.slug}`, 0)} class="card card-hover p-6 cursor-pointer flex flex-col gap-8 md:flex-row md:gap-6 items-center"><div class="w-full h-full basis-[20%] aspect-video md:max-w-[330px] shrink-0 overflow-hidden">${validate_component(SanityImage, "SanityImage").$$render(
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
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let res;
  let { data } = $$props;
  let selected = "Latest";
  let { title, events, seo } = data.data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  res = sortByDate(events, selected);
  return `<div class="min-h-screen">${validate_component(Meta, "Meta").$$render($$result, { data: seo }, {}, {})}
	${validate_component(SubHero, "SubHero").$$render($$result, { title }, {}, {})}
	<div class="section-container flex flex-col box mb-12"><select class="rounded-xl ml-auto mb-8 select max-w-max" aria-label="Sort By"><option value="Latest">Latest</option><option value="Oldest">Oldest</option></select>
		<div class="flex flex-col gap-4">${each(res, (item) => {
    return `${validate_component(EventCard, "EventCard").$$render($$result, { data: item }, {}, {})}`;
  })}</div></div></div>`;
});
export {
  Page as default
};
