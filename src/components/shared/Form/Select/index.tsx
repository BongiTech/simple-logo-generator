import React from "react";
import { FieldError, Controller, FieldValues, Control } from "react-hook-form";
import SelectSearch, {
  fuzzySearch,
  SelectSearchOption,
} from "react-select-search";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputProps,
} from "@chakra-ui/react";
import "./style.css";
import { IOptions } from "../../../../interfaces";

interface CInputProps extends InputProps {
  label?: string;
  error?: FieldError | string | null;
  placeholder?: string;
  size?: string;
  id?: string;
  isRequired?: boolean;
  name: any;
  search?: boolean;
  options: SelectSearchOption[];
  value: string;
  onChange: (data: any) => void;
}

const CSelect = React.forwardRef(
  (
    {
      label,
      error = null,
      placeholder,
      id,
      isRequired,
      value,
      name,
      search,
      options,
      onChange,
    }: CInputProps,
    ref: React.ForwardedRef<any>
  ) => (
    <FormControl ref={ref} isInvalid={!!error} isRequired={isRequired}>
      <FormLabel color="brand.gray.dark">{label}</FormLabel>
      <SelectSearch
        options={options}
        value={value}
        search={search}
        onChange={(val) => {
          onChange({ target: { name, value: val } });
        }}
        filterOptions={fuzzySearch}
        placeholder={placeholder}
      />
      <FormErrorMessage data-testid={`${id}-errorMessage`}>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
);

export default CSelect;
