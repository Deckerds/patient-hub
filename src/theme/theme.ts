import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'Roboto, sans-serif' },
        body: { value: 'Roboto, sans-serif' },
      },
      colors: {
        brand: {
          50: { value: '#f1f7fc' },
          100: { value: '#4daaff' },
          200: { value: '#017eff' },
          300: { value: '#005f99' },
          400: { value: '#ff7f01' },
          500: { value: '#ffcc00' },
          600: { value: '#2d3e5a' },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: '{colors.brand.200}' },
          contrast: { value: '{colors.brand.50}' },
          fg: { value: '{colors.brand.600}' },
          muted: { value: '{colors.brand.100}' },
          subtle: { value: '{colors.brand.300}' },
          emphasized: { value: '{colors.brand.400}' },
          focusRing: { value: '{colors.brand.200}' },
        },
      },
    },
  },
});
