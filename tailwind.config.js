/** @type {import('tailwindcss').Config} */
import {
  transparent as _transparent,
  current as _current,
  inherit as _inherit,
  black as _black,
  white as _white,
} from 'tailwindcss/colors'

export const darkMode = ['class']
export const content = ['./src/**/*.{ts,tsx}', './arknights.config.{ts,tsx}']
export const theme = {
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
    },
  },
  extend: {
    colors: {
      'ark-blue': '#18d1ff',
      'end-yellow': '#ffee22',
      transparent: _transparent,
      current: _current,
      inherit: _inherit,
      black: _black,
      white: _white,
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
    },
    fontFamily: {
      benderBold: ['Bender-Bold'],
      benderRegular: ['Bender-Regular'],
      n15eBold: ['Novecentosanswide-Bold'],
      n15eDemiBold: ['Novecentosanswide-DemiBold'],
      n15eMedium: ['Novecentosanswide-Medium'],
      n15eUltraBold: ['Novecentosanswide-UltraBold'],
      oswaldMedium: ['Oswald-Medium'],
      oswaldDemiBold: ['Oswald-DemiBold'],
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      2: "url('/images/bg2.png')",
      index: "url('/images/index-bg.jpg')",
      layout: "url('/images/layout-bg.jpg')",
      'common-mask': "url('/images/common_mask.png')",
      'mask-block': "url('/images/mask_block.png')",
      'mask-block-m': "url('/images/mask_block_m.png')",
      'list-texture': "url('/images/list_bg_texture.png')",
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
    keyframes: {
      'accordion-down': {
        from: { height: 0 },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: 0 },
      },
      downHide: {
        '0%': { opacity: '0', transform: 'translateY(30%)' },
        '40%': { opacity: '1', transform: 'translateY(0)' },
        '60%': { opacity: '1', transform: 'translateY(0)' },
        '100%': { opacity: '0', transform: 'translateY(30%)' },
      },
      showHide: {
        '0%,100%': { opacity: '0' },
        '50%': { opacity: '1' },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
      downHide: 'downHide 1.5s infinite',
      showHide: 'showHide 2s infinite',
    },
  },
}
export const plugins = [require('tailwindcss-animate')]
