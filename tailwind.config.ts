import { colord } from "colord";
import type { Config } from "tailwindcss";




const generateDarkenColorFrom = (input: string, percentage = 0.07): string =>
  colord(input).darken(percentage).toHex()

const generateLightenColorFrom = (input: string, percentage = 0.07): string =>
  colord(input).lighten(percentage).toHex()



export const tailwindColors: { [key: string]: string } = {
  transparent: "transparent",
  light: "#acababa3",
  "base-25": "#353d47",
  "base-50": "#2a323c",
  "base-75": "#20272e",
  "base-100": "#1d232a",
  "base-200": "#191e24",
  "base-300": "#15191e",
  "base-content": "#A6ADBB",
  "dark-navy": "#141a29",
  black: "#000000",
  charcoal: "#2c2c2c",
  "charcoal-focus": generateLightenColorFrom("#2c2c2c"),
  white: "#fff",
  "slate-gray": "#70727a",
  periwinkle: "#786eff",
  "periwinkle-focus": generateDarkenColorFrom("#786eff"),
  info: "#3abff8",
  "info-content": generateDarkenColorFrom("#3abff8"),
  success: "#36d399",
  "success-content": generateDarkenColorFrom("#36d399"),
  warning: "#fbbd23",
  "warning-content": generateDarkenColorFrom("#fbbd23"),
  error: "#f87272",
  "error-content": generateDarkenColorFrom("#f87272"),
  "gradient-first": "#34eaa0",
  "gradient-second": "#0fa2e9",
}

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: tailwindColors,
    container:{
      center: true
    },
    extend: {
      backgroundImage: {
        'top-section': "url('/images/top-section.jpg')"
    }

    },
  },
  darkMode: 'class',
  plugins: [],
};
export default config;
