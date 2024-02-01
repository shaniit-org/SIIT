import * as universal from '../entries/pages/fonts/_page.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/fonts/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/fonts/+page.js";
export const imports = ["_app/immutable/nodes/12.062cf6c0.js","_app/immutable/chunks/query.0147f34d.js","_app/immutable/chunks/index.browser.0b709075.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.cc480a97.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/Meta.d3e9b8be.js","_app/immutable/chunks/config.78803d68.js","_app/immutable/chunks/image-url.umd.8faccd7b.js","_app/immutable/chunks/SubHero.06d9b2e2.js"];
export const stylesheets = [];
export const fonts = [];
