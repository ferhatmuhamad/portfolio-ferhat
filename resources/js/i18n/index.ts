import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import id from "./id.json";

const stored =
    typeof document !== "undefined"
        ? document.cookie
              .split("; ")
              .find((r) => r.startsWith("locale="))
              ?.split("=")[1]
        : undefined;

const initialLocale: "en" | "id" =
    stored === "id" || stored === "en" ? stored : "en";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        id: { translation: id },
    },
    lng: initialLocale,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

export default i18n;
