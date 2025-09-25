/** @type {import('vite').UserConfig} */

import autoprefixer from "autoprefixer";
import { build } from "vite";

export default {
    publicDir: "./public",
    server: {
        host: "127.0.0.1",
        port: 3000,
    },
    css: {
        postcss: {
            plugins: [autoprefixer],
        },
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `assets/app.js`,
                assetFileNames: `assets/app.[ext]`,
            },
        },
    },
};
