import React from "react";
import {
  Box,
  HStack,
  Heading,
  Textarea,
  VStack,
  Button,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { IOptions } from "../../interfaces";
import { IGoogleFontOptions } from "../../interfaces/app.interface";

function SVGPreview(props: {
  svgs: string[];
  copyToClipboard: (svg: string) => void;
  downloadAsSvg: (svg: string) => void;
  index: number;
}) {
  const SVGPreviewRef = React.useRef<any>(null);
  const { copyToClipboard, downloadAsSvg, svgs, index } = props;

  React.useEffect(() => {
    if (SVGPreviewRef.current) {
      SVGPreviewRef.current.innerHTML = svgs[index];
    }
  }, [svgs]);

  return (
    <VStack mb="16" align="start">
      <Heading ref={SVGPreviewRef} id={`svg-preview-${index}`} my="4">
        {null}
      </Heading>
      <Textarea rounded="none" bg="gray.50" value={svgs[index]} readOnly />
      <HStack>
        <Button
          variant="primary"
          size="sm"
          onClick={() => copyToClipboard(svgs[index])}
        >
          Copy To Clipboard
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => downloadAsSvg(svgs[index])}
        >
          Download as SVG
        </Button>
      </HStack>
    </VStack>
  );
}

export default function Main(props: {
  svgs: string[];
  onSetOptions: (
    index: number,
    { name, value }: { name: string; value: string }
  ) => void;
  icons: {
    options: IOptions;
    fontVariants: {
      name: string;
      value: string;
    }[];
  }[];
  googleFontOptions: IGoogleFontOptions[];
  copyToClipboard: (svg: string) => void;
  downloadAsSvg: (svg: string) => void;
  onAddMoreIcon: () => void;
  onUploadFont: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  removeUploadFont: (index: number) => void;
}) {
  const {
    onSetOptions,
    googleFontOptions,
    copyToClipboard,
    downloadAsSvg,
    icons,
    onAddMoreIcon,
    svgs,
    onUploadFont,
    removeUploadFont,
  } = props;

  return (
    <HStack w="full" pos="relative">
      <Box w="25%">
        <Sidebar
          onUploadFont={onUploadFont}
          removeUploadFont={removeUploadFont}
          onSetOptions={onSetOptions}
          icons={icons}
          googleFontOptions={googleFontOptions}
          onAddMoreIcon={onAddMoreIcon}
        />
      </Box>
      <Box w="75%" h="100vh" p="5" overflow="auto">
        {icons.map((icon, i) => {
          return svgs[i] ? (
            <SVGPreview
              copyToClipboard={copyToClipboard}
              downloadAsSvg={downloadAsSvg}
              index={i}
              svgs={svgs}
            />
          ) : null;
        })}
      </Box>
    </HStack>
  );
}
