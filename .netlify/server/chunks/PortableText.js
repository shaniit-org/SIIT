import { c as create_ssr_component, f as subscribe, h as createEventDispatcher, e as escape, a as add_attribute, t as is_void, v as validate_component, m as missing_component, i as each } from "./index3.js";
import "prismjs";
import { S as SanityImage } from "./SanityImage.js";
import "./ProgressBar.svelte_svelte_type_style_lang.js";
import { w as writable } from "./index2.js";
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-javascript.js";
import "prismjs/components/prism-css.js";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-git.js";
import "prismjs/components/prism-python.js";
import "prismjs/components/prism-markdown.js";
const storeHighlightJs = writable(void 0);
const cBase = "overflow-hidden shadow";
const cHeader = "text-xs text-white/50 uppercase flex justify-between items-center p-2 pl-4";
const cPre = "whitespace-pre-wrap break-all p-4 pt-1";
function languageFormatter(lang) {
  if (lang === "js")
    return "javascript";
  if (lang === "ts")
    return "typescript";
  if (lang === "shell")
    return "terminal";
  return lang;
}
const CodeBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let $storeHighlightJs, $$unsubscribe_storeHighlightJs;
  $$unsubscribe_storeHighlightJs = subscribe(storeHighlightJs, (value) => $storeHighlightJs = value);
  createEventDispatcher();
  let { language = "plaintext" } = $$props;
  let { code = "" } = $$props;
  let { lineNumbers = false } = $$props;
  let { background = "bg-neutral-900/90" } = $$props;
  let { blur = "" } = $$props;
  let { text = "text-sm" } = $$props;
  let { color = "text-white" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { shadow = "shadow" } = $$props;
  let { button = "btn btn-sm variant-soft !text-white" } = $$props;
  let { buttonLabel = "Copy" } = $$props;
  let { buttonCopied = "👍" } = $$props;
  let formatted = false;
  let displayCode = code;
  if ($$props.language === void 0 && $$bindings.language && language !== void 0)
    $$bindings.language(language);
  if ($$props.code === void 0 && $$bindings.code && code !== void 0)
    $$bindings.code(code);
  if ($$props.lineNumbers === void 0 && $$bindings.lineNumbers && lineNumbers !== void 0)
    $$bindings.lineNumbers(lineNumbers);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.blur === void 0 && $$bindings.blur && blur !== void 0)
    $$bindings.blur(blur);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
    $$bindings.shadow(shadow);
  if ($$props.button === void 0 && $$bindings.button && button !== void 0)
    $$bindings.button(button);
  if ($$props.buttonLabel === void 0 && $$bindings.buttonLabel && buttonLabel !== void 0)
    $$bindings.buttonLabel(buttonLabel);
  if ($$props.buttonCopied === void 0 && $$bindings.buttonCopied && buttonCopied !== void 0)
    $$bindings.buttonCopied(buttonCopied);
  {
    if ($storeHighlightJs !== void 0) {
      displayCode = $storeHighlightJs.highlight(code, { language }).value.trim();
      formatted = true;
    }
  }
  {
    if (lineNumbers) {
      displayCode = displayCode.replace(/^/gm, () => {
        return '<span class="line"></span>	';
      });
      formatted = true;
    }
  }
  classesBase = `${cBase} ${background} ${blur} ${text} ${color} ${rounded} ${shadow} ${$$props.class ?? ""}`;
  $$unsubscribe_storeHighlightJs();
  return `
${language && code ? `<div class="${"codeblock " + escape(classesBase, true)}" data-testid="codeblock">
	<header class="${"codeblock-header " + escape(cHeader, true)}">
		<span class="codeblock-language">${escape(languageFormatter(language))}</span>
		
		<button class="${"codeblock-btn " + escape(button, true)}">${escape(buttonLabel)}</button></header>
	
	<pre class="${"codeblock-pre " + escape(cPre, true)}"><code class="${"codeblock-code language-" + escape(language, true) + " lineNumbers"}">${formatted ? `<!-- HTML_TAG_START -->${displayCode}<!-- HTML_TAG_END -->` : `${escape(code.trim())}`}</code></pre></div>` : ``}`;
});
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function isPortableTextSpan(node) {
  return node._type === "span" && "text" in node && typeof node.text === "string" && (typeof node.marks === "undefined" || Array.isArray(node.marks) && node.marks.every((mark) => typeof mark === "string"));
}
function isPortableTextBlock(node) {
  return (
    // A block doesn't _have_ to be named 'block' - to differentiate between
    // allowed child types and marks, one might name them differently
    typeof node._type === "string" && // Toolkit-types like nested spans are @-prefixed
    node._type[0] !== "@" && // `markDefs` isn't _required_ per say, but if it's there, it needs to be an array
    (!("markDefs" in node) || !node.markDefs || Array.isArray(node.markDefs) && // Every mark definition needs to have an `_key` to be mappable in child spans
    node.markDefs.every((def) => typeof def._key === "string")) && // `children` is required and needs to be an array
    "children" in node && Array.isArray(node.children) && // All children are objects with `_type` (usually spans, but can contain other stuff)
    node.children.every((child) => typeof child === "object" && "_type" in child)
  );
}
function isPortableTextListItemBlock(block) {
  return isPortableTextBlock(block) && "listItem" in block && typeof block.listItem === "string" && (typeof block.level === "undefined" || typeof block.level === "number");
}
function isPortableTextToolkitList(block) {
  return block._type === "@list";
}
function isPortableTextToolkitSpan(span) {
  return span._type === "@span";
}
function isPortableTextToolkitTextNode(node) {
  return node._type === "@text";
}
const knownDecorators = ["strong", "em", "code", "underline", "strike-through"];
function sortMarksByOccurences(span, index, blockChildren) {
  if (!isPortableTextSpan(span) || !span.marks) {
    return [];
  }
  if (!span.marks.length) {
    return [];
  }
  const marks = span.marks.slice();
  const occurences = {};
  marks.forEach((mark) => {
    occurences[mark] = 1;
    for (let siblingIndex = index + 1; siblingIndex < blockChildren.length; siblingIndex++) {
      const sibling = blockChildren[siblingIndex];
      if (sibling && isPortableTextSpan(sibling) && Array.isArray(sibling.marks) && sibling.marks.indexOf(mark) !== -1) {
        occurences[mark]++;
      } else {
        break;
      }
    }
  });
  return marks.sort((markA, markB) => sortMarks(occurences, markA, markB));
}
function sortMarks(occurences, markA, markB) {
  const aOccurences = occurences[markA];
  const bOccurences = occurences[markB];
  if (aOccurences !== bOccurences) {
    return bOccurences - aOccurences;
  }
  const aKnownPos = knownDecorators.indexOf(markA);
  const bKnownPos = knownDecorators.indexOf(markB);
  if (aKnownPos !== bKnownPos) {
    return aKnownPos - bKnownPos;
  }
  return markA.localeCompare(markB);
}
function buildMarksTree(block) {
  var _a;
  const {
    children,
    markDefs = []
  } = block;
  if (!children || !children.length) {
    return [];
  }
  const sortedMarks = children.map(sortMarksByOccurences);
  const rootNode = {
    _type: "@span",
    children: [],
    markType: "<unknown>"
  };
  let nodeStack = [rootNode];
  for (let i = 0; i < children.length; i++) {
    const span = children[i];
    if (!span) {
      continue;
    }
    const marksNeeded = sortedMarks[i] || [];
    let pos = 1;
    if (nodeStack.length > 1) {
      for (pos; pos < nodeStack.length; pos++) {
        const mark = ((_a = nodeStack[pos]) == null ? void 0 : _a.markKey) || "";
        const index = marksNeeded.indexOf(mark);
        if (index === -1) {
          break;
        }
        marksNeeded.splice(index, 1);
      }
    }
    nodeStack = nodeStack.slice(0, pos);
    let currentNode = nodeStack[nodeStack.length - 1];
    if (!currentNode) {
      continue;
    }
    for (const markKey of marksNeeded) {
      const markDef = markDefs.find((def) => def._key === markKey);
      const markType = markDef ? markDef._type : markKey;
      const node = {
        _type: "@span",
        _key: span._key,
        children: [],
        markDef,
        markType,
        markKey
      };
      currentNode.children.push(node);
      nodeStack.push(node);
      currentNode = node;
    }
    if (isPortableTextSpan(span)) {
      const lines = span.text.split("\n");
      for (let line = lines.length; line-- > 1; ) {
        lines.splice(line, 0, "\n");
      }
      currentNode.children = currentNode.children.concat(lines.map((text) => ({
        _type: "@text",
        text
      })));
    } else {
      currentNode.children = currentNode.children.concat(span);
    }
  }
  return rootNode.children;
}
function nestLists(blocks, mode) {
  const tree = [];
  let currentList;
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (!block) {
      continue;
    }
    if (!isPortableTextListItemBlock(block)) {
      tree.push(block);
      currentList = void 0;
      continue;
    }
    if (!currentList) {
      currentList = listFromBlock(block, i, mode);
      tree.push(currentList);
      continue;
    }
    if (blockMatchesList(block, currentList)) {
      currentList.children.push(block);
      continue;
    }
    if ((block.level || 1) > currentList.level) {
      const newList = listFromBlock(block, i, mode);
      if (mode === "html") {
        const lastListItem = currentList.children[currentList.children.length - 1];
        const newLastChild = _objectSpread(_objectSpread({}, lastListItem), {}, {
          children: [...lastListItem.children, newList]
        });
        currentList.children[currentList.children.length - 1] = newLastChild;
      } else {
        currentList.children.push(newList);
      }
      currentList = newList;
      continue;
    }
    if ((block.level || 1) < currentList.level) {
      const matchingBranch = tree[tree.length - 1];
      const match = matchingBranch && findListMatching(matchingBranch, block);
      if (match) {
        currentList = match;
        currentList.children.push(block);
        continue;
      }
      currentList = listFromBlock(block, i, mode);
      tree.push(currentList);
      continue;
    }
    if (block.listItem !== currentList.listItem) {
      const matchingBranch = tree[tree.length - 1];
      const match = matchingBranch && findListMatching(matchingBranch, {
        level: block.level || 1
      });
      if (match && match.listItem === block.listItem) {
        currentList = match;
        currentList.children.push(block);
        continue;
      } else {
        currentList = listFromBlock(block, i, mode);
        tree.push(currentList);
        continue;
      }
    }
    console.warn("Unknown state encountered for block", block);
    tree.push(block);
  }
  return tree;
}
function blockMatchesList(block, list) {
  return (block.level || 1) === list.level && block.listItem === list.listItem;
}
function listFromBlock(block, index, mode) {
  return {
    _type: "@list",
    _key: "".concat(block._key || "".concat(index), "-parent"),
    mode,
    level: block.level || 1,
    listItem: block.listItem,
    children: [block]
  };
}
function findListMatching(rootNode, matching) {
  const level = matching.level || 1;
  const style = matching.listItem || "normal";
  const filterOnType = typeof matching.listItem === "string";
  if (isPortableTextToolkitList(rootNode) && (rootNode.level || 1) === level && filterOnType && (rootNode.listItem || "normal") === style) {
    return rootNode;
  }
  if (!("children" in rootNode)) {
    return void 0;
  }
  const node = rootNode.children[rootNode.children.length - 1];
  return node && !isPortableTextSpan(node) ? findListMatching(node, matching) : void 0;
}
function spanToPlainText(span) {
  let text = "";
  span.children.forEach((current) => {
    if (isPortableTextToolkitTextNode(current)) {
      text += current.text;
    } else if (isPortableTextToolkitSpan(current)) {
      text += spanToPlainText(current);
    }
  });
  return text;
}
const LIST_NEST_MODE_HTML = "html";
function getRandomKey() {
  return Math.random().toFixed(5).split(".")[1];
}
function assertSpanKey(span) {
  return {
    _key: span._key || getRandomKey(),
    ...span
  };
}
function assertBlockKey(block) {
  return {
    _key: block._key || getRandomKey(),
    ...block,
    ...block._type === "block" && Array.isArray(block.children) ? {
      children: block.children.map(assertSpanKey)
    } : {}
  };
}
const DefaultMark = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let markType;
  let { portableText } = $$props;
  if ($$props.portableText === void 0 && $$bindings.portableText && portableText !== void 0)
    $$bindings.portableText(portableText);
  ({ markType } = portableText);
  return `${markType === "strong" ? `<strong>${slots.default ? slots.default({}) : ``}</strong>` : `${markType === "em" ? `<em>${slots.default ? slots.default({}) : ``}</em>` : `${markType === "code" ? `<code>${slots.default ? slots.default({}) : ``}</code>` : `${markType === "underline" ? `<span style="text-decoration:underline;">${slots.default ? slots.default({}) : ``}</span>` : `${markType === "strike-through" ? `<del>${slots.default ? slots.default({}) : ``}</del>` : `${slots.default ? slots.default({}) : ``}`}`}`}`}`}`;
});
const DefaultLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let value;
  let href;
  let { portableText } = $$props;
  if ($$props.portableText === void 0 && $$bindings.portableText && portableText !== void 0)
    $$bindings.portableText(portableText);
  ({ value } = portableText);
  href = (value === null || value === void 0 ? void 0 : value.href) || (value === null || value === void 0 ? void 0 : value.url) || (value === null || value === void 0 ? void 0 : value.link) || (value === null || value === void 0 ? void 0 : value.value);
  return `${typeof href === "string" ? `<a${add_attribute("href", href, 0)}>${slots.default ? slots.default({}) : ``}</a>` : `${slots.default ? slots.default({}) : ``}`}`;
});
const DefaultBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let value;
  let style;
  let { portableText } = $$props;
  if ($$props.portableText === void 0 && $$bindings.portableText && portableText !== void 0)
    $$bindings.portableText(portableText);
  ({ value } = portableText);
  style = value.style || "normal";
  return `${["h1", "h2", "h3", "h4", "h5", "h6", "blockquote"].includes(style) ? `${((tag) => {
    return tag ? `<${style}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(style)}` : `${style === "normal" ? `<p>${slots.default ? slots.default({}) : ``}</p>` : `${slots.default ? slots.default({}) : ``}`}`}`;
});
const DefaultList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let value;
  let listItem;
  let { portableText } = $$props;
  if ($$props.portableText === void 0 && $$bindings.portableText && portableText !== void 0)
    $$bindings.portableText(portableText);
  ({ value } = portableText);
  ({ listItem } = value);
  return `${listItem === "number" ? `<ol>${slots.default ? slots.default({}) : ``}</ol>` : `<ul>${slots.default ? slots.default({}) : ``}</ul>`}`;
});
const DefaultListItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<li>${slots.default ? slots.default({}) : ``}</li>`;
});
const DefaultHardBreak = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<br>`;
});
const UnknownType = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``}`;
});
const defaultComponents = {
  marks: {
    "strike-through": DefaultMark,
    code: DefaultMark,
    em: DefaultMark,
    strong: DefaultMark,
    underline: DefaultMark,
    link: DefaultLink
  },
  block: {
    blockquote: DefaultBlock,
    h1: DefaultBlock,
    h2: DefaultBlock,
    h3: DefaultBlock,
    h4: DefaultBlock,
    h5: DefaultBlock,
    h6: DefaultBlock,
    normal: DefaultBlock
  },
  list: {
    bullet: DefaultList,
    number: DefaultList
  },
  listItem: {
    bullet: DefaultListItem,
    number: DefaultListItem
  },
  types: {},
  hardBreak: DefaultHardBreak,
  unknownBlockStyle: DefaultBlock,
  unknownList: DefaultList,
  unknownListItem: DefaultListItem,
  unknownMark: DefaultMark,
  unknownType: UnknownType
};
function mergeComponents(parent, overrides = {}) {
  return {
    ...parent,
    ...overrides,
    block: mergeDeeply(parent, overrides, "block"),
    list: mergeDeeply(parent, overrides, "list"),
    listItem: mergeDeeply(parent, overrides, "listItem"),
    marks: mergeDeeply(parent, overrides, "marks"),
    types: mergeDeeply(parent, overrides, "types")
  };
}
function mergeDeeply(parent, overrides, key) {
  const override = overrides[key];
  const parentVal = parent[key];
  if (typeof override === "function") {
    return override;
  }
  if (override && typeof parentVal === "function") {
    return override;
  }
  if (override) {
    return { ...parentVal, ...override };
  }
  return parentVal;
}
const RenderBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let components2;
  let style;
  let blockComponent;
  let blockProps;
  let { global } = $$props;
  let { node } = $$props;
  let { indexInParent } = $$props;
  if ($$props.global === void 0 && $$bindings.global && global !== void 0)
    $$bindings.global(global);
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  if ($$props.indexInParent === void 0 && $$bindings.indexInParent && indexInParent !== void 0)
    $$bindings.indexInParent(indexInParent);
  ({ components: components2 } = global);
  ({ style = "normal" } = node);
  blockComponent = typeof components2.block === "function" ? components2.block : components2.block[style];
  {
    if (!blockComponent) {
      global.missingComponentHandler(style, "blockStyle");
    }
  }
  blockProps = (() => {
    return { global, indexInParent, value: node };
  })();
  return `${validate_component(blockComponent || components2.unknownBlockStyle || missing_component, "svelte:component").$$render($$result, { portableText: blockProps }, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const RenderCustomBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let components2;
  let _type;
  let customComponent;
  let componentProps;
  let { global } = $$props;
  let { node } = $$props;
  let { parentBlock } = $$props;
  let { indexInParent } = $$props;
  let { isInline = false } = $$props;
  if ($$props.global === void 0 && $$bindings.global && global !== void 0)
    $$bindings.global(global);
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  if ($$props.parentBlock === void 0 && $$bindings.parentBlock && parentBlock !== void 0)
    $$bindings.parentBlock(parentBlock);
  if ($$props.indexInParent === void 0 && $$bindings.indexInParent && indexInParent !== void 0)
    $$bindings.indexInParent(indexInParent);
  if ($$props.isInline === void 0 && $$bindings.isInline && isInline !== void 0)
    $$bindings.isInline(isInline);
  ({ components: components2 } = global);
  ({ _type } = node);
  customComponent = components2.types[_type];
  {
    if (!customComponent) {
      global.missingComponentHandler(_type, "block");
    }
  }
  componentProps = (() => {
    return {
      global,
      value: node,
      indexInParent,
      parentBlock,
      isInline
    };
  })();
  return `${validate_component(customComponent || components2.unknownType || missing_component, "svelte:component").$$render($$result, { portableText: componentProps }, {}, {})}`;
});
const RenderList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let components2;
  let listItem;
  let handler;
  let listComponent;
  let listProps;
  let { global } = $$props;
  let { indexInParent } = $$props;
  let { node } = $$props;
  if ($$props.global === void 0 && $$bindings.global && global !== void 0)
    $$bindings.global(global);
  if ($$props.indexInParent === void 0 && $$bindings.indexInParent && indexInParent !== void 0)
    $$bindings.indexInParent(indexInParent);
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  ({ components: components2 } = global);
  ({ listItem } = node);
  handler = typeof components2.list === "function" ? components2.list : components2.list[listItem];
  listComponent = handler;
  {
    if (!listComponent) {
      global.missingComponentHandler(listItem, "listStyle");
    }
  }
  listProps = (() => {
    return { global, value: node, indexInParent };
  })();
  return `${validate_component(listComponent || components2.unknownList || missing_component, "svelte:component").$$render($$result, { portableText: listProps }, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const RenderListItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let components2;
  let style;
  let listItemComponent;
  let styleComponent;
  let listItemProps;
  let { global } = $$props;
  let { indexInParent } = $$props;
  let { node } = $$props;
  if ($$props.global === void 0 && $$bindings.global && global !== void 0)
    $$bindings.global(global);
  if ($$props.indexInParent === void 0 && $$bindings.indexInParent && indexInParent !== void 0)
    $$bindings.indexInParent(indexInParent);
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  ({ components: components2 } = global);
  ({ style = "normal" } = node);
  listItemComponent = typeof components2.listItem === "function" ? components2.listItem : components2.listItem[style];
  {
    if (!listItemComponent) {
      global.missingComponentHandler(style, "listItemStyle");
    }
  }
  styleComponent = style !== "normal" ? components2.block[style] : void 0;
  listItemProps = (() => {
    return { global, value: node, indexInParent };
  })();
  return `${validate_component(listItemComponent || components2.unknownListItem || missing_component, "svelte:component").$$render($$result, { portableText: listItemProps }, {}, {
    default: () => {
      return `${styleComponent ? `${validate_component(styleComponent || missing_component, "svelte:component").$$render(
        $$result,
        {
          portableText: {
            // Different props for the block that will hold this list
            ...listItemProps,
            value: {
              ...node,
              // BlockComponentProps shouldn't receive a listItem
              listItem: void 0
            }
          }
        },
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``}`;
          }
        }
      )}` : `${slots.default ? slots.default({}) : ``}`}`;
    }
  })}`;
});
const RenderSpan = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let components2;
  let markType;
  let markComponent;
  let markProps;
  let { global } = $$props;
  let { node } = $$props;
  let { parentBlock } = $$props;
  if ($$props.global === void 0 && $$bindings.global && global !== void 0)
    $$bindings.global(global);
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  if ($$props.parentBlock === void 0 && $$bindings.parentBlock && parentBlock !== void 0)
    $$bindings.parentBlock(parentBlock);
  ({ components: components2 } = global);
  ({ markType } = node);
  markComponent = components2.marks[markType];
  {
    if (!markComponent) {
      global.missingComponentHandler(markType, "mark");
    }
  }
  markProps = (() => {
    return {
      global,
      parentBlock,
      markType,
      value: node.markDef,
      markKey: node.markKey,
      plainTextContent: spanToPlainText(node)
    };
  })();
  return `${validate_component(markComponent || components2.unknownMark || missing_component, "svelte:component").$$render($$result, { portableText: markProps }, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const RenderText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let components2;
  let text;
  let { global } = $$props;
  let { node } = $$props;
  if ($$props.global === void 0 && $$bindings.global && global !== void 0)
    $$bindings.global(global);
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  ({ components: components2 } = global);
  ({ text } = node);
  return `${text === "\n" ? `${typeof components2.hardBreak === "function" ? `${validate_component(components2.hardBreak || missing_component, "svelte:component").$$render($$result, {}, {}, {})}` : `${escape(text)}`}` : `${escape(text)}`}`;
});
const RenderNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let node;
  let indexInParent;
  let parentBlock;
  let isInline;
  let { global } = $$props;
  let { options } = $$props;
  if ($$props.global === void 0 && $$bindings.global && global !== void 0)
    $$bindings.global(global);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  ({ node, indexInParent, parentBlock, isInline } = options);
  return `${isPortableTextToolkitList(node) ? `${validate_component(RenderList, "RenderList").$$render($$result, { node, indexInParent, global }, {}, {
    default: () => {
      return `${each(node.children, (child, childIndex) => {
        return `${validate_component(RenderNode, "svelte:self").$$render(
          $$result,
          {
            options: {
              node: child,
              indexInParent: childIndex,
              // The list's children will be parsed as PortableTextListItem, which will pass the proper parentBlock & isInline
              parentBlock: void 0,
              isInline: void 0
            },
            global
          },
          {},
          {}
        )}`;
      })}`;
    }
  })}` : `${isPortableTextListItemBlock(node) ? `${validate_component(RenderListItem, "RenderListItem").$$render($$result, { node, indexInParent, global }, {}, {
    default: () => {
      return `${each(buildMarksTree(node), (child, childIndex) => {
        return `${validate_component(RenderNode, "svelte:self").$$render(
          $$result,
          {
            options: {
              // Pass the current listItem as a parentBlock
              parentBlock: node,
              node: child,
              isInline: true,
              indexInParent: childIndex
            },
            global
          },
          {},
          {}
        )}`;
      })}`;
    }
  })}` : `${isPortableTextToolkitSpan(node) ? `${validate_component(RenderSpan, "RenderSpan").$$render($$result, { node, parentBlock, global }, {}, {
    default: () => {
      return `${each(node.children, (child, childIndex) => {
        return `${validate_component(RenderNode, "svelte:self").$$render(
          $$result,
          {
            options: {
              parentBlock,
              node: child,
              isInline: true,
              indexInParent: childIndex
            },
            global
          },
          {},
          {}
        )}`;
      })}`;
    }
  })}` : `${isPortableTextBlock(node) ? `${validate_component(RenderBlock, "RenderBlock").$$render($$result, { node, indexInParent, global }, {}, {
    default: () => {
      return `${each(buildMarksTree(node), (child, childIndex) => {
        return `${validate_component(RenderNode, "svelte:self").$$render(
          $$result,
          {
            options: {
              parentBlock: node,
              node: child,
              isInline: true,
              indexInParent: childIndex
            },
            global
          },
          {},
          {}
        )}`;
      })}`;
    }
  })}` : `${isPortableTextToolkitTextNode(node) ? `${validate_component(RenderText, "RenderText").$$render($$result, { node, global }, {}, {})}` : `${node ? `${validate_component(RenderCustomBlock, "RenderCustomBlock").$$render(
    $$result,
    {
      node,
      parentBlock,
      indexInParent,
      isInline,
      global
    },
    {},
    {}
  )}` : ``}`}`}`}`}`}`;
});
const getTemplate = (type, prop) => `Unknown ${type}, specify a component for it in the \`components${prop ? "." : ""}${prop}\` prop`;
const getWarningMessage = (type, nodeType) => {
  switch (nodeType) {
    case "block":
      return getTemplate(`block type "${type}"`, "types");
    case "blockStyle":
      return getTemplate(`block style "${type}"`, "block");
    case "listItemStyle":
      return getTemplate(`list item style "${type}"`, "listItem");
    case "listStyle":
      return getTemplate(`list style "${type}"`, "list");
    case "mark":
      return getTemplate(`mark type "${type}"`, "marks");
    default:
      return getTemplate("type");
  }
};
function printWarning(message) {
  console.warn(message);
}
const PortableText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let mergedComponents;
  let keyedBlocks;
  let blocks;
  let missingComponentHandler;
  let { value = [] } = $$props;
  let { components: components2 } = $$props;
  let { context = {} } = $$props;
  let { onMissingComponent = true } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.components === void 0 && $$bindings.components && components2 !== void 0)
    $$bindings.components(components2);
  if ($$props.context === void 0 && $$bindings.context && context !== void 0)
    $$bindings.context(context);
  if ($$props.onMissingComponent === void 0 && $$bindings.onMissingComponent && onMissingComponent !== void 0)
    $$bindings.onMissingComponent(onMissingComponent);
  mergedComponents = mergeComponents(defaultComponents, components2);
  keyedBlocks = (Array.isArray(value) ? value : [value]).map(assertBlockKey);
  blocks = nestLists(keyedBlocks, LIST_NEST_MODE_HTML);
  missingComponentHandler = (type, nodeType) => {
    if (onMissingComponent === false) {
      return;
    }
    const message = getWarningMessage(type, nodeType);
    if (typeof onMissingComponent === "function") {
      onMissingComponent(message, { type, nodeType });
      return;
    }
    printWarning(message);
  };
  return `${each(blocks, (node, index) => {
    return `${validate_component(RenderNode, "RenderNode").$$render(
      $$result,
      {
        global: {
          components: mergedComponents,
          missingComponentHandler,
          context,
          ptBlocks: blocks,
          ptRawValue: value
        },
        options: {
          node,
          isInline: false,
          indexInParent: index
        }
      },
      {},
      {}
    )}`;
  })}`;
});
const Heading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { portableText } = $$props;
  const { style, children } = portableText.value;
  const anchorId = children[0]?._key;
  if ($$props.portableText === void 0 && $$bindings.portableText && portableText !== void 0)
    $$bindings.portableText(portableText);
  return `${style === "h1" ? `<h1 class="h1 font-bold mb-4 mt-4"${add_attribute("id", anchorId, 0)}>${slots.default ? slots.default({}) : ``}</h1>` : `${style === "h2" ? `<h2 class="h2 font-bold mb-4 mt-4"${add_attribute("id", anchorId, 0)}>${slots.default ? slots.default({}) : ``}</h2>` : `${style === "h3" ? `<h3 class="h3 font-bold mb-4 mt-4"${add_attribute("id", anchorId, 0)}>${slots.default ? slots.default({}) : ``}</h3>` : `<h4 class="h4 font-bold mb-4 mt-4"${add_attribute("id", anchorId, 0)}>${slots.default ? slots.default({}) : ``}</h4>`}`}`}`;
});
const Paragraph = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p class="text-lg leading-relaxed">${slots.default ? slots.default({}) : ``}</p>`;
});
const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { portableText } = $$props;
  const image = portableText.value;
  if ($$props.portableText === void 0 && $$bindings.portableText && portableText !== void 0)
    $$bindings.portableText(portableText);
  return `${validate_component(SanityImage, "SanityImage").$$render(
    $$result,
    {
      className: "card w-auto my-6 max-h-max  mx-auto object-contain rounded-xl",
      image,
      alt: image.alt,
      maxWidth: 1e3
    },
    {},
    {}
  )}`;
});
const ListItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<li class="list-item">${slots.default ? slots.default({}) : ``}</li>`;
});
const List = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { portableText } = $$props;
  const { value } = portableText;
  if ($$props.portableText === void 0 && $$bindings.portableText && portableText !== void 0)
    $$bindings.portableText(portableText);
  return `${value.listItem === "number" ? `<ol class="pl-4 md:pl-8 py-2 list-decimal">${slots.default ? slots.default({}) : ``}</ol>` : ``}
${value.listItem === "bullet" ? `<ul class="pl-4 md:pl-8 py-2 list-decimal">${slots.default ? slots.default({}) : ``}</ul>` : ``}`;
});
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { portableText } = $$props;
  const { value } = portableText;
  if ($$props.portableText === void 0 && $$bindings.portableText && portableText !== void 0)
    $$bindings.portableText(portableText);
  return `<a${add_attribute("href", value.href, 0)} class="anchor">${slots.default ? slots.default({}) : ``}</a>`;
});
const Strong = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<strong class="font-bold">${slots.default ? slots.default({}) : ``}</strong>`;
});
const Em = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<em class="font-semibold">${slots.default ? slots.default({}) : ``}</em>`;
});
const CodeInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { portableText } = $$props;
  if ($$props.portableText === void 0 && $$bindings.portableText && portableText !== void 0)
    $$bindings.portableText(portableText);
  return `${validate_component(CodeBlock, "CodeBlock").$$render(
    $$result,
    {
      code: portableText.value.text || portableText.value.code
    },
    {},
    {}
  )}`;
});
const components = {
  types: {
    code: CodeInput,
    image: Image
  },
  marks: {
    em: Em,
    link: Link,
    strong: Strong
  },
  block: {
    normal: Paragraph,
    //	blockquote: Quote,
    // Re-using the same component across multiple styles
    h1: Heading,
    h2: Heading,
    h3: Heading,
    h4: Heading
  },
  list: {
    // Swap only the list parts you need
    bullet: List,
    // Custom user-defined list type
    normal: List,
    number: List
    //	checklist: ChecklistWrapper
  },
  listItem: {
    number: ListItem,
    bullet: ListItem,
    normal: ListItem
    // checklist: ChecklistItem
  }
};
const PortableText_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = [] } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `<div class="leading-relaxed mb-4">${validate_component(PortableText, "PortableText").$$render($$result, { value, components }, {}, {})}</div>`;
});
export {
  PortableText_1 as P
};
