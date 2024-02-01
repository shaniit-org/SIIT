import { c as create_ssr_component, e as escape, v as validate_component } from "../../../../chunks/index3.js";
import { P as PortableText_1 } from "../../../../chunks/PortableText.js";
import { T as TableOfContents, S as SocialShare } from "../../../../chunks/SocialShare.js";
const TermHero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { charType } = $$props;
  let { description } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.charType === void 0 && $$bindings.charType && charType !== void 0)
    $$bindings.charType(charType);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  return `<div class="w-full relative card box rounded-none bg-opacity-50 backdrop-filter backdrop-blur-lg"><div class="section-container p-6 md:p-12 w-full"><h1 class="h1 font-bold text-5xl lg:text-6xl">${escape(title)}</h1>
		<div class="flex flex-col gap-2 mt-8"><p class="leading-loose mb-2">${escape(description)}</p>
			<span class="badge variant-soft-primary max-w-max pt-1">${escape(charType)}</span></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="min-h-screen">${validate_component(TermHero, "TermHero").$$render(
    $$result,
    {
      charType: data.data.type,
      title: data.data.title,
      description: data.data.description
    },
    {},
    {}
  )}

	<div class="relative p-4 md:p-12 grid grid-cols-1 mx-auto section-container gap-4 md:gap-8"><div class="md:col-start-2 min-w-[200px] lg:max-w-[300px] md:max-w-[200px] scroll-pt-20">${validate_component(TableOfContents, "TableOfContents").$$render($$result, { data: data.data.body }, {}, {})}</div>
		<div class="md:col-start-1 md:row-start-1 md:prose-lg lg:prose-xl max-w-[800px]">${validate_component(PortableText_1, "PortableText").$$render($$result, { value: data.data.body }, {}, {})}

			${validate_component(SocialShare, "SocialShare").$$render($$result, {}, {}, {})}</div></div></div>`;
});
export {
  Page as default
};
