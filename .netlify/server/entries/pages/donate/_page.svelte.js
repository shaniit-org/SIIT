import { c as create_ssr_component, v as validate_component, e as escape, i as each, a as add_attribute } from "../../../chunks/index3.js";
import { M as Meta } from "../../../chunks/Meta.js";
import { S as SubHero } from "../../../chunks/SubHero.js";
import { S as SanityImage } from "../../../chunks/SanityImage.js";
import { P as PortableText_1 } from "../../../chunks/PortableText.js";
import { g as getToastStore } from "../../../chunks/stores.js";
import "../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
const DonationMethod = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getToastStore();
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<button class="card card-hover p-4 cursor-pointer flex flex-col md:flex-row md:gap-6 items-center"><div class="w-full h-full basis-[20%] md:max-w-[330px]">${validate_component(SanityImage, "SanityImage").$$render(
    $$result,
    {
      className: "w-full aspect-square mx-auto object-contain bg-transparent max-w-[100px]",
      image: data.Image,
      alt: data.name,
      maxWidth: 100
    },
    {},
    {}
  )}</div>
	<div class="text-center md:text-left flex flex-col mt-4 px-4"><h3 class="h5 font-bold md:mb-2">${escape(data.name)}</h3>
		<p class="leading-relaxed line-clamp-3">${escape(data.number)}</p></div></button>`;
});
let formID = "mrgwbjkb";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Meta, "Meta").$$render($$result, { data: data.data.seo }, {}, {})}
${validate_component(SubHero, "SubHero").$$render($$result, { title: "Donate Us" }, {}, {})}
<div class="section-container p-4 md:px-12 py-12">${validate_component(SanityImage, "SanityImage").$$render(
    $$result,
    {
      image: data.data.coverImage,
      maxWidth: 1e3,
      alt: data.data.title,
      className: "rounded-xl w-full h-full "
    },
    {},
    {}
  )}
	<div class="w-full grid place-items-center mt-6"><div class="leading-loose md:max-w-[80%]"><div class="leading-loose mx-auto md:max-w-3xl">${validate_component(PortableText_1, "PortableText").$$render($$result, { value: data.data.content }, {}, {})}</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 my-8">${each(data.data.payment_methods, (method) => {
    return `${validate_component(DonationMethod, "DonationMethod").$$render($$result, { data: method }, {}, {})}`;
  })}</div>

			<div class="mx-auto md:max-w-3xl"><form class="flex flex-col p-4 md:p-8 card basis-1/2 md:max-w-lg my-12"${add_attribute("action", `https://formspree.io/f/${formID}`, 0)} method="POST"><p class="h4 mb-4">Contact Us</p>
					<label class="label mb-4"><span>Email</span>
						<input class="input px-4 py-2" title="Enter your email " type="text" placeholder="Enter your email "></label>
					<p class="mb-2">Message</p>
					<textarea placeholder="Enter message" name="message" required class="textarea px-4 py-2" rows="5"></textarea>
					<button type="submit" class="mt-4 button variant-filled-primary py-2 rounded-token pt-4">Submit</button></form></div></div></div></div>`;
});
export {
  Page as default
};
