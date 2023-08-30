type Heading = {
	_key: string;
	_type: string;
	children: Array<{ _key: string; _type: string; marks: Array<string>; text: string }>;
	subheadings: Array<Item>;
	markDefs: Array<any>;
	style: string;
};

type Item = {
	id: string;
	text: string;
	children: Array<Item>;
};
const findHeadings = (value: Heading[]) => {
	return value.filter((child) => /h\d/.test(child.style));
};

function format_object(item: Item) {
	return {
		id: item.children[0].id,
		text: item.children[0].text
	};
}

export function format_toc(headings: Heading[]) {
	return headings.map((head) => {
		return {
			id: head._key,
			text: head.children[0].text,
			children: head.subheadings ? head.subheadings.map((item) => format_object(item)) : []
		};
	});
}

export function generate_toc(value: PortableText) {
	return format_toc(parseOutline(value));
}

const get = (object: any, path: any[]) => path.reduce((prev, curr) => prev[curr], object);

/**
 */
const getObjectPath = (path: (number | string)[]) =>
	path.length === 0 ? path : ['subheadings'].concat(path.join('.subheadings.').split('.'));

export const parseOutline = (ast: any) => {
	const outline = { subheadings: [] };
	const headings = findHeadings(ast);
	const path: any = [];
	let lastLevel = 0;
	headings.forEach((heading) => {
		const level = Number(heading.style.slice(1));
		heading.subheadings = [];
		if (level < lastLevel) for (let i = lastLevel; i >= level; i--) path.pop();
		else if (level === lastLevel) path.pop();
		const prop = get(outline, getObjectPath(path));
		prop.subheadings.push(heading);
		path.push(prop.subheadings.length - 1);
		lastLevel = level;
	});
	return outline.subheadings;
};
