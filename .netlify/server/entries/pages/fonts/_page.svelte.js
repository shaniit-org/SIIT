import { c as create_ssr_component, e as escape, a as add_attribute, v as validate_component, i as each } from "../../../chunks/index3.js";
import { M as Meta } from "../../../chunks/Meta.js";
import { S as SubHero } from "../../../chunks/SubHero.js";
const Mac = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47c-1.34.03-1.77-.79-3.29-.79c-1.53 0-2 .77-3.27.82c-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51c1.28-.02 2.5.87 3.29.87c.78 0 2.26-1.07 3.81-.91c.65.03 2.47.26 3.64 1.98c-.09.06-2.17 1.28-2.15 3.81c.03 3.02 2.65 4.03 2.68 4.04c-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5c.13 1.17-.34 2.35-1.04 3.19c-.69.85-1.83 1.51-2.95 1.42c-.15-1.15.41-2.35 1.05-3.11Z"></path></svg>`;
});
const Android = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.61 15.15c-.46 0-.84-.37-.84-.83s.38-.82.84-.82c.46 0 .84.36.84.82c0 .46-.38.83-.84.83m-9.2 0c-.46 0-.84-.37-.84-.83c0-.46.38-.82.84-.82c.46 0 .83.36.83.82c0 .46-.37.83-.83.83m9.5-5.01l1.67-2.88c.09-.17.03-.38-.13-.47c-.17-.1-.38-.04-.45.13l-1.71 2.91A10.15 10.15 0 0 0 12 8.91c-1.53 0-3 .33-4.27.91L6.04 6.91a.334.334 0 0 0-.47-.13c-.17.09-.22.3-.13.47l1.66 2.88C4.25 11.69 2.29 14.58 2 18h20c-.28-3.41-2.23-6.3-5.09-7.86Z"></path></svg>`;
});
const Windows = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 12V6.75l6-1.32v6.48L3 12m17-9v8.75l-10 .15V5.21L20 3M3 13l6 .09v6.81l-6-1.15V13m17 .25V22l-10-1.91V13.1l10 .15Z"></path></svg>`;
});
const SoftwareDownloadCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="card p-4"><div class="relative"><div class="absolute top-0 right-0"></div></div>
	<div class="flex flex-col p-6"><h2 class="h3 mb-4 pr-2">${escape(data.title)}</h2>
		<div class="mb-4"><span class="badge m-0 variant-soft-primary pt-2">${escape(data.type)}</span></div>
		<p class="leading-loose">${escape(data.description)}</p>

		<a${add_attribute("href", data.downloadlink, 0)} target="_blank" aria-label="Download" class="button variant-filled-primary rounded-xl mt-4 px-4 flex items-center gap-2 py-2 text-sm max-w-max"><span class="pt-1">Download </span>
			<iconify-icon icon="material-symbols:download" class="text-xl"></iconify-icon></a></div></div>`;
});
const Linux = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14.62 8.35c-.42.28-1.75 1.04-1.95 1.19c-.39.31-.75.29-1.14-.01c-.2-.16-1.53-.92-1.95-1.19c-.48-.31-.45-.7.08-.92c1.64-.69 3.28-.64 4.91.03c.49.21.51.6.05.9m7.22 7.28c-.93-2.09-2.2-3.99-3.84-5.66a4.31 4.31 0 0 1-1.06-1.88c-.1-.33-.17-.67-.24-1.01c-.2-.88-.29-1.78-.7-2.61c-.73-1.58-2-2.4-3.84-2.47c-1.81.05-3.16.81-3.95 2.4c-.21.43-.36.88-.46 1.34c-.17.76-.32 1.55-.5 2.32c-.15.65-.45 1.21-.96 1.71c-1.61 1.57-2.9 3.37-3.88 5.35c-.14.29-.28.58-.37.88c-.19.66.29 1.12.99.96c.44-.09.88-.18 1.3-.31c.41-.15.57-.05.67.35c.65 2.15 2.07 3.66 4.24 4.5c4.12 1.56 8.93-.66 9.97-4.58c.07-.27.17-.37.47-.27c.46.14.93.24 1.4.35c.49.09.85-.16.92-.64c.03-.26-.06-.49-.16-.73"></path></svg>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let linux;
  let mac;
  let windows;
  let android;
  let ios;
  let filterByType;
  let { data } = $$props;
  let filter = 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  filterByType = /**@type import('../../lib/types/keyboard_and_font').KeyboardOrFont[] | undefined */
  (data2) => {
    if (!data2)
      return [];
    {
      return data2;
    }
  };
  linux = filterByType(data.data.linux);
  mac = filterByType(data.data.mac);
  windows = filterByType(data.data.windows);
  android = filterByType(data.data.android);
  ios = filterByType(data.data.ios);
  return `${validate_component(Meta, "Meta").$$render($$result, { data: data.data.seo }, {}, {})}
