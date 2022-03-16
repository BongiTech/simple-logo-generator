import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface CInputProps extends InputProps {
  label?: string;
  error?: FieldError | string | null;
  placeholder?: string;
  size?: string;
  id?: string;
  isRequired?: boolean;
}

const CInput = React.forwardRef(
  (
    {
      label,
      error = null,
      placeholder,
      size = "md",
      id,
      onChange,
      name,
      isRequired,
      ...otherProps
    }: CInputProps,
    ref: React.ForwardedRef<any>
  ) => (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel color="brand.gray.dark">{label}</FormLabel>
      <Input
        ref={ref}
        name={name}
        data-testid={id}
        w="full"
        border="1px solid"
        borderColor="brand.gray.light"
        _placeholder={{
          color: "brand.gray.medium",
          fontSize: "1rem",
        }}
        color="brand.gray.dark"
        size={size}
        onChange={onChange}
        placeholder={placeholder}
        focusBorderColor="brand.primary"
        {...otherProps}
      />
      <FormErrorMessage data-testid={`${id}-errorMessage`}>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
);

export default CInput;
