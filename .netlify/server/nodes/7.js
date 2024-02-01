import * as universal from '../entries/pages/donate/_page.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/donate/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/donate/+page.js";
export const imports = ["_app/immutable/nodes/7.b35a6b71.js","_app/immutable/chunks/query.0147f34d.js","_app/immutable/chunks/index.browser.0b709075.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.cc480a97.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/Meta.d3e9b8be.js","_app/immutable/chunks/config.78803d68.js","_app/immutable/chunks/image-url.umd.8faccd7b.js","_app/immutable/chunks/SubHero.06d9b2e2.js","_app/immutable/chunks/SanityImage.d62a5675.js","_app/immutable/chunks/PortableText.50f6ca85.js","_app/immutable/chunks/index.a566d507.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.19f22af6.js","_app/immutable/chunks/index.8ef32e1a.js","_app/immutable/chunks/clipboard.4097f1a4.js","_app/immutable/chunks/stores.836ac74e.js"];
export const stylesheets = ["_app/immutable/assets/SanityImage.23506464.css","_app/immutable/assets/ProgressBar.5dbe98d7.css"];
export const fonts = [];
