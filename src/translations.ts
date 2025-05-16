import { en } from './translations/en';
import { ja } from './translations/ja';

export const translations = {
    en,
    ja,
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;