export function formatDateRange(
    start: string,
    end: string | null,
    locale = "en",
) {
    const opts: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
    };
    const fmt = (s: string) =>
        new Date(s).toLocaleDateString(
            locale === "id" ? "id-ID" : "en-US",
            opts,
        );
    const presentLabel = locale === "id" ? "Sekarang" : "Present";
    return `${fmt(start)} – ${end ? fmt(end) : presentLabel}`;
}

export function formatCurrency(
    value: number | null | undefined,
    currency = "IDR",
    locale = "id-ID",
) {
    if (value == null) return null;
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatDate(date: string | null | undefined, locale = "en") {
    if (!date) return "";
    return new Date(date).toLocaleDateString(
        locale === "id" ? "id-ID" : "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        },
    );
}
