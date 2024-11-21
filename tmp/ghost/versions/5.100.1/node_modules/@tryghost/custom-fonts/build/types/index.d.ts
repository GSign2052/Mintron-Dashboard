export type BodyFontName = 'Fira Mono' | 'Fira Sans' | 'IBM Plex Serif' | 'Inter' | 'JetBrains Mono' | 'Lora' | 'Manrope' | 'Merriweather' | 'Nunito' | 'Noto Sans' | 'Noto Serif' | 'Poppins' | 'Roboto' | 'Space Mono';
export type HeadingFontName = 'Cardo' | 'Chakra Petch' | 'Old Standard TT' | 'Libre Baskerville' | 'Rufina' | 'Space Grotesk' | 'Tenor Sans' | BodyFontName;
export type Font<T extends string> = {
    name: T;
    creator: string;
};
export type HeadingFont = Font<HeadingFontName>;
export type BodyFont = Font<BodyFontName>;
export type CustomFonts = {
    heading: HeadingFont[];
    body: BodyFont[];
};
export type FontSelection = {
    heading?: HeadingFontName;
    body?: BodyFontName;
};
export declare const CUSTOM_FONTS: CustomFonts;
export declare function generateCustomFontCss(fonts: FontSelection): string;
export declare function generateCustomFontBodyClass(fonts: FontSelection): string;
export declare function getCSSFriendlyFontClassName(font: string): string;
export declare function getCustomFontClassName({ font, heading }: {
    font: string;
    heading: boolean;
}): string;
export declare function getCustomFonts(): CustomFonts;
export declare function isValidCustomFont(fontName: string): fontName is BodyFontName;
export declare function isValidCustomHeadingFont(fontName: string): fontName is HeadingFontName;
