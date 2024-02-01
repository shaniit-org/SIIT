import { c as create_ssr_component, e as escape, v as validate_component } from "../../../../chunks/index3.js";
import { P as PortableText_1 } from "../../../../chunks/PortableText.js";
import { T as TableOfContents, S as SocialShare } from "../../../../chunks/SocialShare.js";
const FaqBanner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return `<div class="w-full relative card box rounded-none bg-opacity-50 backdrop-filter backdrop-blur-lg"><div class="section-container lg:px-12 py-10 text-6xl"><h1 class="h1 font-bold">${escape(title)}</h1></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="min-h-screen">${validate_component(FaqBanner, "FaqBanner").$$render($$result, { title: data.data.question }, {}, {})}
	<div class="relative p-4 md:p-12 grid grid-cols-1 mx-auto section-container gap-4 md:gap-8"><div class="md:col-start-2 min-w-[200px] lg:max-w-[300px] md:max-w-[200px] scroll-pt-20">${validate_component(TableOfContents, "TableOfContents").$$render($$result, { data: data.data.answer }, {}, {})}</div>
		<div class="md:col-start-1 md:row-start-1 flex flex-col">${validate_component(PortableText_1, "PortableText").$$render($$result, { value: data.data.answer }, {}, {})}

			${validate_component(SocialShare, "SocialShare").$$render($$result, {}, {}, {})}</div></div></div>`;
});
export {
  Page as default
};
