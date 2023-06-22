import { getPageData } from '$lib/sanity/query';

const query = `*[ _id=='keyboard_or_font_page'][0] {
  ...,
   'windows' :*[_type=='keyboard_or_font' && os=='windows' ][],
  'mac' :*[_type=='keyboard_or_font' && os=='mac' ][],
  'android' :*[_type=='keyboard_or_font' && os=='android' ][],
  'linux' :*[_type=='keyboard_or_font' && os=='linux' ][],
  'ios' :*[_type=='keyboard_or_font' && os=='ios' ][]
}`;

export const load = async () => {
    /**
     * @type {import('../../lib/types/keyboard_and_font').KeyboardOrFontList} - data
     */
    const data = await getPageData(query);
    return {
        data
    };
};
