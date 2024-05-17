import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.component.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.layout.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.stories.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.layout.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.component.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.stories.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.layout.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.component.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.stories.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
