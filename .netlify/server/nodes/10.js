import * as universal from '../entries/pages/faqs/_page.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/faqs/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/faqs/+page.js";
export const imports = ["_app/immutable/nodes/10.8b4cb273.js","_app/immutable/chunks/query.0147f34d.js","_app/immutable/chunks/index.browser.0b709075.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.cc480a97.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/SubHero.06d9b2e2.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.19f22af6.js","_app/immutable/chunks/index.8ef32e1a.js","_app/immutable/chunks/transitions.0c5e4cd1.js","_app/immutable/chunks/Meta.d3e9b8be.js","_app/immutable/chunks/config.78803d68.js","_app/immutable/chunks/image-url.umd.8faccd7b.js"];
export const stylesheets = ["_app/immutable/assets/ProgressBar.5dbe98d7.css"];
export const fonts = [];
