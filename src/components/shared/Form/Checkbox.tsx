import React from "react";
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

interface CCheckboxProps extends CheckboxProps {
  error?: string | null;
  label: string;
  name: any;
}

const CCheckbox = React.forwardRef(
  (
    {
      label,
      name,
      onChange,
      isRequired,
      as,
      error = null,
      checked,
      ...otherProps
    }: CCheckboxProps,
    ref: React.ForwardedRef<any>
  ) => {
    return (
      <FormControl
        ref={ref}
        w="full"
        isRequired={isRequired}
        isInvalid={!!error}
      >
        <Checkbox
          size="sm"
          variant="flushed"
          name={name}
          defaultChecked={checked}
          onChange={onChange}
          isInvalid={!!error}
          {...otherProps}
        >
          {label}
        </Checkbox>
        <FormErrorMessage data-testid="errorMessage">{error}</FormErrorMessage>
      </FormControl>
    );
  }
);

export default CCheckbox;
