import React from "react";
import { Box, HStack, Heading, Input, VStack, Button } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { IOptions } from "../../interfaces";
import { IGoogleFontOptions } from "../../interfaces/app.interface";

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
}) {
  const {
    onSetOptions,
    googleFontOptions,
    copyToClipboard,
    downloadAsSvg,
    icons,
    onAddMoreIcon,
    svgs,
  } = props;

  return (
    <HStack w="full" pos="relative">
      <Box w="25%">
        <Sidebar
          onSetOptions={onSetOptions}
          icons={icons}
          googleFontOptions={googleFontOptions}
          onAddMoreIcon={onAddMoreIcon}
        />
      </Box>
      <Box w="75%" h="100vh" p="5" overflow="auto">
        {icons.map((icon, i) => {
          console.log(`svg-preview-${i}`);
          return svgs[i] ? (
            <VStack mb="16" align="start">
              <Heading id={`svg-preview-${i}`} my="4">
                {null}
              </Heading>
              <Input
                size="sm"
                rounded="none"
                bg="gray.50"
                value={svgs[i]}
                pointerEvents="none"
              />
              <HStack>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => copyToClipboard(svgs[i])}
                >
                  Copy To Clipboard
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => downloadAsSvg(svgs[i])}
                >
                  Download as SVG
                </Button>
              </HStack>
            </VStack>
          ) : null;
        })}
      </Box>
    </HStack>
  );
}
