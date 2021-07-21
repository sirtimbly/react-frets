const purgeFromFrets = require('purgecss-from-frets')
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
    purgecss({
      content: [`./src/**/!(*-styles).ts`],
      extractors: [{ extractor: purgeFromFrets.extract, extensions: ['ts'] }],
      safelist: [
        'html',
        'body',
        'input',
        'button',
        'select',
        'bg-white',
        'bg-black',
        /^mt-/,
        /^w-/,
        /^inset-/,
        /^top-/,
        /^right-/,
        /^left-/,
        /^bottom-/,
        /^h-/,
        /^translate-/,
      ],
    }),
  ],
}
