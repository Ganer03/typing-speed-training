import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export const content = [
  './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/*.{js,ts,jsx,tsx,mdx}'
]
export const theme = {
  extend: {}
}
export const plugins = [nextui()]
