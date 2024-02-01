import { c as create_ssr_component, k as compute_rest_props, h as createEventDispatcher, a as add_attribute, e as escape, l as spread, n as escape_attribute_value, o as escape_object, d as compute_slots, v as validate_component } from "../../../../chunks/index3.js";
import "../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { S as SubHero } from "../../../../chunks/SubHero.js";
import { M as Meta } from "../../../../chunks/Meta.js";
const cBase = "inline-block";
const cLabel = "unstyled flex items-center";
const cTrack = "flex transition-all duration-[200ms] cursor-pointer";
const cThumb = "w-[50%] h-full scale-[0.8] transition-all duration-[200ms] shadow";
const SlideToggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cTrackActive;
  let cThumbBackground;
  let cThumbPos;
  let classesDisabled;
  let classesBase;
  let classesLabel;
  let classesTrack;
  let classesThumb;
  let $$restProps = compute_rest_props($$props, ["name", "checked", "size", "background", "active", "border", "rounded", "label"]);
  let $$slots = compute_slots(slots);
  createEventDispatcher();
  let { name } = $$props;
  let { checked = false } = $$props;
  let { size = "md" } = $$props;
  let { background = "bg-surface-400 dark:bg-surface-700" } = $$props;
  let { active = "bg-surface-900 dark:bg-surface-300" } = $$props;
  let { border = "" } = $$props;
  let { rounded = "rounded-full" } = $$props;
  let { label = "" } = $$props;
  let trackSize;
  switch (size) {
    case "sm":
      trackSize = "w-12 h-6";
      break;
    case "lg":
      trackSize = "w-20 h-10";
      break;
    default:
      trackSize = "w-16 h-8";
  }
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  cTrackActive = checked ? active : `${background} cursor-pointer`;
  cThumbBackground = checked ? "bg-white/75" : "bg-white";
  cThumbPos = checked ? "translate-x-full" : "";
  classesDisabled = $$props.disabled === true ? "opacity-50" : "hover:brightness-[105%] dark:hover:brightness-110 cursor-pointer";
  classesBase = `${cBase} ${rounded} ${classesDisabled} ${$$props.class ?? ""}`;
  classesLabel = `${cLabel}`;
  classesTrack = `${cTrack} ${border} ${rounded} ${trackSize} ${cTrackActive}`;
  classesThumb = `${cThumb} ${rounded} ${cThumbBackground} ${cThumbPos}`;
  return `<div${add_attribute("id", label, 0)} class="${"slide-toggle " + escape(classesBase, true)}" data-testid="slide-toggle" role="switch"${add_attribute("aria-label", label, 0)}${add_attribute("aria-checked", checked, 0)} tabindex="0"><label class="${"slide-toggle-label " + escape(classesLabel, true)}">
		<input${spread(
    [
      { type: "checkbox" },
      { class: "slide-toggle-input hidden" },
      { name: escape_attribute_value(name) },
      escape_object(prunedRestProps()),
      { disabled: $$props.disabled || null }
    ],
    {}
  )}${add_attribute("checked", checked, 1)}>
		
		<div class="${[
    "slide-toggle-track " + escape(classesTrack, true),
    $$props.disabled ? "cursor-not-allowed" : ""
  ].join(" ").trim()}"><div class="${[
    "slide-toggle-thumb " + escape(classesThumb, true),
    $$props.disabled ? "cursor-not-allowed" : ""
  ].join(" ").trim()}"></div></div>
		
		${$$slots.default ? `<div class="slide-toggle-text ml-3">${slots.default ? slots.default({}) : ``}</div>` : ``}</label></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let markTones = false;
  return `${validate_component(Meta, "Meta").$$render($$result, {}, {}, {})}
${validate_component(SubHero, "SubHero").$$render($$result, { title: "Shan Translit" }, {}, {})}
<div class="section-container box min-h-screen flex flex-col gap-4"><div class="w-full h-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 card p-4"><div class="flex flex-col basis-1/2"><span class="h4 mb-2">${`Tai`}</span>
			<textarea placeholder="Text" name="message" required class="text-xl textarea px-4 py-2 rounded-xl" rows="5">${escape("")}</textarea></div>
		<div class="relative flex flex-col gap-1 text-center"><button class="my-auto btn variant-soft-secondary"><iconify-icon icon="subway:round-arrow-1"></iconify-icon></button></div>
		<div class="flex flex-col basis-1/2"><span class="h4 mb-2">${`English`}</span>
			<textarea placeholder="Text" name="message" required class="text-xl textarea px-4 py-2 rounded-xl" rows="5">${escape("")}</textarea></div>

		${validate_component(SlideToggle, "SlideToggle").$$render(
    $$result,
    {
      name: "Exclude Tones",
      size: "sm",
      checked: markTones,
      active: "bg-primary-500"
    },
    {},
    {
      default: () => {
        return `Exclude Tone Marks`;
      }
    }
  )}</div>

	<div class="flex flex-row items-center gap-4"><button class="btn variant-soft-secondary mt-1 max-w-max pt-3">convert
		</button></div></div>`;
});
export {
  Page as default
};
