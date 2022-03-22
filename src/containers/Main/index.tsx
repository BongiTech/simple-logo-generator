import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MakerJs, { models } from "makerjs";
import { load, parse } from "opentype.js";
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
  const [uploadFonts, setUploadFonts] = React.useState<opentype.Font[]>([]);

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
        color: string;
        stroke: string;
        strokeWidth: string;
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

      // console.log(textModel);

      const svg = MakerJs.exporter.toSVG(textModel, {
        fill: arg.filled ? arg.color : undefined,
        stroke: arg.stroke,
        strokeWidth: arg.strokeWidth,
      });

      // const path = MakerJs.exporter.toSVGPathData(textModel, {
      //   origin: [256, 50],
      // });

      // console.log(path);

      if (svg) {
        setSvgs((prevState) => {
          const temp = [...prevState];

          temp[index] = svg;

          return temp;
        });
      }
    },
    []
  );

  const generateSvg = React.useCallback(
    (index: number = 0) => {
      if (icons[index].options.font) {
        const url =
          icons[index].options.fontUrls[icons[index].options.variant].substring(
            5
          ); // remove http:

        if (uploadFonts[index]) {
          callMakerjs(index, {
            font: uploadFonts[index],
            text: icons[index].options.text,
            fontSize: +icons[index].options.size,
            filled: icons[index].options.filled,
            kerning: icons[index].options.kerning,
            separate: icons[index].options.seperateCharactors,
            union: icons[index].options.union,
            color: icons[index].options.color,
            stroke: icons[index].options.stroke,
            strokeWidth: icons[index].options.strokeWidth,
          });
        } else {
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
                color: icons[index].options.color,
                stroke: icons[index].options.stroke,
                strokeWidth: icons[index].options.strokeWidth,
              });
            }
          });
        }
      }
    },
    [icons, uploadFonts, callMakerjs]
  );

  const onUploadFont = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;
    if (files) {
      const temp = [...uploadFonts];

      const file = await files[0].arrayBuffer();
      const font = parse(file);

      temp[index] = font;

      setUploadFonts(temp);
      setCurrentFormIndex(index);
    }
  };

  const removeUploadFont = (index: number) => {
    setUploadFonts((prevState) => prevState.filter((_, i) => i !== index));
    setCurrentFormIndex(index);
  };

  // generate svg
  React.useEffect(() => {
    generateSvg(currentFormIndex);
  }, [currentFormIndex, uploadFonts, icons, generateSvg]);

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

  console.log(currentFormIndex);

  return (
    <Box>
      <CMain
        svgs={svgs}
        onSetOptions={onSetOptions}
        onUploadFont={onUploadFont}
        removeUploadFont={removeUploadFont}
        icons={icons}
        copyToClipboard={copyToClipboard}
        downloadAsSvg={downloadAsSvg}
        onAddMoreIcon={onAddMoreIcon}
        googleFontOptions={googleFontOptions}
      />
    </Box>
  );
}
