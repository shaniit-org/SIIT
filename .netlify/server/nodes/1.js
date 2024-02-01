

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.d251ba37.js","_app/immutable/chunks/index.cc480a97.js","_app/immutable/chunks/singletons.2caf1096.js","_app/immutable/chunks/index.8ef32e1a.js","_app/immutable/chunks/SubHero.06d9b2e2.js"];
export const stylesheets = [];
export const fonts = [];
