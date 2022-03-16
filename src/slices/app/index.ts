import { createSlice } from "@reduxjs/toolkit";
import type { IApp } from "./../../interfaces/app.interface";

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    icons: [
      {
        options: {
          filled: true,
          font: "ABeeZee",
          kerning: false,
          seperateCharactors: false,
          size: 100,
          fontUrls: {
            regular:
              "http://fonts.gstatic.com/s/abeezee/v20/esDR31xSG-6AGleN6tKukbcHCpE.ttf",
          },
          text: "verb",
          union: false,
          uploadedFont: null,
          variant: "regular",
          svg: "",
        },
        fontVariants: [{ name: "regular", value: "regular" }],
      },
    ],
    googleFontOptions: [],
    googleFonts: [],
  } as IApp,
  reducers: {
    setOptions: (state, action) => {
      const { index, data } = action.payload;
      state.icons[index].options = { ...state.icons[index].options, ...data };
    },
    setGoogleFontOptions: (state, action) => {
      state.googleFontOptions = action.payload;
    },
    setGoogleFonts: (state, action) => {
      state.googleFonts = action.payload;
    },
    setFontVariants: (state, action) => {
      const { index, data } = action.payload;
      state.icons[index].fontVariants = data;
    },
    addSvgIcon: (state, action) => {
      state.icons.push({
        options: {
          filled: true,
          font: "ABeeZee",
          kerning: false,
          seperateCharactors: false,
          size: 100,
          fontUrls: {
            regular:
              "http://fonts.gstatic.com/s/abeezee/v20/esDR31xSG-6AGleN6tKukbcHCpE.ttf",
          },
          text: "verb",
          union: false,
          uploadedFont: null,
          variant: "regular",
          svg: "",
        },
        fontVariants: [{ name: "regular", value: "regular" }],
      });
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
