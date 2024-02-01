import { c as create_ssr_component, a as add_attribute } from "../../../../chunks/index3.js";
import { visionTool } from "@sanity/vision";
import { defineType, defineArrayMember, defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { deskTool } from "sanity/desk";
import { codeInput } from "@sanity/code-input";
import { FaUser, FaQuestion, FaPager, FaListAlt, FaNewspaper, FaFlag, FaAdversal, FaFont, FaPeopleCarry, FaHome, FaUserFriends, FaLanguage, FaAddressCard, FaDollarSign } from "react-icons/fa/index.esm.js";
import { contentGraphView } from "sanity-plugin-graph-view";
const blockContent = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "code",
      title: "Code",
      options: {
        theme: "github",
        darkTheme: "terminal"
      }
    }),
    defineArrayMember({
      title: "Image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text"
        }
      ]
    }),
    defineArrayMember({
      title: "Block",
      type: "block",
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" }
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" }
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" }
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url"
              }
            ]
          }
        ]
      }
    })
  ]
});
const baseSeo = {
  title: "SEO",
  type: "object",
  name: "seo",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Description",
      name: "description",
      type: "text"
    },
    {
      title: "Og Image",
      name: "ogImage",
      type: "image"
    }
  ]
};
const rowBanner = {
  title: "Row Banner",
  name: "rowBanner",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Description",
      name: "description",
      type: "text"
    }
  ],
  preview: {
    select: {
      title: "title",
      media: "ogImage"
    },
    /**
     *
     * @param {import('sanity').PreviewProps} props
     */
    prepare({ title, media, subtitle }) {
      return { title: title || "Row Banner", subtitle, media };
    }
  }
};
const author = {
  icon: FaUser,
  title: "Author",
  name: "author",
  type: "document",
  fields: [
    {
      type: "image",
      name: "profile",
      title: "Profile"
    },
    {
      title: "Name",
      name: "name",
      type: "string"
    },
    {
      title: "Role",
      name: "role",
      type: "string"
    },
    {
      title: "Bio",
      name: "bio",
      type: "string"
    },
    {
      title: "Story",
      name: "story",
      type: "blockContent"
    },
    {
      title: "socials",
      name: "socials",
      type: "array",
      of: [
        {
          type: "link"
        }
      ]
    }
  ]
};
const faq = {
  icon: FaQuestion,
  title: "Faq",
  name: "faq",
  type: "document",
  fields: [
    {
      title: "Question",
      name: "question",
      type: "string"
    },
    {
      title: "Answer",
      name: "answer",
      type: "blockContent"
    }
  ]
};
const userguide = {
  icon: FaPager,
  title: "User Guide",
  name: "userguide",
  type: "document",
  fields: [
    {
      name: "coverImage",
      type: "image",
      title: "Cover Image",
      options: {
        hotspot: true
      }
    },
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Description",
      name: "description",
      type: "string"
    },
    {
      title: "Publish Date",
      name: "publishedAt",
      type: "date"
    },
    {
      title: "Download link",
      name: "downloadlink",
      type: "url"
    },
    {
      title: "Categories",
      name: "categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "category"
            }
          ]
        }
      ]
    }
  ]
};
const category = {
  icon: FaListAlt,
  title: "Category",
  name: "category",
  type: "document",
  fields: [
    {
      type: "string",
      name: "title",
      title: "Title"
    }
  ]
};
const link = {
  // icon: MdLink,
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "url",
      title: "URL",
      type: "string"
    }
  ]
};
const news$1 = {
  icon: FaNewspaper,
  title: "News",
  name: "news",
  type: "document",
  fields: [
    {
      type: "seo",
      name: "seo",
      title: "SEO"
    },
    {
      name: "coverImage",
      type: "image",
      title: "Cover Image",
      options: {
        hotspot: true
      }
    },
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Description",
      name: "description",
      type: "string"
    },
    {
      title: "Publish Date",
      name: "publishedAt",
      type: "date"
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title"
      }
    },
    {
      title: "Body",
      name: "body",
      type: "blockContent"
    },
    {
      title: "Authors",
      name: "authors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "author"
            }
          ]
        }
      ]
    },
    {
      title: "Categories",
      name: "categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "category"
            }
          ]
        }
      ]
    }
  ]
};
const event = {
  icon: FaFlag,
  title: "Event",
  name: "event",
  type: "document",
  fields: [
    {
      type: "seo",
      name: "seo",
      title: "SEO"
    },
    {
      name: "coverImage",
      type: "image",
      title: "Cover Image",
      options: {
        hotspot: true
      }
    },
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Description",
      name: "description",
      type: "string"
    },
    {
      title: "Publish Date",
      name: "publishedAt",
      type: "date"
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title"
      }
    },
    {
      title: "Categories",
      name: "categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "category"
            }
          ]
        }
      ]
    },
    {
      title: "Body",
      name: "body",
      type: "blockContent"
    }
  ]
};
const ATOZ = Array.from(Array(26)).map((e, i) => ({
  title: String.fromCharCode(i + 65),
  value: String.fromCharCode(i + 65)
}));
const term = {
  icon: FaAdversal,
  title: "Term",
  name: "term",
  type: "document",
  fields: [
    {
      type: "seo",
      name: "seo",
      title: "SEO"
    },
    {
      type: "string",
      name: "character",
      title: "character",
      options: {
        list: ATOZ
      }
    },
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Description",
      name: "description",
      type: "string"
    },
    {
      title: "Type",
      name: "type",
      type: "string"
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title"
      }
    },
    {
      title: "Body",
      name: "body",
      type: "blockContent"
    }
  ]
};
const banner$1 = {
  type: "object",
  title: "Banner",
  name: "banner",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title"
    },
    {
      name: "description",
      type: "string",
      title: "Description"
    },
    {
      name: "link",
      type: "link"
    },
    {
      name: "background",
      type: "string",
      title: "Background Color",
      options: {
        list: [
          { title: "White", value: "white" },
          { title: "Black", value: "black" }
        ]
      }
    }
  ]
};
const keyboard_or_font = {
  icon: FaFont,
  title: "Keyboard & Font",
  name: "keyboard_or_font",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Description",
      name: "description",
      type: "string"
    },
    {
      title: "Type",
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Keyboard", value: "keyboard" },
          { title: "Font", value: "font" }
        ]
      }
    },
    {
      title: "OS",
      name: "os",
      type: "string",
      options: {
        list: [
          { title: "Windows", value: "windows" },
          { title: "Mac", value: "mac" },
          { title: "Linux", value: "linux" },
          { title: "Android", value: "android" },
          { title: "iOS", value: "ios" }
        ]
      }
    },
    {
      title: "Download link",
      name: "downloadlink",
      type: "url"
    }
  ]
};
const payment_method = {
  name: "payment_method",
  title: "Payment Method",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string"
    },
    {
      name: "number",
      title: "Number",
      type: "string"
    },
    {
      name: "Image",
      title: "Image",
      type: "image"
    }
  ]
};
const donator = {
  icon: FaPeopleCarry,
  title: "Donor",
  name: "donator",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string"
    },
    {
      title: "Units",
      name: "amount",
      type: "number"
    }
  ]
};
const common = [
  userguide,
  payment_method,
  keyboard_or_font,
  faq,
  banner$1,
  link,
  news$1,
  baseSeo,
  term,
  category,
  blockContent,
  event,
  author,
  rowBanner,
  donator
];
const faqPage = {
  icon: FaQuestion,
  id: "faqPage",
  title: "Faq Page",
  name: "faqPage",
  type: "document",
  fields: [
    {
      title: "SEO",
      name: "seo",
      type: "seo"
    },
    {
      title: "FAQ",
      type: "array",
      name: "faqs",
      of: [
        {
          name: "qanda",
          type: "object",
          title: "QandA",
          fields: [
            {
              type: "string",
              name: "category",
              title: "Category"
            },
            {
              type: "array",
              name: "qanda",
              title: "QandA",
              of: [
                {
                  type: "reference",
                  to: [{ type: "faq" }]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: "seo.title",
      media: "seo.ogImage"
    },
    /**
     * @param {import('sanity').PreviewProps} props
     */
    prepare({ title, media, subtitle }) {
      return { title: title || "Faq Page", subtitle, media };
    }
  }
};
const document$3 = {
  id: "homePage",
  icon: FaHome,
  title: "Home Page",
  name: "homePage",
  type: "document",
  fields: [
    {
      title: "SEO",
      name: "seo",
      type: "seo"
    },
    {
      title: "Terms Of The Day",
      name: "termsOfTheDay",
      type: "reference",
      to: [
        {
          type: "term"
        }
      ]
    },
    {
      title: "Sections",
      name: "sections",
      type: "array",
      of: [
        {
          name: "Hero",
          type: "homePage.hero"
        },
        {
          title: "Highlight",
          name: "Highlight",
          type: "reference",
          to: [
            {
              type: "news"
            },
            {
              type: "event"
            }
          ]
        },
        {
          name: "News",
          type: "homePage.news"
        },
        {
          name: "Donate",
          title: "Donate",
          type: "banner"
        },
        {
          name: "Events",
          type: "homePage.events"
        }
      ]
    }
  ],
  preview: {
    select: {
      title: "seo.title",
      media: "seo.ogImage"
    },
    /**
     * @param {import('sanity').PreviewProps} props
     */
    prepare({ title, media, subtitle }) {
      return {
        title: title || "Home Page",
        subtitle,
        media
      };
    }
  }
};
const news = {
  title: "News",
  name: "homePage.news",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Description",
      name: "description",
      type: "string"
    }
  ]
};
const events = {
  title: "Events",
  name: "homePage.events",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Description",
      name: "description",
      type: "string"
    }
  ]
};
const hero = {
  title: "Hero",
  name: "homePage.hero",
  type: "object",
  fields: [
    {
      title: "Hero Image",
      name: "heroImage",
      type: "image"
    },
    {
      title: "Title",
      name: "title",
      type: "string"
    }
  ]
};
const homePage = [hero, document$3, news, events];
const keyboard_and_fonts = {
  icon: FaFont,
  id: "keyboardAndFont",
  title: "Keyboard & Font Page",
  name: "keyboard_or_font_page",
  type: "document",
  fields: [
    {
      title: "seo",
      name: "seo",
      type: "seo"
    },
    {
      title: "Title",
      name: "title",
      type: "string"
    }
  ],
  preview: {
    select: {
      title: "seo.title",
      media: "seo.ogImage"
    },
    /**
     * @param {import('sanity').PreviewProps} props
     */
    prepare({ title, media, subtitle }) {
      return { title: title || "Keyboard And Font Page", subtitle, media };
    }
  }
};
const banner = {
  title: "About Banner",
  name: "aboutBanner",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Description",
      name: "description",
      type: "text"
    },
    {
      title: "Image",
      name: "image",
      type: "image"
    }
  ],
  preview: {
    select: {
      title: "title",
      media: "ogImage"
    },
    /**
     *
     * @param {import('sanity').PreviewProps} props
     */
    prepare({ title, media, subtitle }) {
      return { title: title || "About Banner", subtitle, media };
    }
  }
};
const document$2 = {
  icon: FaUserFriends,
  id: "aboutPage",
  title: "About Page",
  name: "aboutPage",
  type: "document",
  fields: [
    {
      title: "SEO",
      name: "seo",
      type: "seo"
    },
    {
      title: "Sections",
      name: "sections",
      type: "array",
      of: [
        {
          title: "About Banner",
          type: "aboutBanner"
        },
        {
          title: "Row Banner",
          type: "rowBanner"
        },
        {
          title: "Team Mission",
          type: "aboutMission"
        },
        {
          title: "Team Member",
          type: "teamMember"
        }
      ]
    }
  ],
  preview: {
    select: {
      title: "seo.title",
      media: "seo.ogImage"
    }
  }
};
const aboutMission = {
  title: "About Mission",
  name: "aboutMission",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Image",
      name: "image",
      type: "image"
    },
    {
      title: "Description",
      name: "description",
      type: "blockContent"
    }
  ],
  preview: {
    select: {
      title: "title",
      media: "ogImage"
    },
    /**
     *
     * @param {import('sanity').PreviewProps} props
     */
    prepare({ title, media, subtitle }) {
      return { title: title || "About Mission", subtitle, media };
    }
  }
};
const teamMember = {
  title: "Team Member",
  name: "teamMember",
  type: "object",
  fields: [
    { title: "Title", name: "title", type: "string" },
    {
      title: "Teams",
      name: "teams",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "author" }]
        }
      ]
    }
  ],
  preview: {
    select: { title: "title", media: "ogImage" },
    /**
     *
     * @param {import('sanity').PreviewProps} props
     */
    prepare({ title, media, subtitle }) {
      return { title: title || "About Banner", subtitle, media };
    }
  }
};
const aboutPage = [banner, document$2, teamMember, aboutMission];
const document$1 = {
  icon: FaLanguage,
  id: "nlpPage",
  title: "NLP  Page",
  name: "nlpPage",
  type: "document",
  fields: [
    {
      title: "SEO",
      name: "seo",
      type: "seo"
    },
    {
      title: "Description",
      name: "description",
      type: "string"
    },
    {
      title: "Tools",
      type: "array",
      name: "tools",
      of: [{ type: "nlp_tool" }]
    }
  ],
  preview: {
    select: {
      title: "seo.title",
      media: "seo.ogImage"
    },
    /**
     * @param {import('sanity').PreviewProps} props
     */
    prepare({ title, media, subtitle }) {
      return { title: title || "NLP Page", subtitle, media };
    }
  }
};
const tools = {
  title: "NLP Tool",
  name: "nlp_tool",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Description",
      name: "description",
      type: "string"
    },
    {
      title: "Download link",
      name: "downloadlink",
      type: "string"
    }
  ]
};
const nlpPage = [tools, document$1];
const newsPage = {
  icon: FaNewspaper,
  id: "newsPage",
  title: "News Page",
  name: "newsPage",
  type: "document",
  fields: [
    {
      title: "seo",
      name: "seo",
      type: "seo"
    },
    {
      title: "Title",
      name: "title",
      type: "string"
    }
  ],
  preview: {
    select: {
      title: "seo.title",
      media: "seo.ogImage"
    },
    /**
     * @param {import('sanity').PreviewProps} props
     */
    prepare({ title, media, subtitle }) {
      return { title: title || "News Page", subtitle, media };
    }
  }
};
const eventsPage = {
  icon: FaFlag,
  id: "eventsPage",
  title: "Event Page",
  name: "eventsPage",
  type: "document",
  fields: [
    {
      title: "seo",
      name: "seo",
      type: "seo"
    },
    {
      title: "Title",
      name: "title",
      type: "string"
    }
  ],
  preview: {
    select: {
      title: "seo.title",
      media: "seo.ogImage"
    },
    /**
     * @param {import('sanity').PreviewProps} props
     */
    prepare({ title, media, subtitle }) {
      return { title: title || "Events Page", subtitle, media };
    }
  }
};
const userGuidePage = {
  icon: FaPager,
  id: "userGuidePage",
  title: "User Guide Page",
  name: "userGuidePage",
  type: "document",
  fields: [
    {
      title: "SEO",
      name: "seo",
      type: "seo"
    }
  ],
  preview: {
    select: {
      title: "seo.title",
      media: "seo.ogImage"
    },
    /**
     * @param {import('sanity').PreviewProps} props
     */
    prepare({ title, media, subtitle }) {
      return { title: title || "UserGuide Page", subtitle, media };
    }
  }
};
const termsPage = {
  icon: FaAdversal,
  id: "termsPage",
  title: "Terms Page",
  name: "termsPage",
  type: "document",
  fields: [
    {
      title: "seo",
      name: "seo",
      type: "seo"
    },
    {
      title: "Title",
      name: "title",
      type: "string"
    }
  ],
  preview: {
    select: {
      title: "seo.title",
      media: "seo.ogImage"
    },
    /**
     * @param {import('sanity').PreviewProps} props
     */
    prepare({ title, media, subtitle }) {
      return { title: title || "Terms Page", subtitle, media };
    }
  }
};
const contactPage = {
  icon: FaAddressCard,
  id: "contactPage",
  title: "Contact Page",
  name: "contactPage",
  type: "document",
  fields: [
    {
      title: "seo",
      name: "seo",
      type: "seo"
    },
    {
      title: "Title",
      name: "title",
      type: "string"
    }
  ],
  preview: {
    select: {
      title: "seo.title",
      media: "seo.ogImage"
    },
    /**
     * @param {import('sanity').PreviewProps} props
     */
    prepare({ title, media, subtitle }) {
      return { title: title || "Contact Page", subtitle, media };
    }
  }
};
const document = {
  icon: FaDollarSign,
  id: "donatePage",
  title: "Donate Page",
  name: "donatePage",
  type: "document",
  fields: [
    { title: "SEO", name: "seo", type: "seo" },
    { title: "Title", name: "title", type: "string" },
    { title: "CoverImage", name: "coverImage", type: "image" },
    { title: "Content", name: "content", type: "blockContent" },
    {
      title: "Payment Methods",
      name: "payment_methods",
      type: "array",
      of: [{ type: "payment_method" }]
    },
    {
      title: "Goal",
      type: "number",
      name: "goal"
    }
  ],
  preview: { select: { title: "seo.title", media: "seo.ogImage" } }
};
const donatePage = [document];
const schemaTypes = [
  ...common,
  ...homePage,
  ...aboutPage,
  ...nlpPage,
  eventsPage,
  contactPage,
  newsPage,
  faqPage,
  keyboard_and_fonts,
  userGuidePage,
  termsPage,
  ...donatePage
];
const documentItem = (S, { schemaType, id, title }) => {
  return S.listItem().title(title).schemaType(schemaType).child(S.document().schemaType(schemaType).id(id).title(title));
};
function newDeskStructure(S) {
  return S.list().title("Content").id("__root__").items([
    documentItem(S, {
      title: "Home",
      id: "homePage",
      schemaType: "homePage"
    }),
    documentItem(S, {
      title: "About",
      id: "aboutPage",
      schemaType: "aboutPage"
    }),
    documentItem(S, {
      title: "Faqs",
      id: "faqPage",
      schemaType: "faqPage"
    }),
    documentItem(S, {
      title: "NLP",
      id: "nlpPage",
      schemaType: "nlpPage"
    }),
    documentItem(S, {
      title: "Keyboards & Fonts",
      id: "keyboard_or_font_page",
      schemaType: "keyboard_or_font_page"
    }),
    documentItem(S, {
      title: "News Articles",
      id: "newsPage",
      schemaType: "newsPage"
    }),
    documentItem(S, {
      title: "Events Articles",
      id: "eventsPage",
      schemaType: "eventsPage"
    }),
    documentItem(S, {
      title: "UserGuides",
      id: "userGuidePage",
      schemaType: "userGuidePage"
    }),
    documentItem(S, {
      title: "Terms",
      id: "termsPage",
      schemaType: "termsPage"
    }),
    documentItem(S, {
      title: "Contact",
      id: "contactPage",
      schemaType: "contactPage"
    }),
    documentItem(S, {
      title: "Donate",
      id: "donatePage",
      schemaType: "donatePage"
    }),
    S.divider(),
    ...S.documentTypeListItems().filter(
      (item) => ![
        "site",
        "homePage",
        "faqPage",
        "keyboard_or_font_page",
        "nlpPage",
        "aboutPage",
        "newsPage",
        "termsPage",
        "contactPage",
        "eventsPage",
        "userGuidePage",
        "donatePage"
      ].includes(item.getId() ?? "")
    )
  ]);
}
defineConfig({
  name: "default",
  title: "ShanIIT",
  projectId: "za3lzlmc",
  dataset: "live",
  basePath: "/studio",
  plugins: [
    deskTool({
      structure: newDeskStructure
    }),
    visionTool(),
    contentGraphView({}),
    unsplashImageAsset(),
    codeInput()
  ],
  schema: {
    types: schemaTypes
  }
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "#svelte-studio.svelte-xg6t7e.svelte-xg6t7e{position:fixed;top:0;left:0;z-index:9001;width:100vw;height:100vh}#svelte-studio.svelte-xg6t7e>div.svelte-xg6t7e{height:100%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let studioEl;
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-4iauis_START --><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="robots" content="noindex"><meta name="referrer" content="same-origin"><!-- HEAD_svelte-4iauis_END -->`, ""}

<div id="svelte-studio" class="svelte-xg6t7e"><div class="svelte-xg6t7e"${add_attribute("this", studioEl, 0)}></div>
</div>`;
});
export {
  Page as default
};
