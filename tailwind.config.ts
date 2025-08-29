import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ["class"],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 7%)',
        foreground: 'hsl(0 0% 95%)',
        border: 'hsl(0 0% 16%)',
        card: 'hsl(0 0% 9%)',
        'card-foreground': 'hsl(0 0% 95%)',
        primary: 'hsl(0 0% 95%)',
        'primary-foreground': 'hsl(0 0% 7%)',
        secondary: 'hsl(0 0% 16%)',
        'secondary-foreground': 'hsl(0 0% 95%)',
        muted: 'hsl(0 0% 16%)',
        'muted-foreground': 'hsl(0 0% 65%)',
        accent: 'hsl(0 0% 16%)',
        'accent-foreground': 'hsl(0 0% 95%)',
        destructive: 'hsl(0 84% 60%)',
        'destructive-foreground': 'hsl(0 0% 95%)',
        ring: 'hsl(0 0% 16%)'
      },
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
      keyframes: {
        enter: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        overlay: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-in-from-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'slide-out-to-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      },
      animation: {
        enter: 'enter 0.18s ease-out',
        overlay: 'overlay 0.18s ease-out',
        'slide-in-from-left': 'slide-in-from-left 0.3s ease-out',
        'slide-out-to-left': 'slide-out-to-left 0.3s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}

export default config