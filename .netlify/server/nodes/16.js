import * as universal from '../entries/pages/studio/_...studio_/_page.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/studio/_...studio_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/studio/[...studio]/+page.js";
export const imports = ["_app/immutable/nodes/16.8a0b4417.js","_app/immutable/chunks/16.6f53b8a5.js","_app/immutable/chunks/index.cc480a97.js","_app/immutable/chunks/floating-ui.dom.373c8bf6.js","_app/immutable/chunks/index.browser.0b709075.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/image-url.umd.8faccd7b.js","_app/immutable/chunks/moment.fbc5633a.js","_app/immutable/chunks/index.a566d507.js"];
export const stylesheets = ["_app/immutable/assets/16.b8dd0c54.css"];
export const fonts = [];
