import { c as create_ssr_component, i as each, v as validate_component, a as add_attribute, e as escape } from "../../../chunks/index3.js";
import { S as SubHero } from "../../../chunks/SubHero.js";
import { M as Meta } from "../../../chunks/Meta.js";
import { N as NewsCard } from "../../../chunks/NewsCard.js";
import { s as sortByDate, f as filterByCategory, a as searchByTitle } from "../../../chunks/search-by-title.js";
const News = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected_category;
  let res;
  let { data = [] } = $$props;
  let { categories = [] } = $$props;
  let input = "";
  let selected = "Latest";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.categories === void 0 && $$bindings.categories && categories !== void 0)
    $$bindings.categories(categories);
  selected_category = [];
  res = sortByDate(filterByCategory(searchByTitle(data, input), selected_category), selected);
  return `<div class="min-h-screen section-container my-12 p-6 md:p-12 relative w-full grid-cols-1 grid md:grid-cols-[75%_1fr] lg:grid-cols-[80%_1fr] gap-4"><div class="col-start-1 lg:col-start-1">${res.length === 0 ? `<div class="text-center flex items-center gap-4 justify-center mt-32 text-xl w-full"><span class="text-2xl"><iconify-icon icon="material-symbols:warning"></iconify-icon></span>
				Article not found
			</div>` : ``}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">${each(res, (itm) => {
    return `${validate_component(NewsCard, "NewsCard").$$render($$result, { data: itm }, {}, {})}`;
  })}</div></div>
	<div class="row-start-1 md:col-start-2 lg:col-start-3 flex flex-col gap-4"><div class="flex flex-row md:flex-col gap-4"><input aria-label="SortBy" placeholder="Search ..." class="input px-2 py-2 basis-1/2 rounded-xl variant-soft-surface"${add_attribute("value", input, 0)}>
			<div class="flex basis-1/2 flex-row gap-1 item-center justify-end"><select class="select rounded-xl variant-soft-surface" aria-label="Sort By"><option value="Latest">Latest</option><option value="Oldest">Oldest</option></select></div></div>
		<div class="p-4 card variant-glass"><span class="text-lg mb-2 block">Category</span>
			<div class="flex flex-row md:flex-wrap gap-x-4 gap-y-4 w-full overflow-x-scroll">${each(categories, (item) => {
    return `<button${add_attribute(
      "class",
      `pt-2 px-2 text-[12px] font-light chip cursor-pointer  ${!selected_category.includes(item.title) ? "variant-ghost" : "variant-soft-primary"}`,
      0
    )}>${escape(item.title)}</button>`;
  })}</div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { title, news, seo, categories } = data.data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Meta, "Meta").$$render($$result, { data: seo }, {}, {})}
${validate_component(SubHero, "SubHero").$$render($$result, { title }, {}, {})}
${validate_component(News, "News").$$render($$result, { data: news, categories }, {}, {})}`;
});
export {
  Page as default
};
