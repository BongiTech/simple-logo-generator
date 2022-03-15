// eslint-disable-next-line import/no-extraneous-dependencies
import { lighten } from '@chakra-ui/theme-tools';

const ButtonStyle = {
  // Styles for the base style
  baseStyle: {},
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    primary: {
      bg: 'linear-gradient(136.45deg, #1EA5FC -26.6%, #3456FF 117.76%);',
      color: 'white',
      _hover: {
        bg: 'linear-gradient(136.45deg, #3456FF  -26.6%, #1EA5FC 117.76%);',
        boxShadow: 'md',
        transform: 'scale(1.01)',
        _disabled: {
          bg: 'linear-gradient(136.45deg, #3456FF  -26.6%, #1EA5FC 117.76%);',
        },
      },
      rounded: 'md',
      fontWeight: 500,
      _active: {
        transform: 'scale(0.99)',
      },
      _loading: {
        _hover: {
          bg: 'linear-gradient(136.45deg, #1EA5FC -26.6%, #3456FF 117.76%);',
        },
      },
    },
    'primary-outline': {
      border: '2px',
      borderColor: 'linear-gradient(136.45deg, #3456FF  -26.6%, #1EA5FC 117.76%);',
      color: 'brand.primary',
      _hover: {
        bg: lighten('brand.primary', 45),
        transform: 'scale(1.01)',
      },
      _active: {
        transform: 'scale(0.99)',
      },
    },
  },
  // The default `size` or `variant` values
  defaultProps: {},
};

export default ButtonStyle;
