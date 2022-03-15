import { extendTheme } from "@chakra-ui/react";
import Button from "./components/Button";
import Input from "./components/Input";
import { colors } from "./colors";

const theme = extendTheme({
  colors: {
    ...colors,
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
  },
  components: {
    Input,
    Button,
  },
});

export default theme;
