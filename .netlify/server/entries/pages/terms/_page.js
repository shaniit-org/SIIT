import { e as error } from "../../../chunks/index.js";
import { g as getPageData } from "../../../chunks/query.js";
function groupByChar(words) {
  let obj = {};
  let chars = [];
  words.forEach((word) => {
    const char = word.character.toUpperCase();
    if (!obj[char]) {
      obj[char] = [];
      chars.push(char);
    }
    obj[char].push(word);
  });
  chars = chars.sort();
  return {
    grouped: obj,
    chars
  };
}
const query = `
  *[_id == 'termsPage'][0]{
    ...,
    "terms": *[_type == "term"][0...1000]
  }
`;
const load = async () => {
  const data = await getPageData(query);
  if (!data)
    throw error(404, "Not Found");
  const { grouped, chars } = groupByChar(data.terms);
  return {
    seo: data.seo,
    data: grouped,
    char: chars
  };
};
export {
  load
};
