const DOMAIN = 'https://shaniit.org';
import { getPageData } from '$lib/sanity/query';

type Page = {
    loc: string;
    changefreq: string;
    priority: number;
    lastmod: string;
};

const pages = [
    {
        loc: '/',
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toISOString()
    },
    {
        loc: '/blogs',
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toISOString()
    },
    {
        loc: '/events',
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toISOString()
    },

    {
        loc: '/userguides',
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toISOString()
    },

    {
        loc: '/faqs',
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toISOString()
    },

    {
        loc: '/fonts',
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toISOString()
    },
    {
        loc: '/natural-language-processing',
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toISOString()
    },
    {
        loc: '/terms',
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toISOString()
    },
    {
        loc: '/about',
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toISOString()
    },

    {
        loc: '/donate',
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toISOString()
    },
    {
        loc: '/contact',
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toISOString()
    }
];

let query = `{
    "blogs" :*[_type == "news"][0...1000]{
        "loc":slug.current,
        "lastmod":_updatedAt,
    },
    "events":*[_type == "events"][0...1000]{
        "loc":slug.current,
        "lastmod":_updatedAt,
    },
}`;

export async function GET() {
    const { events, blogs }: { events: Page[]; blogs: Page[] } = await getPageData(query);
    return new Response(
        `
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
			<!-- <url> elements go here -->
        ${pages.map(
            (page) => `
        <url>
            <loc>${DOMAIN}${page.loc}</loc>
            <changefreq>${page.changefreq}</changefreq>
            <priority>${page.priority}</priority>
        </url>`
        )}
        ${blogs.map(
            (page) => `
        <url>
            <loc>${DOMAIN}/events/${page.loc}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
        </url>
            `
        )}
        ${blogs.map(
            (page) => `
        <url>
            <loc>${DOMAIN}/blogs/${page.loc}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.5</priority>
        </url>
            `
        )}
		</urlset>`.trim(),
        {
            headers: {
                'Content-Type': 'application/xml'
            }
        }
	);
}
