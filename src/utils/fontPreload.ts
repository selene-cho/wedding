import { readdirSync } from 'fs';
import { resolve, extname } from 'path';
import { HtmlTagDescriptor } from 'vite';

const fontsDir = resolve(__dirname, '../assets/fonts');

const mimeTypes: Record<string, string> = {
  '.woff2': 'font/woff2',
};

const fontFiles = readdirSync(fontsDir).filter(
  (file) => mimeTypes[extname(file)],
);

export const createPreloadTags: HtmlTagDescriptor[] = fontFiles.map(
  (fontFile) => ({
    injectTo: 'head',
    tag: 'link',
    attrs: {
      rel: 'preload',
      href: `/src/assets/fonts/${fontFile}`,
      as: 'font',
      type: mimeTypes[extname(fontFile)],
      crossOrigin: 'anonymous',
    },
  }),
);
