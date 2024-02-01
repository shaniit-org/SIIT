import { g as getPageData } from "../../../chunks/query.js";
import { e as error } from "../../../chunks/index.js";
const query = `*[_type =="faqPage"][0]{
  ...,
   "faqs":faqs[]{
     category,
     qanda[]->{
       _id,
      question
     }
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
