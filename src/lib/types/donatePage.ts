export interface DonatePageData {
    seo: BaseMetaData;
    title: string;
    description: string;
    content: PortableText;
    payment_methods: PaymentMethod[];
    payment_methods_description: string;
    coverImage: SanityImage;
}

export interface PaymentMethod {
    name: string;
    number: string;
    Image: SanityImage;
}
