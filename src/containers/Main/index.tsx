import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MakerJs from "makerjs";
import { load } from "opentype.js";
import { Box, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Main as CMain } from "../../components";
import { GOOGLE_API_KEY } from "../../config";
import { appActions, RootState } from "../../slices";

export default function Main() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { googleFontOptions, googleFonts, icons } = useSelector(
    (state: RootState) => state.app
  );
  const [currentFormIndex, setCurrentFormIndex] = React.useState(0);
  const [svgs, setSvgs] = React.useState<string[]>([]);

  const onAddMoreIcon = () => {
    dispatch(appActions.addSvgIcon(null));
  };

  const copyToClipboard = async (svg: string) => {
    await navigator.clipboard.writeText(svg);
    toast({
      status: "success",
      description: "Copied to clipboard successfully",
      position: "top-right",
      variant: "top-accent",
    });
  };

  const downloadAsSvg = (svg: string) => {
    const url = window.URL.createObjectURL(new Blob([svg]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `icon.svg`);
    document.body.appendChild(link);
    link.click();
    link?.parentNode?.removeChild(link);
  };

  const onSetOptions = React.useCallback(
    (index: number, data: any) => {
      if (data.font) {
        const font = googleFonts.find((font) => {
          return font.family === data.font;
        });

        const fontUrls = font?.files;

        const mappedFontVariants = font?.variants.map((variant) => {
          return {
            name: variant,
            value: variant,
          };
        });
        dispatch(
          appActions.setOptions({
            index,
            data: {
              font: data.font,
              fontUrls: fontUrls,
              variant: "regular",
            },
          })
        );

        dispatch(
          appActions.setFontVariants({ index, data: mappedFontVariants })
        );
      } else {
        dispatch(appActions.setOptions({ index, data }));
      }
      setCurrentFormIndex(index);
    },
    [dispatch, googleFonts]
  );

  const callMakerjs = React.useCallback(
    (
      index: number,
      arg: {
        font: opentype.Font;
        text: string;
        fontSize: number;
        filled: boolean;
        union: boolean;
        kerning: boolean;
        separate: boolean;
        // bezierAccuracy: number;
        // units: string;
      }
    ) => {
      const textModel = new MakerJs.models.Text(
        arg.font,
        arg.text,
        arg.fontSize,
        arg.union,
        false,
        0,
        { kerning: arg.kerning }
      );

      if (arg.separate) {
        for (var i in textModel.models) {
          textModel.models[i].layer = i;
        }
      }

      const svg = MakerJs.exporter.toSVG(textModel, {
        fill: arg.filled ? "black" : undefined,
      });

      if (svg) {
        const div = document.getElementById(`svg-preview-${index}`);

        if (div) {
          div.innerHTML = svg;
        }

        setSvgs((prevState) => {
          const temp = [...prevState];

          temp[index] = svg;

          return temp;
        });
      }
    },
    [icons, svgs]
  );

  console.log(svgs);

  const generateSvg = React.useCallback(
    (index: number = 0) => {
      if (icons[index].options.font) {
        const url =
          icons[index].options.fontUrls[icons[index].options.variant].substring(
            5
          ); // remove http:

        load(url, (err, font) => {
          if (err) {
            console.log(err);
          }

          if (font && !err) {
            callMakerjs(index, {
              font,
              text: icons[index].options.text,
              fontSize: +icons[index].options.size,
              filled: icons[index].options.filled,
              kerning: icons[index].options.kerning,
              separate: icons[index].options.seperateCharactors,
              union: icons[index].options.union,
            });
          }
        });
      }
    },
    [icons]
  );

  // generate svg
  React.useEffect(() => {
    generateSvg(currentFormIndex);
  }, [currentFormIndex, generateSvg]);

  React.useEffect(() => {
    // fetch google fonts
    (async () => {
      const res = await axios.get(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_API_KEY}`
      );

      dispatch(appActions.setGoogleFonts(res.data.items));

      const googleFontOptions = res.data.items.map((font: any) => {
        return {
          name: font.family,
          value: font.family,
        };
      });

      dispatch(appActions.setGoogleFontOptions(googleFontOptions));
    })();
  }, []);

  return (
    <Box>
      <CMain
        svgs={svgs}
        onSetOptions={onSetOptions}
        icons={icons}
        googleFontOptions={googleFontOptions}
        copyToClipboard={copyToClipboard}
        downloadAsSvg={downloadAsSvg}
        onAddMoreIcon={onAddMoreIcon}
      />
    </Box>
  );
}