${validate_component(SubHero, "SubHero").$$render($$result, { title: "Fonts & Keyboards" }, {}, {})}
<div class="min-h-screen section-container box"><div class="btn-group variant-soft-surface"><button${add_attribute("class", `pt-2 ${"variant-soft-primary"}`, 0)}>All
		</button>
		<button${add_attribute("class", `pt-2 ${filter === 1}`, 0)}>Keyboards
		</button>
		<button${add_attribute("class", `pt-2 ${filter === 2}`, 0)}>Fonts
		</button></div>
	${linux.length > 0 && linux ? `<div class="mt-10"><div class="flex items-center gap-2">${validate_component(Linux, "Linux").$$render($$result, {}, {}, {})}
				<h2 class="h3">Linux</h2></div>
			<div class="grid mt-4 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">${each(linux, (item) => {
    return `${validate_component(SoftwareDownloadCard, "SoftwareDownloadCard").$$render($$result, { data: item }, {}, {})}`;
  })}</div></div>` : ``}
	${windows.length > 0 ? `<div class="mt-12"><div class="flex items-center gap-2">${validate_component(Windows, "Windows").$$render($$result, {}, {}, {})}
				<h2 class="h3">Window</h2></div>
			<div class="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">${each(windows, (item) => {
    return `${validate_component(SoftwareDownloadCard, "SoftwareDownloadCard").$$render($$result, { data: item }, {}, {})}`;
  })}</div></div>` : ``}

	${mac.length > 0 ? `<div class="mt-12"><div class="flex items-center gap-2">${validate_component(Mac, "Mac").$$render($$result, {}, {}, {})}
				<h2 class="text-xl my-4 text-theme-dark cursor-pointer">Mac</h2></div>
			<div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">${each(mac, (item) => {
    return `${validate_component(SoftwareDownloadCard, "SoftwareDownloadCard").$$render($$result, { data: item }, {}, {})}`;
  })}</div></div>` : ``}

	${ios.length > 0 ? `<div class="mt-12"><div class="flex items-center gap-2">${validate_component(Android, "Android").$$render($$result, {}, {}, {})}
				<h2 class="h3">Android</h2></div>
			<div class="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">${each(ios, (item) => {
    return `${validate_component(SoftwareDownloadCard, "SoftwareDownloadCard").$$render($$result, { data: item }, {}, {})}`;
  })}</div></div>` : ``}
	${android.length > 0 ? `<div class="mt-12"><div class="flex items-center gap-2">${validate_component(Mac, "Mac").$$render($$result, {}, {}, {})}
				<h2 class="h3">IOS</h2></div>
			<div class="grid mt-4 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">${each(android, (item) => {
    return `${validate_component(SoftwareDownloadCard, "SoftwareDownloadCard").$$render($$result, { data: item }, {}, {})}`;
  })}</div></div>` : ``}</div>`;
});
export {
  Page as default
};
