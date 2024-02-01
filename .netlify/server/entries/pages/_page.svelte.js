import { c as create_ssr_component, v as validate_component, e as escape, a as add_attribute, i as each } from "../../chunks/index3.js";
import { S as SanityImage } from "../../chunks/SanityImage.js";
import moment from "moment";
import { N as NewsCard } from "../../chunks/NewsCard.js";
import { M as Meta } from "../../chunks/Meta.js";
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="rounded-xl z-20 relative grid gap-4 h-[30vh] md:h-[30vw] section-container box mx-auto">${validate_component(SanityImage, "SanityImage").$$render(
    $$result,
    {
      maxWidth: 1920,
      image: data.heroImage,
      alt: data.title,
      loading: "eager",
      className: "rounded-xl z-12 w-full object-cover z-[-1] h-full overflow-hidden "
    },
    {},
    {}
  )}
	<div class="z-[-13] card rounded-full backdrop-blur w-[90%] blur-[300px] aspect-square absolute top-0 left-1/2 translate-x-[-50%] translate-y-[-90%] variant-gradient-primary-secondary bg-gradient-to-tl opacity-40"></div></div>`;
});
const Highlight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { term } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.term === void 0 && $$bindings.term && term !== void 0)
    $$bindings.term(term);
  return `<div class="section-container box z-10"><div class="grid grid-cols-1 md:grid-cols-2 relative gap-4">${term ? `<div class="card card-hover overflow-hidden flex items-center p-4 md:p-8"><a href="${"/terms/" + escape(term.slug, true)}" class="p-4 w-full max-h-max space-y-2 mt-auto relative"><h2 class="h2 mb-4">${escape(term.title)}</h2>
					<div class="flex items-center mb-4 gap-4"><span class="font-semibold">Term Of The Day </span>
						<span class="italic">${escape(moment(/* @__PURE__ */ new Date()).format("LL"))}</span></div>
					<p class="leading-relaxed mt-2">${escape(term.description)}</p></a></div>` : ``}

		<a${add_attribute(
    "href",
    data.authors ? `/blogs/${data.slug}` : `/events/${data.slug}`,
    0
  )} class="p-4 md:p-8 card card-hover overflow-hidden flex flex-col justify-center"><h3 class="h3 font-sans md:leading-loose mb-4">${escape(data.title)}</h3>
			<p class="mb-6 md:text-base leading-loose text-lg">${escape(data.description)}</p></a></div></div>`;
});
const News = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { section } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.section === void 0 && $$bindings.section && section !== void 0)
    $$bindings.section(section);
  return `<div class="section-container box"><div class="flex flex-col mb-6"><h2 class="h2 my-4">${escape(section.title)}</h2>

		${section.description ? `<p class="text-lg">${escape(section.description)}</p>` : ``}</div>
	<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">${each(data, (item) => {
    return `${validate_component(NewsCard, "NewsCard").$$render($$result, { data: item }, {}, {})}`;
  })}</div></div>`;
});
const Donate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="card"><div class="section-container box grid grid-cols-1 md:grid-cols-3 gap-6"><h3 class="text-xl md:text-2xl md:leading-relaxed">${escape(data.title)}</h3>
		<div class="col-span-2"><p class="mb-4 text-sm lg:text-xl lg:leading-[2]">${escape(data.description)}</p>
			<a${add_attribute("href", data.link.url, 0)} class="cursor-pointer anchor no-underline">${escape(data.link.title)}</a></div></div></div>`;
});
const HomeEventCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<a${add_attribute("href", `/events/${data.slug}`, 0)} class="cursor-pointer card flex flex-col gap-4 p-4 md:p-6 variant-glass"><h3 class="h3 mb-2">${escape(data.title)}</h3>

	${validate_component(SanityImage, "SanityImage").$$render(
    $$result,
    {
      maxWidth: 450,
      image: data.coverImage,
      alt: data.title,
      className: "  rounded-2xl aspect-video w-full object-cover"
    },
    {},
    {}
  )}
	<div class="flex flex-col"><p class="mb-2 leading-relaxed line-clamp-2">${escape(data.description)}</p>
		<span>${escape(moment(data.publishedAt).format("LL"))}</span></div></a>`;
});
const Events = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data = [] } = $$props;
  let { section } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.section === void 0 && $$bindings.section && section !== void 0)
    $$bindings.section(section);
  return `<div class="section-container box"><div class="flex flex-col mb-8"><h3 class="h2 mb-3">${escape(section.title)}</h3>
		${section.description ? `<p class="">${escape(section.description)}</p>` : ``}</div>
	<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6">${each(data, (item) => {
    return `${validate_component(HomeEventCard, "HomeEventCard").$$render($$result, { data: item }, {}, {})}`;
  })}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { events, news } = data.data;
  const { homePage } = data.data;
  const { sections, seo, termsOfTheDay: term } = homePage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Meta, "Meta").$$render($$result, { data: seo }, {}, {})}
${each(sections, (s) => {
    return `${s._type === "Hero" ? `${validate_component(Hero, "Hero").$$render($$result, { data: s }, {}, {})}` : ``}
	${s._type === "Highlight" ? `${validate_component(Highlight, "HighLight").$$render($$result, { data: s, term }, {}, {})}` : ``}
	${s._type === "News" ? `${validate_component(News, "News").$$render($$result, { data: news, section: s }, {}, {})}` : ``}
	${s._type === "Events" ? `${validate_component(Events, "Events").$$render($$result, { data: events, section: s }, {}, {})}` : ``}
	${s._type === "Donate" ? `${validate_component(Donate, "Donate").$$render($$result, { data: s }, {}, {})}` : ``}`;
  })}`;
});
export {
  Page as default
};
