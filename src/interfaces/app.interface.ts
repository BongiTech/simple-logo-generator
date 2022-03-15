import { IOptions } from ".";

export interface IGoogleFontOptions {
  name: string;
  value: string;
}

export interface IGoogleFonts {
  category: string;
  family: string;
  files: {
    [key: string]: string;
  };
  variants: string[];
}

export interface IApp {
  icons: {
    options: IOptions;
    fontVariants: { name: string; value: string }[];
  }[];
  googleFontOptions: IGoogleFontOptions[] | [];
  googleFonts: IGoogleFonts[] | [];
}
