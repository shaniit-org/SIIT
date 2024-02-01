import { c as create_ssr_component, v as validate_component, i as each, a as add_attribute, e as escape } from "../../../chunks/index3.js";
import { S as SubHero } from "../../../chunks/SubHero.js";
import { M as Meta } from "../../../chunks/Meta.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Meta, "Meta").$$render($$result, { data: data.seo }, {}, {})}
<div class="min-h-screen">${validate_component(SubHero, "SubHero").$$render($$result, { title: "Terms" }, {}, {})}
	<div class="section-container box"><div class="btn-group variant-soft-surface w-full overflow-x-auto">${each(data.char, (alphabet) => {
    return `<a${add_attribute("href", `#${alphabet}`, 0)} class="anchor h2">${escape(alphabet)}
				</a>`;
  })}</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">${each(data.char, (alphabet) => {
    return `<div class="card p-4 md:p-8 flex flex-col gap-2 scroll-mt-24"${add_attribute("id", alphabet, 0)}><h2 class="h2 font-bold mb-4">${escape(alphabet)}</h2>
					<div class="w-full"><ul class="list flex flex-col w-full">${data.data[alphabet] ? `${each(data.data[alphabet], (item) => {
      return `<li class="list-nav w-full"><a${add_attribute("href", `/terms/${item.slug.current}`, 0)} class="anchor no-underline">${escape(item.title)}</a>
									</li>`;
    })}` : ``}
						</ul></div>
				</div>`;
  })}</div></div></div>`;
});
export {
  Page as default
};
