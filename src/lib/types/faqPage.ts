export interface FAQ {
    qanda: {
        question: string;
        answer: PortableText;
    }[];
    category: string;
}

export interface FaqPageData {
    category: string;
    faqs: FAQ[];
    seo: BaseMetaData;
}
