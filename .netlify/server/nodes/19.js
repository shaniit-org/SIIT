import * as universal from '../entries/pages/userguides/_page.js';

export const index = 19;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/userguides/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/userguides/+page.js";
export const imports = ["_app/immutable/nodes/19.e5eeb45b.js","_app/immutable/chunks/query.0147f34d.js","_app/immutable/chunks/index.browser.0b709075.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.cc480a97.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/SubHero.06d9b2e2.js","_app/immutable/chunks/SanityImage.d62a5675.js","_app/immutable/chunks/config.78803d68.js","_app/immutable/chunks/image-url.umd.8faccd7b.js","_app/immutable/chunks/search-by-title.77c1d69d.js","_app/immutable/chunks/Meta.d3e9b8be.js"];
export const stylesheets = ["_app/immutable/assets/SanityImage.23506464.css"];
export const fonts = [];
