export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    is_admin?: boolean;
}

export interface SiteShared {
    name: string;
    tagline?: string;
    show_blog: boolean;
    show_pricing: boolean;
    show_testimonials: boolean;
}

export interface ProfileShared {
    id: number;
    name: string;
    headline: string;
    summary: string;
    summary_id?: string | null;
    footer_tagline?: string | null;
    footer_tagline_id?: string | null;
    email: string;
    phone?: string | null;
    whatsapp?: string | null;
    location?: string | null;
    avatar_url?: string | null;
    hero_image_url?: string | null;
    about_image_url?: string | null;
    cv_url?: string | null;
    socials?: Record<string, string> | null;
    stats?: Array<{
        label: string;
        label_id?: string;
        value: number;
        suffix?: string;
    }> | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User | null;
    };
    locale: "en" | "id";
    site: SiteShared;
    profile: ProfileShared | null;
    flash: { success?: string; error?: string };
};
