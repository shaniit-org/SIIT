import { g as getPageData } from "../../../chunks/query.js";
import { e as error } from "../../../chunks/index.js";
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
