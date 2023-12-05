import { defineConfig } from 'vite';

export default defineConfig(() => ({
    base: 'https://marujah.github.io/webcomponents-and-typescript/',
    root: './',
    build: {
        outDir: 'dist',
    },
    publicDir: 'public'
}))