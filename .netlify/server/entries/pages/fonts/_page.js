import { g as getPageData } from "../../../chunks/query.js";
import { e as error } from "../../../chunks/index.js";
const query = `*[ _id=='keyboard_or_font_page'][0] {
  ...,
   'windows' :*[_type=='keyboard_or_font' && os=='windows' ][],
  'mac' :*[_type=='keyboard_or_font' && os=='mac' ][],
  'android' :*[_type=='keyboard_or_font' && os=='android' ][],
  'linux' :*[_type=='keyboard_or_font' && os=='linux' ][],
  'ios' :*[_type=='keyboard_or_font' && os=='ios' ][]
}`;
const load = async () => {
  const data = await getPageData(query);
  if (!data)
    throw error(404, "Not Found");
  return {
    data
  };
};
export {
  load
};
