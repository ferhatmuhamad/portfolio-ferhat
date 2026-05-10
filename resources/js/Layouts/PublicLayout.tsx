import { ReactNode } from "react";
import { Head, usePage } from "@inertiajs/react";
import { Navbar } from "@/Components/Public/Navbar";
import { Footer } from "@/Components/Public/Footer";
import { FloatingWhatsApp } from "@/Components/Public/FloatingWhatsApp";
import { BackgroundFx } from "@/Components/Public/BackgroundFx";
import { DetailHeader } from "@/Components/Public/DetailHeader";
import {
    DetailHero,
    type BreadcrumbItem,
} from "@/Components/Public/DetailHero";
import { useLenis } from "@/lib/useLenis";
import type { PageProps } from "@/types";

export interface DetailMeta {
    backHref: string;
    backLabel?: string;
    eyebrow?: string;
    title: ReactNode;
    breadcrumbs: BreadcrumbItem[];
}

interface PublicLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
    /**
     * When provided, the page is rendered as a "detail" page:
     *  - The main Navbar is replaced with a sticky back-button header.
     *  - A hero band with breadcrumb + title is rendered before children.
     */
    detail?: DetailMeta;
}

export default function PublicLayout({
    children,
    title,
    description,
    detail,
}: PublicLayoutProps) {
    const { profile, site } = usePage<PageProps>().props;
    useLenis();

    const seoTitle =
        title ||
        `${profile?.name || site?.name || "Portfolio"} — ${profile?.headline || "Front End Developer"}`;
    const seoDescription =
        description || profile?.summary || site?.tagline || "";

    return (
        <>
            <Head>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDescription} />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:type" content="website" />
                {profile?.avatar_url && (
                    <meta property="og:image" content={profile.avatar_url} />
                )}
            </Head>
            <div className="relative min-h-screen overflow-x-clip bg-ink-950 text-ink-50">
                <BackgroundFx />
                {detail ? (
                    <DetailHeader
                        backHref={detail.backHref}
                        backLabel={detail.backLabel}
                    />
                ) : (
                    <Navbar />
                )}
                <main>
                    {detail && (
                        <DetailHero
                            eyebrow={detail.eyebrow}
                            title={detail.title}
                            breadcrumbs={detail.breadcrumbs}
                        />
                    )}
                    {children}
                </main>
                <Footer />
                <FloatingWhatsApp />
            </div>
        </>
    );
}
