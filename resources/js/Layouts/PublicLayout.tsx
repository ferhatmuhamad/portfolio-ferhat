import { ReactNode } from "react";
import { Head, usePage } from "@inertiajs/react";
import { Navbar } from "@/Components/Public/Navbar";
import { Footer } from "@/Components/Public/Footer";
import { FloatingWhatsApp } from "@/Components/Public/FloatingWhatsApp";
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
            <div className="relative min-h-screen overflow-hidden bg-ink-950 text-ink-50">
                {/* Ambient background glows */}
                <div className="pointer-events-none fixed inset-0 -z-10">
                    <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-brand-500/10 blur-[160px]" />
                    <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-sun-400/10 blur-[160px]" />
                    <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-brand-700/10 blur-[140px]" />
                </div>
                <Navbar />
                <main>{children}</main>
                <Footer />
                <FloatingWhatsApp />
            </div>
        </>
    );
}
