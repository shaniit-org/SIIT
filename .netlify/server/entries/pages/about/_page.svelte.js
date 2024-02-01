import { c as create_ssr_component, e as escape, v as validate_component, i as each } from "../../../chunks/index3.js";
import { S as SubHero } from "../../../chunks/SubHero.js";
import { M as Meta } from "../../../chunks/Meta.js";
import { S as SanityImage } from "../../../chunks/SanityImage.js";
import { P as PortableText_1 } from "../../../chunks/PortableText.js";
const Banner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="card variant-soft-surface rounded-none"><div class="section-container box grid grid-cols-1 md:grid-cols-3 gap-6"><h2 class="h2">${escape(data.title)}</h2>
		<div class="col-span-2 text-lg">${escape(data.description)}</div></div></div>`;
});
const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="section-container box flex gap-6 items-center md:gap-12 md:flex-row w-full flex-col py-12"><div class="basis-1/2 grow flex justify-center flex-col"><h2 class="h2 mb-4">${escape(data.title)}</h2>
		<p class="leading-loose">${escape(data.description)}</p></div>
	<div class="basis-1/2 grow aspect-video flex items-center">${validate_component(SanityImage, "SanityImage").$$render(
    $$result,
    {
      image: data.image,
      alt: "image",
      className: "w-full aspect-video object-cover rounded-token"
    },
    {},
    {}
  )}</div></div>`;
});
const Team = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div><div class="section-container box"><h2 class="h2 mb-8 md:mb-12">Our Awesome Team</h2>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-6">${each(data, (dat) => {
    return `<div class="aspect-square items-center flex flex-col gap-4"><div class="aspect-square w-full h-full rounded-token overflow-hidden group transition-all duration-500">${validate_component(SanityImage, "SanityImage").$$render(
      $$result,
      {
        image: dat.profile,
        alt: "image",
        className: "aspect-video object-cover w-full h-full group-hover:scale-105 transition-all duration-500 cursor-pointer"
      },
      {},
      {}
    )}</div>
					<h3 class="h3 font-bold">${escape(dat.role)}</h3>
				</div>`;
  })}</div></div></div>`;
});
const Mission = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="flex section-container box"><div class="flex gap-6 items-center md:gap-12 md:flex-row w-full flex-col md:py-12"><div class="basis-1/2 grow aspect-video flex items-center">${validate_component(SanityImage, "SanityImage").$$render(
    $$result,
    {
      maxWidth: 600,
      image: data.image,
      alt: "image",
      className: "w-full aspect-video object-cover rounded-token"
    },
    {},
    {}
  )}</div>
		<div class="basis-1/2 grow flex justify-center flex-col"><h2 class="h2 mb-2">${escape(data.title)}</h2>
			<div class="w-full">${validate_component(PortableText_1, "PortableText").$$render($$result, { value: data.description }, {}, {})}</div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Meta, "Meta").$$render($$result, { data: data.data.seo }, {}, {})}
<div class="w-full min-h-screen flex flex-col gap-6 md:gap-12">${validate_component(SubHero, "SubHero").$$render($$result, { title: "About Us" }, {}, {})}
	${each(data.data.sections, (sec) => {
    return `${sec._type === "aboutBanner" ? `${validate_component(About, "About").$$render($$result, { data: sec }, {}, {})}` : ``}
		${sec._type === "rowBanner" ? `${validate_component(Banner, "Banner").$$render($$result, { data: sec }, {}, {})}` : ``}
		${sec._type === "aboutMission" ? `${validate_component(Mission, "Mission").$$render($$result, { data: sec }, {}, {})}` : ``}
		${sec._type === "teamMember" ? `${validate_component(Team, "Team").$$render($$result, { data: sec.teams }, {}, {})}` : ``}`;
  })}</div>`;
});
export {
  Page as default
};
