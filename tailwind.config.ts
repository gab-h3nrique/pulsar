import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'selector',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}", //path to components/pages
    "./components/**/*.{js,ts,jsx,tsx}", //path to components/pages
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {

       'primary': '#f97316',
       'primary-opacity': '#f973161a',
       'background-1': '#f8fafc',
       'background-2': '#ffffff',
       'color-1': '#334155',
       'color-2': '#64748b',
       'color-3': '#cbd5e1',
       'border': '#cbd5e1',

       'primary-dark': '#f97316',
       'primary-opacity-dark': '#f973161a',
       'background-1-dark': '#000000',
       'background-2-dark': '#090909',
       'color-1-dark': '#cbd5e1',
       'color-2-dark': '#e2e8f0',
       'color-3-dark': '#94a3b8b8',
       'border-dark': '#f1f5f93d'

      //  'primary': '#f97316',
      //  'primary-opacity': '#f973161a',
      //  'background-1': '#000000',
      //  'background-2': '#090909',
      //  'color-1': '#cbd5e1',
      //  'color-2': '#e2e8f0',
      //  'color-3': '#94a3b8b8',
      //  'border': '#f1f5f93d'

      },
    },
  },
  plugins: [],
};
export default config;
