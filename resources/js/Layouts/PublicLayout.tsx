import { ReactNode } from "react";
import { Head, usePage } from "@inertiajs/react";
import { Navbar } from "@/Components/Public/Navbar";
import { Footer } from "@/Components/Public/Footer";
import { FloatingWhatsApp } from "@/Components/Public/FloatingWhatsApp";
import { BackgroundFx } from "@/Components/Public/BackgroundFx";
import { useLenis } from "@/lib/useLenis";
import type { PageProps } from "@/types";

interface PublicLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

export default function PublicLayout({
    children,
    title,
    description,
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
                <Navbar />
                <main>{children}</main>
                <Footer />
                <FloatingWhatsApp />
            </div>
        </>
    );
}
