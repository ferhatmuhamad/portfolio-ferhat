import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

// NOTE: Vite 7 default target = "baseline-widely-available" (Safari 16+, Chrome 107+).
// Banyak HP (iOS < 16, in-app browser FB/IG/Bing/WeChat, Android lawas) masih
// pakai engine lebih tua sehingga bundle gagal di-parse → halaman blank.
// Pakai single target supaya esbuild tidak bingung dengan kombinasi.
// es2020 sudah didukung iOS 14+, Chrome 80+, Firefox 78+, Edge 80+.
const buildTarget = "es2020";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            refresh: true,
        }),
        react(),
    ],
    build: {
        target: buildTarget,
        cssTarget: buildTarget,
        rollupOptions: {
            output: {
                // Split heavy libraries into their own chunks so the initial
                // bundle stays small. The browser can then cache and parallel-load.
                manualChunks: {
                    react: ["react", "react-dom", "@inertiajs/react"],
                    motion: ["framer-motion"],
                    gsap: ["gsap"],
                    lenis: ["lenis"],
                    i18n: ["i18next", "react-i18next"],
                },
            },
        },
    },
    esbuild: {
        target: buildTarget,
    },
    optimizeDeps: {
        esbuildOptions: {
            target: buildTarget,
        },
    },
});
