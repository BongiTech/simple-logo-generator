import React from "react";
import {
  VStack,
  HStack,
  Button,
  Text,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { Input, Select, Checkbox } from "../../";
import type { IOptions } from "../../../interfaces";
import { IGoogleFontOptions } from "../../../interfaces/app.interface";

function UploadedFontInput(props: {
  onUploadFont: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  removeUploadFont: (index: number) => void;
  index: number;
}) {
  const inputRef = React.useRef<any>(null);
  const { removeUploadFont, onUploadFont, index } = props;

  return (
    <HStack align="start">
      <Input
        ref={inputRef}
        name="uploadedFont"
        onChange={(e) => onUploadFont(index, e)}
        id="uploaded-font"
        label="Upload Font (optional)"
        type="file"
        size="md"
        border="none"
      />
      <Button
        variant="primary-outline"
        size="sm"
        rounded="md"
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.value = "";
          }
          removeUploadFont(index);
        }}
      >
        Remove
      </Button>
    </HStack>
  );
}

export default function Sidebar(props: {
  onSetOptions: (index: number, data: any) => void;
  googleFontOptions: IGoogleFontOptions[];
  icons: {
    options: IOptions;
    fontVariants: {
      name: string;
      value: string;
    }[];
  }[];
  onAddMoreIcon: () => void;
  onUploadFont: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  removeUploadFont: (index: number) => void;
}) {
  const {
    onSetOptions,
    googleFontOptions,
    icons,
    onAddMoreIcon,
    onUploadFont,
    removeUploadFont,
  } = props;

  const onChange = (index: number, e: any) => {
    const { name, value } = e.target;

    onSetOptions(index, {
      [name]: value,
    });
  };

  return (
    <VStack
      h="100vh"
      overflow="auto"
      bg="gray.50"
      boxShadow="md"
      p="5"
      spacing={10}
    >
      {icons.map((icon, i) => (
        <>
          <VStack as="form" spacing={3} align="start">
            <Divider />
            <Heading size="md">{i + 1}</Heading>

            <Input
              name="text"
              value={icon.options.text}
              onChange={(e) => onChange(i, e)}
              id="text"
              label="Text"
              bg="white"
              isRequired
            />

            <Select
              value={icon.options.font}
              onChange={(e) => onChange(i, e)}
              search
              name="font"
              label="Google Font"
              id="google-font-select"
              options={googleFontOptions}
              placeholder="Select Google Font"
            />

            <Select
              value={icon.options.variant}
              onChange={(e) => onChange(i, e)}
              name="variant"
              label="Variant"
              id="variant-select"
              options={icon.fontVariants}
              placeholder="Select Variant"
            />
            <HStack w="full" align="center">
              <Input
                type="number"
                name="size"
                value={icon.options.size}
                onChange={(e) => onChange(i, e)}
                id="size"
                label="Size"
                bg="white"
              />

              <Input
                type="color"
                name="color"
                value={icon.options.color}
                onChange={(e) => {
                  onChange(i, e);
                }}
                id="color"
                label="Color"
                bg="white"
              />
            </HStack>

            <HStack w="full" align="center">
              <Input
                type="color"
                name="stroke"
                value={icon.options.stroke}
                onChange={(e) => onChange(i, e)}
                id="stroke"
                label="Stroke"
                bg="white"
              />

              <Input
                type="number"
                name="strokeWidth"
                value={icon.options.strokeWidth}
                onChange={(e) => {
                  onChange(i, e);
                }}
                id="strokeWidth"
                label="Stroke Width"
                bg="white"
              />
            </HStack>

            <UploadedFontInput
              onUploadFont={onUploadFont}
              removeUploadFont={removeUploadFont}
              index={i}
            />

            <HStack w="full">
              <Checkbox
                name="union"
                onChange={(e) => {
                  onChange(i, {
                    target: { name: e.target.name, value: e.target.checked },
                  });
                }}
                label="Union"
                checked={icon.options.union}
              />
              <Checkbox
                name="kerning"
                onChange={(e) => {
                  onChange(i, {
                    target: { name: e.target.name, value: e.target.checked },
                  });
                }}
                label="Kerning"
                checked={icon.options.kerning}
              />
            </HStack>
            <HStack w="full">
              <Checkbox
                name="filled"
                onChange={(e) => {
                  onChange(i, {
                    target: { name: e.target.name, value: e.target.checked },
                  });
                }}
                label="Fill"
                checked={icon.options.filled}
              />
              <Checkbox
                checked={icon.options.seperateCharactors}
                onChange={(e) => {
                  onChange(i, {
                    target: { name: e.target.name, value: e.target.checked },
                  });
                }}
                name="seperateCharactors"
                label="Seperate Charactors"
              />
            </HStack>
          </VStack>
        </>
      ))}
      <Button w="full" p="5" variant="primary" onClick={onAddMoreIcon}>
        Add More
      </Button>
    </VStack>
  );
}
