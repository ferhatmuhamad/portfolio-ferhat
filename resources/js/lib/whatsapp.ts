import type { ProfileShared } from "@/types";

/**
 * Build a wa.me URL from the profile's whatsapp number.
 * Returns null when no number is configured.
 *
 * Used by both the floating WhatsApp button and the footer CTA so that
 * "Start a Project" and "Chat on WhatsApp" point to the exact same chat.
 */
export function buildWhatsAppUrl(
    profile?: Partial<Pick<ProfileShared, "whatsapp" | "name">> | null,
    customMessage?: string,
): string | null {
    if (!profile?.whatsapp) return null;
    const number = profile.whatsapp.replace(/\D/g, "");
    const message = encodeURIComponent(
        customMessage ||
            `Hi ${profile.name?.split(" ")[0] || "Ferhat"}! I'd like to discuss a project with you.`,
    );
    return `https://wa.me/${number}?text=${message}`;
}
