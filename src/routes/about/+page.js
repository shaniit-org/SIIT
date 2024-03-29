import { getPageData } from '$lib/sanity/query';
import { error } from '@sveltejs/kit';

const query = `
  *[ _id=='aboutPage'][0]{
    sections[] {
       ...,
        _type == 'teamMember' =>  {
          'title':title,
            teams[]{
              ...,
              "name": @-> name,
              "role":@->role,
              "profile":@->profile
            }
        },
       
      },
    "teamMembers":*[_type=="author" && isMember==true]{
      name,
      role,
      profile
    }
  }
`;

/**
 * @type {import('@sveltejs/kit').Load}
 */
export const load = async () => {
	/**
	 * @type {import('$lib/types/aboutPage').AboutPageData}
	 */
	const data = await getPageData(query);
	if (!data) throw error(404, 'Not Found');
	return {
		data
	};
};
