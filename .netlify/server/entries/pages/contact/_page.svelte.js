import { c as create_ssr_component, v as validate_component } from "../../../chunks/index3.js";
import { S as SubHero } from "../../../chunks/SubHero.js";
import { M as Meta } from "../../../chunks/Meta.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Meta, "Meta").$$render($$result, { data: data.data.seo }, {}, {})}
${validate_component(SubHero, "SubHero").$$render($$result, { title: data.data.title }, {}, {})}
<div class="min-h-screen section-container box my-12"><div class="w-full card h-full overflow-hidden aspect-video max-h-[600px]"><iframe title="location of siit" class="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3701.2738804553615!2d96.0784871!3d21.9240201!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30cb73dd14e24807%3A0x23e132ecbe7ae3ee!2sSIIT%20Lab!5e0!3m2!1sen!2smm!4v1596806296158!5m2!1sen!2smm"></iframe></div>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-12"><div class="card p-4"><div class="flex flex-col py-4 px-4 md:px-4"><div class="h3 mb-4 flex items-center gap-4"><div class="badge text-2xl variant-soft-primary aspect-square"><iconify-icon icon="material-symbols:location-on-outline"></iconify-icon></div>
					Location
				</div>
				<ul class="list"><li>Waeponglaa Shan Kyaung</li>
					<li>Yepawsitekwin Qt, Pyi Kyi Thagon Tsp</li>
					<li>Mandalay, Myanmar</li></ul></div></div>

		<div class="card p-4"><div class="flex flex-col py-4 px-4"><div class="h3 mb-4 flex items-center gap-4"><div class="badge text-2xl variant-soft-primary aspect-square"><iconify-icon icon="material-symbols:mail-outline-rounded"></iconify-icon></div>
					Email
				</div>
				<ul class="list"><li><a href="mailto:contact@shaniit.org" class="anchor no-underline">contact@shaniit.org
						</a></li></ul></div></div>
		<div class="card p-4"><div class="flex flex-col py-4 px-6"><div class="h3 mb-4 flex items-center gap-4"><div class="badge text-2xl variant-soft-primary aspect-square"><iconify-icon icon="material-symbols:phone-enabled-outline-sharp" class="rotate-90"></iconify-icon></div>
					Phone
				</div>
				<ul class="list"><li><a href="tel:+959-527-5238" class="anchor no-underline">+959-527-5238 </a></li>
					<li><a href="tel:+959-797-469-924" class="anchor no-underline">+959-797-469-924 </a></li></ul></div></div></div></div>`;
});
export {
  Page as default
};
