export interface IOptions {
  filled: boolean;
  font: string;
  fontUrls: {
    [key: string]: string;
  };

  kerning: boolean;
  seperateCharactors: boolean;
  size: number;
  text: string;
  union: boolean;
  uploadedFont: File | null;
  variant: string;
  svg: string;
}
