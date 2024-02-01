import { c as create_ssr_component, e as escape, i as each, v as validate_component } from "../../../../chunks/index3.js";
import { T as TableOfContents, S as SocialShare } from "../../../../chunks/SocialShare.js";
import { P as PortableText_1 } from "../../../../chunks/PortableText.js";
import { R as RelatedArticle } from "../../../../chunks/RelatedArticle.js";
import moment from "moment";
import { S as SanityImage } from "../../../../chunks/SanityImage.js";
import { M as Meta } from "../../../../chunks/Meta.js";
const ArticleBanner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { description = "" } = $$props;
  let { authors = [] } = $$props;
  let { publishedAt = "" } = $$props;
  let { readingTime } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.authors === void 0 && $$bindings.authors && authors !== void 0)
    $$bindings.authors(authors);
  if ($$props.publishedAt === void 0 && $$bindings.publishedAt && publishedAt !== void 0)
    $$bindings.publishedAt(publishedAt);
  if ($$props.readingTime === void 0 && $$bindings.readingTime && readingTime !== void 0)
    $$bindings.readingTime(readingTime);
  return `<div class="w-full relative card min-h-[400px] flex justify-end flex-col overflow-hidden rounded-none box"><div class="section-container box w-full"><div class="flex gap-2 flex-col"><h1 class="h1 mb-2">${escape(title)}</h1>
			<p class="my-4 leading-loose text-lg">${escape(description)}</p></div>
		<div class="flex gap-4 md:flex-row flex-col">${authors ? `${each(authors, (aut) => {
    return `<div class="flex items-center gap-4 flex-row"><div class="w-[60px] aspect-square bg-gray-800 h-[60px] rounded-full">${validate_component(SanityImage, "SanityImage").$$render(
      $$result,
      {
        maxWidth: 80,
        image: aut.profile,
        className: "w-[60px] h-[60px] object-cover rounded-full"
      },
      {},
      {}
    )}</div>
						<div class="flex flex-col"><span class="uppercase mb-1 font-bold text-sm">${escape(aut.name)}</span>
							<div class="flex flex-col md:flex-row md:items-center md:gap-4"><span>${escape(readingTime)} min read</span>
								<span>${escape(moment(publishedAt).format("LL"))}</span>
							</div></div>
					</div>`;
  })}` : ``}</div></div>

	<div class="z-[-11] card rounded-full backdrop-blur w-[30%] blur-[200px] aspect-square absolute top-0 right-0 translate-y-[-90%] bg-gradient-to-tl opacity-20 variant-gradient-success-error"></div>
	<div class="z-[-13] card rounded-full backdrop-blur w-[40%] blur-[200px] aspect-square absolute top-0 left-1/2 translate-x-[-50%] translate-y-[-90%] variant-gradient-primary-secondary bg-gradient-to-tl opacity-40"></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let news;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ data: news } = data);
  return `${validate_component(Meta, "Meta").$$render($$result, { data: news.seo }, {}, {})}
<div class="min-h-screen">${validate_component(ArticleBanner, "ArticleBanner").$$render(
    $$result,
    {
      description: news.description,
      title: news.title,
      authors: news.authors,
      publishedAt: news.publishedAt,
      readingTime: news.readingTime
    },
    {},
    {}
  )}
	<div class="relative grid grid-cols-1 mx-auto section-container gap-4 md:gap-8 box"><div class="md:col-start-2 min-w-[200px] lg:max-w-[300px] md:max-w-[200px] scroll-pt-20">${validate_component(TableOfContents, "TableOfContents").$$render($$result, { data: news.body }, {}, {})}</div>
		<div class="md:col-start-1 md:row-start-1 md:prose-lg lg:prose-xl max-w-[800px]">${validate_component(PortableText_1, "PortableText").$$render($$result, { value: news.body }, {}, {})}
			${validate_component(SocialShare, "SocialShare").$$render($$result, {}, {}, {})}</div></div>
	${validate_component(RelatedArticle, "RelatedArticle").$$render($$result, { data: news.related }, {}, {})}</div>`;
});
export {
  Page as default
};
