/**
 * @param {Array<any>} value
 * @returns {Array<{id: string, text: string,style:string, subheadings: Array<{id: string, text: string,style:string}>}>}
 */
const findHeadings = (value) => {
    return value.filter((child) => /h\d/.test(child.style));
};

/**
 * @param {any} item;
 */
function format_object(item) {
    return {
        id: item.children[0].id,
        text: item.children[0].text
    };
}

/**
 * @param {Array<any>} headings
 * @returns {Array<{id: string, text: string, children: Array<{id: string, text: string,subheadings:Array<{text:string;id:string}>}>} >}
 */
export function format_toc(headings) {
    return headings.map((head) => {
        return {
            id: head._key,
            text: head.children[0].text,
            children: head.subheadings ? head.subheadings.map((item) => format_object(item)) : []
        };
    });
}

/**
 * @param {PortableText} value
 * @returns {Array<{id: string, text: string, children: Array<{id: string, text: string}>}>}
 */
export function generate_toc(value) {
    return format_toc(parseOutline(value));
}

/**
 *  @param {any} object
 *  @param {Array<any>} path
 */
const get = (object, path) => path.reduce((prev, curr) => prev[curr], object);

/**
 * @param {Array<string | number>} path
 */
const getObjectPath = (path) =>
    path.length === 0 ? path : ['subheadings'].concat(path.join('.subheadings.').split('.'));

/**
 * @param {any} ast
 */
const parseOutline = (ast) => {
    const outline = { subheadings: [] };
    const headings = findHeadings(ast);
    /** @type {Array<number>} */
    const path = [];
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
