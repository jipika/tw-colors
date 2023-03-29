import { createThemes } from '../dist/lib';

/** @type {import('tailwindcss').Config} */
export default {
   content: ['./**/*.{js,ts,jsx,tsx,html}'],

   plugins: [
      createThemes({
         t1: {
            c1: 'rgb(255 0 0)',
         },
         t2: {
            c1: 'rgb(0 0 255 / 0.5)',
         },
         t3: {
            c1: 'purple',
         },
      }),
      createThemes(({ light, dark }) => ({
         light: light({
            primary: {
               100: 'red',
               200: 'blue',
               nested: {
                  100: 'rgb(0 0 255 / 0.5)',
                  200: 'rgb(255 0 0 / 0.5)',
               },
            },
         }),
         dark: dark({
            primary: {
               100: 'lime',
               200: 'pink',
               nested: {
                  100: 'rgb(0 255 0 / 0.5)',
                  200: 'rgb(255 0 255 / 0.5)',
               },
            },
         }),
      })),
   ],
};