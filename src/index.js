const Color = require('color');
const plugin = require('tailwindcss/plugin');
/**
 * @example
 * colorTheme({
 * 	light: {
 * 		primary: 'gold',
 * 		secondary: 'tomato'
 * 	},
 * 	dark: {
 * 		primary: 'lightblue',
 * 		secondary: 'lime'
 * 	},
 * 	forest: {
 * 		primary: 'green',
 * 		secondary: 'brown'
 * 	},
 * })
 * ...
 * <html data-theme='light'>
 * ...
 * <button class='bg-primary text-secondary hover:bg-opacity-75'>
 *    Click me!
 * </button>
 * ...
 * @param {Record<string, Record<string,string>>} config
 * @returns {void}
 */
module.exports = function colorTheme(config = {}) {
   const themeConfig = Object.entries(config).reduce(
      (themeConfig, [themeName, values]) => {
         const selector = `.theme-${themeName}`;
         // initialize the "@layer base" selector
         if (!themeConfig.base[selector]) {
            themeConfig.base[selector] = {};
         }
         Object.entries(values).forEach(([name, rawColor]) => {
            const variableName = `--ct-${name}`;
            const [h, s, l] = Color(rawColor).hsl().array();
            // set the css variable in "@layer base"
            themeConfig.base[selector][variableName] = `${h} ${s}% ${l}%`;
            // map it the the theme colors
            themeConfig.colors[name] = computeColorValue(variableName);
         });

         return themeConfig;
      },
      { base: {}, colors: {} },
   );

   return plugin(
      // add the css variables to "@layer base"
      ({ addBase }) => {
         addBase(themeConfig.base);
      },
      // extend the colors config
      { theme: { extend: { colors: themeConfig.colors } } },
   );
};

function computeColorValue(variableName) {
   return ({ opacityVariable, opacityValue }) => {
      if (typeof opacityValue !== 'undefined') {
         return `hsl(var(${variableName}) / ${opacityValue})`;
      }
      if (typeof opacityVariable !== 'undefined') {
         return `hsl(var(${variableName}) / var(${opacityVariable}, 1))`;
      }
      return `hsl(var(${variableName}))`;
   };
}
