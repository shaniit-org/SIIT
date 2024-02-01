import { c as create_ssr_component, a as add_attribute, e as escape, v as validate_component } from "./index3.js";
import moment from "moment";
import { S as SanityImage } from "./SanityImage.js";
const NewsCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<a${add_attribute("href", `/blogs/${data.slug}`, 0)} class="cursor-pointer card flex flex-col gap-4 p-4 md:p-6"><h3 class="h3 mb-2">${escape(data.title)}</h3>

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
export {
  NewsCard as N
};
