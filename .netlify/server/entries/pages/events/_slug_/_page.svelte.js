import { c as create_ssr_component, e as escape, v as validate_component } from "../../../../chunks/index3.js";
import { T as TableOfContents, S as SocialShare } from "../../../../chunks/SocialShare.js";
import moment from "moment";
import { M as Meta } from "../../../../chunks/Meta.js";
import { P as PortableText_1 } from "../../../../chunks/PortableText.js";
import { R as RelatedArticle } from "../../../../chunks/RelatedArticle.js";
const EventBanner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { description = "" } = $$props;
  let { publishedAt = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.publishedAt === void 0 && $$bindings.publishedAt && publishedAt !== void 0)
    $$bindings.publishedAt(publishedAt);
  return `<div class="w-full relative card min-h-[400px] flex justify-end flex-col overflow-hidden box"><div class="box section-container w-full"><div class="flex gap-2 flex-col"><h1 class="h1 font-bold mb-4">${escape(title)}</h1>
			<p class="md:w-3/4 block leading-relaxed text-lg mt-4">${escape(description)}</p>
			<span class="mt-2 badge variant-soft-primary pt-2 max-w-max px-4 py-1 font-bold">${escape(moment(publishedAt).format("LL"))}</span></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let event;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ data: event } = data);
  return `${validate_component(Meta, "Meta").$$render($$result, { data: event.seo }, {}, {})}
<div class="min-h-screen">${validate_component(EventBanner, "EventBanner").$$render(
    $$result,
    {
      title: event.title,
      publishedAt: event.publishedAt,
      description: event.description
    },
    {},
    {}
  )}
	<div class="relative p-4 md:p-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] mx-auto section-container gap-4 md:gap-8"><div class="md:col-start-2 min-w-[200px] scroll-pt-20">${validate_component(TableOfContents, "TableOfContents").$$render($$result, { data: event.body }, {}, {})}</div>
		<div class="md:col-start-1 md:row-start-1 md:prose-lg lg:prose-xl max-w-[800px]">${validate_component(PortableText_1, "PortableText").$$render($$result, { value: event.body }, {}, {})}
			${validate_component(SocialShare, "SocialShare").$$render($$result, {}, {}, {})}</div></div>
	${validate_component(RelatedArticle, "RelatedArticle").$$render($$result, { data: event.related }, {}, {})}</div>`;
});
export {
  Page as default
};
