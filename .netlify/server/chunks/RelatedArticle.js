import { c as create_ssr_component, a as add_attribute, e as escape, v as validate_component, i as each } from "./index3.js";
import moment from "moment";
import { S as SanityImage } from "./SanityImage.js";
const RelatedCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let url;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  url = data._type === "event" ? `/events/${data.slug}` : `/blogs/${data.slug}`;
  return `<a${add_attribute("href", url, 0)} class="cursor-pointer card flex flex-col gap-4 p-4 md:p-6"><h3 class="h3 mb-2">${escape(data.title)}</h3>

	${validate_component(SanityImage, "SanityImage").$$render(
    $$result,
    {
      maxWidth: 450,
      image: data.coverImage,
      alt: data.title,
      className: "rounded-2xl aspect-video w-full object-cover"
    },
    {},
    {}
  )}
	<div class="flex flex-col"><p class="mb-2 leading-relaxed line-clamp-2">${escape(data.description)}</p>
		<span>${escape(moment(data.publishedAt).format("LL"))}</span></div></a>`;
});
const RelatedArticle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${data ? `${data.length > 0 ? `<div class="section-container p-4 md:px-12"><h3 class="h3 mb-3">Related Articles</h3>
			<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-12">${each(data, (itm) => {
    return `${validate_component(RelatedCard, "RelatedCard").$$render($$result, { data: itm }, {}, {})}`;
  })}</div></div>` : ``}` : ``}`;
});
export {
  RelatedArticle as R
};
