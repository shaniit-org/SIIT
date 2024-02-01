import { c as create_ssr_component, i as each, a as add_attribute, e as escape } from "./index3.js";
const findHeadings = (value) => {
  return value.filter((child) => /h\d/.test(child.style));
};
const get = (object, path) => path.reduce((prev, curr) => prev[curr], object);
const getObjectPath = (path) => path.length === 0 ? path : ["subheadings"].concat(path.join(".subheadings.").split("."));
const parseOutline = (ast) => {
  const outline = { subheadings: [] };
  const headings = findHeadings(ast);
  const path = [];
  let lastLevel = 0;
  headings.forEach((heading) => {
    const level = Number(heading.style.slice(1));
    heading.subheadings = [];
    if (level < lastLevel)
      for (let i = lastLevel; i >= level; i--)
        path.pop();
    else if (level === lastLevel)
      path.pop();
    const prop = get(outline, getObjectPath(path));
    prop.subheadings.push(heading);
    path.push(prop.subheadings.length - 1);
    lastLevel = level;
  });
  return outline.subheadings;
};
const TableOfContents = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let outline;
  let { data } = $$props;
  let { toggle = true } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.toggle === void 0 && $$bindings.toggle && toggle !== void 0)
    $$bindings.toggle(toggle);
  outline = parseOutline(data);
  return `${outline.length > 0 ? `<div class="text-md cursor-pointer card rounded-xl p-4 sticky top-20 flex gap-2 flex-col lg:min-w-[300px] border-solid border-theme-muted"><button class="text-left outline-none border-none"><span class="h5">On this page</span></button>
		${toggle ? `<ul class="flex flex-col gap-2">${each(outline, (item) => {
    return `<li class="flex items-center gap-2"><iconify-icon icon="basil:caret-right-outline"></iconify-icon>
						<a class="flex items-center anchor no-underline"${add_attribute("href", `#${item.children[0]._key}`, 0)}>${escape(item.children[0].text)}</a>
					</li>`;
  })}</ul>` : ``}</div>` : ``}`;
});
const SocialShare = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<button aria-label="Share" class="text-xl btn-icon variant-soft-primary grid place-items-center"><iconify-icon icon="ri:facebook-fill"></iconify-icon></button>`;
});
export {
  SocialShare as S,
  TableOfContents as T
};
