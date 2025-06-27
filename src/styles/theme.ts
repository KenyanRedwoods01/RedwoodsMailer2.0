import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    // Primary Colors
    primary: {
      50: '#FFF5EB',
      100: '#FFE8CC',
      200: '#FFD199',
      300: '#FFBA66',
      400: '#FFA233',
      500: '#FF7A00', // Primary Orange
      600: '#E05F00', // Dark Orange
      700: '#B34C00',
      800: '#853800',
      900: '#572400',
    },
    // Secondary Colors
    secondary: {
      blue: {
        500: '#1E3A8A', // Deep Blue
      },
      teal: {
        500: '#0D9488', // Teal
      },
      purple: {
        500: '#7E22CE', // Purple
      },
      green: {
        500: '#16A34A', // Green
      },
    },
    // Semantic Colors
    success: {
      500: '#10B981',
    },
    warning: {
      500: '#F59E0B',
    },
    error: {
      500: '#EF4444',
    },
    info: {
      500: '#3B82F6',
    },
  },
  fonts: {
    heading: '"Montserrat", sans-serif',
    body: '"Nunito", sans-serif',
    mono: '"Fira Code", monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  radii: {
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'lg',
        fontWeight: 'medium',
        _hover: {
          transform: 'scale(1.02)',
        },
        _active: {
          transform: 'scale(0.98)',
        },
        transition: 'all 0.15s ease-in-out',
      },
      variants: {
        primary: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.600',
            transform: 'scale(1.02)',
          },
          _active: {
            bg: 'primary.700',
            transform: 'scale(0.98)',
          },
        },
        secondary: {
          bg: 'white',
          border: '1px solid',
          borderColor: 'primary.500',
          color: 'primary.500',
          _hover: {
            bg: 'primary.50',
            transform: 'scale(1.02)',
          },
          _active: {
            bg: 'primary.100',
            transform: 'scale(0.98)',
          },
        },
        tertiary: {
          bg: 'transparent',
          color: 'primary.500',
          _hover: {
            bg: 'primary.50',
            transform: 'scale(1.02)',
          },
          _active: {
            bg: 'primary.100',
            transform: 'scale(0.98)',
          },
        },
        danger: {
          bg: 'error.500',
          color: 'white',
          _hover: {
            bg: 'red.600',
            transform: 'scale(1.02)',
          },
          _active: {
            bg: 'red.700',
            transform: 'scale(0.98)',
          },
        },
      },
      defaultProps: {
        variant: 'primary',
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          boxShadow: 'md',
          p: 6,
          transition: 'all 0.2s ease-in-out',
          _hover: {
            boxShadow: 'lg',
            transform: 'scale(1.01)',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'lg',
          _focus: {
            borderColor: 'primary.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)',
          },
        },
      },
      defaultProps: {
        focusBorderColor: 'primary.500',
      },
    },
    Textarea: {
      baseStyle: {
        borderRadius: 'lg',
        _focus: {
          borderColor: 'primary.500',
          boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)',
        },
      },
      defaultProps: {
        focusBorderColor: 'primary.500',
      },
    },
    Select: {
      baseStyle: {
        field: {
          borderRadius: 'lg',
          _focus: {
            borderColor: 'primary.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)',
          },
        },
      },
      defaultProps: {
        focusBorderColor: 'primary.500',
      },
    },
    Tabs: {
      variants: {
        line: {
          tab: {
            _selected: {
              color: 'primary.500',
              borderColor: 'primary.500',
            },
            _hover: {
              bg: 'gray.100',
            },
            transition: 'all 0.15s ease-in-out',
          },
        },
        enclosed: {
          tab: {
            borderTopRadius: 'lg',
            _selected: {
              color: 'primary.500',
              borderColor: 'primary.500',
              borderBottomColor: 'transparent',
            },
            _hover: {
              bg: 'gray.100',
            },
            transition: 'all 0.15s ease-in-out',
          },
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'full',
        px: 2,
        py: 1,
        textTransform: 'normal',
        fontWeight: 'medium',
        fontSize: 'xs',
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: 'xl',
          boxShadow: 'xl',
        },
        header: {
          borderBottomWidth: '1px',
          borderColor: 'gray.200',
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        fontFamily: 'body',
        color: 'gray.800',
        bg: 'white',
        transitionProperty: 'background-color',
        transitionDuration: 'normal',
        lineHeight: 'base',
      },
      '*::placeholder': {
        color: 'gray.400',
      },
      '*, *::before, *::after': {
        borderColor: 'gray.200',
      },
      // Custom scrollbar
      '::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '::-webkit-scrollbar-track': {
        background: 'gray.100',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'gray.400',
        borderRadius: 'full',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: 'gray.500',
      },
    },
  },
  // Custom transition presets
  transitions: {
    page: {
      enter: {
        opacity: 1,
        transform: 'scale(1)',
        transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
      },
      exit: {
        opacity: 0,
        transform: 'scale(0.98)',
        transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
      },
    },
  },
  // Dark mode config
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme;
