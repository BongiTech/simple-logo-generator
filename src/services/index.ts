import axios from "axios";
import { GOOGLE_API_KEY } from "../config";

export const fetchGoogleFonts = async () => {
  const res = await axios.get(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_API_KEY}`
  );

  const googleFontOptions = res.data.items.map((font: any) => {
    return {
      name: font.family,
      value: font.family,
    };
  });

  return {
    googleFontOptions,
    googleFonts: res.data,
  };
};
