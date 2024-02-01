import { c as create_ssr_component, v as validate_component, a as add_attribute, e as escape } from "../../../../chunks/index3.js";
import { g as getToastStore } from "../../../../chunks/stores.js";
import "../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { S as SubHero } from "../../../../chunks/SubHero.js";
import { M as Meta } from "../../../../chunks/Meta.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getToastStore();
  let breaker = "|";
  return `${validate_component(Meta, "Meta").$$render($$result, {}, {}, {})}
${validate_component(SubHero, "SubHero").$$render($$result, { title: "Syllable Breaker" }, {}, {})}
<div class="section-container box min-h-screen flex flex-col md:flex-row gap-4"><div class="w-full h-full flex flex-col gap-4 card p-4"><label class="label mb-4"><span>Break word</span>
			<input class="input px-4 py-2 rounded-xl" title="Enter your email " type="text" placeholder="Enter your email "${add_attribute("value", breaker, 0)}></label>
		<textarea placeholder="Enter message" name="message" required class="textarea px-4 py-2 rounded-xl" rows="5">${escape("")}</textarea>
		${`<button class="btn variant-soft-primary max-w-max pt-3 mt-1">Break</button>`}</div>
	<div class="w-full flex flex-col gap-2"><div class="text-xl p-6 card">${escape("")}</div>
		<button class="btn variant-soft-secondary mt-1 max-w-max pt-3">Copy
		</button></div></div>`;
});
export {
  Page as default
};
