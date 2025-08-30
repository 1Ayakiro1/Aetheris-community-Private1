import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';
// @ts-ignore (все работает но светит ошибку это чисто проеб IDE)
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    root: path.resolve(__dirname, 'frontend'),
    plugins: [vue(), svgLoader()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'frontend/src'),
        },
    },
    server: {
        port: 5173,
    },
});
