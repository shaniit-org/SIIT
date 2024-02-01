import { c as create_ssr_component, f as subscribe, s as setContext, e as escape, h as createEventDispatcher, g as getContext, a as add_attribute, d as compute_slots, v as validate_component, i as each } from "../../../chunks/index3.js";
import { S as SubHero } from "../../../chunks/SubHero.js";
import { p as prefersReducedMotionStore } from "../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { w as writable } from "../../../chunks/index2.js";
import { s as slide } from "../../../chunks/index4.js";
import { M as Meta } from "../../../chunks/Meta.js";
const Accordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let $prefersReducedMotionStore, $$unsubscribe_prefersReducedMotionStore;
  $$unsubscribe_prefersReducedMotionStore = subscribe(prefersReducedMotionStore, (value) => $prefersReducedMotionStore = value);
  let { autocollapse = false } = $$props;
  let { width = "w-full" } = $$props;
  let { spacing = "space-y-1" } = $$props;
  let { disabled = false } = $$props;
  let { padding = "py-2 px-4" } = $$props;
  let { hover = "hover:bg-primary-hover-token" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { caretOpen = "rotate-180" } = $$props;
  let { caretClosed = "" } = $$props;
  let { regionControl = "" } = $$props;
  let { regionPanel = "space-y-4" } = $$props;
  let { regionCaret = "" } = $$props;
  let { transitions = !$prefersReducedMotionStore } = $$props;
  let { transitionIn = slide } = $$props;
  let { transitionInParams = { duration: 200 } } = $$props;
  let { transitionOut = slide } = $$props;
  let { transitionOutParams = { duration: 200 } } = $$props;
  const active = writable(null);
  setContext("active", active);
  setContext("autocollapse", autocollapse);
  setContext("disabled", disabled);
  setContext("padding", padding);
  setContext("hover", hover);
  setContext("rounded", rounded);
  setContext("caretOpen", caretOpen);
  setContext("caretClosed", caretClosed);
  setContext("regionControl", regionControl);
  setContext("regionPanel", regionPanel);
  setContext("regionCaret", regionCaret);
  setContext("transitions", transitions);
  setContext("transitionIn", transitionIn);
  setContext("transitionInParams", transitionInParams);
  setContext("transitionOut", transitionOut);
  setContext("transitionOutParams", transitionOutParams);
  if ($$props.autocollapse === void 0 && $$bindings.autocollapse && autocollapse !== void 0)
    $$bindings.autocollapse(autocollapse);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.caretOpen === void 0 && $$bindings.caretOpen && caretOpen !== void 0)
    $$bindings.caretOpen(caretOpen);
  if ($$props.caretClosed === void 0 && $$bindings.caretClosed && caretClosed !== void 0)
    $$bindings.caretClosed(caretClosed);
  if ($$props.regionControl === void 0 && $$bindings.regionControl && regionControl !== void 0)
    $$bindings.regionControl(regionControl);
  if ($$props.regionPanel === void 0 && $$bindings.regionPanel && regionPanel !== void 0)
    $$bindings.regionPanel(regionPanel);
  if ($$props.regionCaret === void 0 && $$bindings.regionCaret && regionCaret !== void 0)
    $$bindings.regionCaret(regionCaret);
  if ($$props.transitions === void 0 && $$bindings.transitions && transitions !== void 0)
    $$bindings.transitions(transitions);
  if ($$props.transitionIn === void 0 && $$bindings.transitionIn && transitionIn !== void 0)
    $$bindings.transitionIn(transitionIn);
  if ($$props.transitionInParams === void 0 && $$bindings.transitionInParams && transitionInParams !== void 0)
    $$bindings.transitionInParams(transitionInParams);
  if ($$props.transitionOut === void 0 && $$bindings.transitionOut && transitionOut !== void 0)
    $$bindings.transitionOut(transitionOut);
  if ($$props.transitionOutParams === void 0 && $$bindings.transitionOutParams && transitionOutParams !== void 0)
    $$bindings.transitionOutParams(transitionOutParams);
  classesBase = `${width} ${spacing} ${$$props.class ?? ""}`;
  $$unsubscribe_prefersReducedMotionStore();
  return `

<div class="${"accordion " + escape(classesBase, true)}" data-testid="accordion">${slots.default ? slots.default({}) : ``}</div>`;
});
const cBase = "";
const cControl = "text-start w-full flex items-center space-x-4";
const cControlIcons = "fill-current w-3 transition-transform duration-[200ms]";
const cPanel = "";
const AccordionItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let openState;
  let classesBase;
  let classesControl;
  let classesCaretState;
  let classesControlCaret;
  let classesControlIcons;
  let classesPanel;
  let $$slots = compute_slots(slots);
  let $active, $$unsubscribe_active;
  const dispatch = createEventDispatcher();
  let { open = false } = $$props;
  let { id = String(Math.random()) } = $$props;
  let { autocollapse = getContext("autocollapse") } = $$props;
  let { active = getContext("active") } = $$props;
  $$unsubscribe_active = subscribe(active, (value) => $active = value);
  let { disabled = getContext("disabled") } = $$props;
  let { padding = getContext("padding") } = $$props;
  let { hover = getContext("hover") } = $$props;
  let { rounded = getContext("rounded") } = $$props;
  let { caretOpen = getContext("caretOpen") } = $$props;
  let { caretClosed = getContext("caretClosed") } = $$props;
  let { regionControl = getContext("regionControl") } = $$props;
  let { regionPanel = getContext("regionPanel") } = $$props;
  let { regionCaret = getContext("regionCaret") } = $$props;
  let { transitions = getContext("transitions") } = $$props;
  let { transitionIn = getContext("transitionIn") } = $$props;
  let { transitionInParams = getContext("transitionInParams") } = $$props;
  let { transitionOut = getContext("transitionOut") } = $$props;
  let { transitionOutParams = getContext("transitionOutParams") } = $$props;
  const svgCaretIcon = `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class={classesControlCaret}>
			<path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
		</svg>`;
  function setActive(event) {
    if (autocollapse === true) {
      active.set(id);
    } else {
      open = !open;
    }
    onToggle(event);
  }
  function onToggle(event) {
    const currentOpenState = autocollapse ? $active === id : open;
    dispatch("toggle", {
      event,
      id,
      panelId: `accordion-panel-${id}`,
      open: currentOpenState,
      autocollapse
    });
  }
  if (autocollapse && open)
    setActive();
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.autocollapse === void 0 && $$bindings.autocollapse && autocollapse !== void 0)
    $$bindings.autocollapse(autocollapse);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.caretOpen === void 0 && $$bindings.caretOpen && caretOpen !== void 0)
    $$bindings.caretOpen(caretOpen);
  if ($$props.caretClosed === void 0 && $$bindings.caretClosed && caretClosed !== void 0)
    $$bindings.caretClosed(caretClosed);
  if ($$props.regionControl === void 0 && $$bindings.regionControl && regionControl !== void 0)
    $$bindings.regionControl(regionControl);
  if ($$props.regionPanel === void 0 && $$bindings.regionPanel && regionPanel !== void 0)
    $$bindings.regionPanel(regionPanel);
  if ($$props.regionCaret === void 0 && $$bindings.regionCaret && regionCaret !== void 0)
    $$bindings.regionCaret(regionCaret);
  if ($$props.transitions === void 0 && $$bindings.transitions && transitions !== void 0)
    $$bindings.transitions(transitions);
  if ($$props.transitionIn === void 0 && $$bindings.transitionIn && transitionIn !== void 0)
    $$bindings.transitionIn(transitionIn);
  if ($$props.transitionInParams === void 0 && $$bindings.transitionInParams && transitionInParams !== void 0)
    $$bindings.transitionInParams(transitionInParams);
  if ($$props.transitionOut === void 0 && $$bindings.transitionOut && transitionOut !== void 0)
    $$bindings.transitionOut(transitionOut);
  if ($$props.transitionOutParams === void 0 && $$bindings.transitionOutParams && transitionOutParams !== void 0)
    $$bindings.transitionOutParams(transitionOutParams);
  {
    if (open && autocollapse)
      setActive();
  }
  openState = autocollapse ? $active === id : open;
  classesBase = `${cBase} ${$$props.class ?? ""}`;
  classesControl = `${cControl} ${padding} ${hover} ${rounded} ${regionControl}`;
  classesCaretState = openState ? caretOpen : caretClosed;
  classesControlCaret = `${cControlIcons} ${regionCaret} ${classesCaretState}`;
  classesControlIcons = `${cControlIcons} ${regionCaret}`;
  classesPanel = `${cPanel} ${padding} ${rounded} ${regionPanel}`;
  $$unsubscribe_active();
  return `

<div class="${"accordion-item " + escape(classesBase, true)}" data-testid="accordion-item">
	<button type="button" class="${"accordion-control " + escape(classesControl, true)}"${add_attribute("id", id, 0)}${add_attribute("aria-expanded", openState, 0)} aria-controls="${"accordion-panel-" + escape(id, true)}" ${disabled ? "disabled" : ""}>
		${$$slots.lead ? `<div class="accordion-lead">${slots.lead ? slots.lead({}) : ``}</div>` : ``}
		
		<div class="accordion-summary flex-1">${slots.summary ? slots.summary({}) : `(summary)`}</div>
		
		${$$slots.iconClosed || $$slots.iconOpen ? `
			
			<div class="${"accordion-summary-icons " + escape(classesControlIcons, true)}">${openState ? `${slots.iconClosed ? slots.iconClosed({}) : `<!-- HTML_TAG_START -->${svgCaretIcon}<!-- HTML_TAG_END -->`}` : `${slots.iconOpen ? slots.iconOpen({}) : `<!-- HTML_TAG_START -->${svgCaretIcon}<!-- HTML_TAG_END -->`}`}</div>` : `
			<div class="${"accordion-summary-caret " + escape(classesControlCaret, true)}"><!-- HTML_TAG_START -->${svgCaretIcon}<!-- HTML_TAG_END --></div>`}</button>
	
	${openState ? `<div class="${"accordion-panel " + escape(classesPanel, true)}" id="${"accordion-panel-" + escape(id, true)}" role="region"${add_attribute("aria-hidden", !openState, 0)}${add_attribute("aria-labelledby", id, 0)}>${slots.content ? slots.content({}) : `(content)`}</div>` : ``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { seo, faqs } = data.data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Meta, "Meta").$$render($$result, { data: seo }, {}, {})}
${validate_component(SubHero, "SubHero").$$render($$result, { title: "FAQs" }, {}, {})}
<div class="min-h-screen section-container box">${faqs?.length > 0 ? `${validate_component(Accordion, "Accordion").$$render($$result, { spacing: "space-y-4" }, {}, {
    default: () => {
      return `${each(faqs, (item) => {
        return `${validate_component(AccordionItem, "AccordionItem").$$render($$result, { class: "mt-4" }, {}, {
          content: () => {
            return `<div class="text-lg"><ul class="list md:pl-4 flex flex-col gap-4">${each(item.qanda, (itm) => {
              return `<li class="text-left gap-2"><a href="/elements/lists" class="flex gap-2"><span class="shrink-0 flex-auto badge hidden md:flex variant-soft-primary aspect-square"><iconify-icon icon="formkit:arrowright"></iconify-icon></span>
											<a class="flex-auto anchor mt-1" href="${"/faqs/" + escape(itm._id, true)}">${escape(itm.question)}</a></a>
									</li>`;
            })}
							</ul></div>
					`;
          },
          summary: () => {
            return `<h3 class="text-lg my-2">${escape(item.category)}</h3>
					`;
          }
        })}`;
      })}`;
    }
  })}` : ``}</div>`;
});
export {
  Page as default
};
