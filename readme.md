# React and Frets work Together

Instead of writing JSX, use the elegant and expressive power of frets-styles-generator code combined with the utility-first CSS classes found in tailwind.

[Visit the demo site](https://react-frets.netlify.app/)

This repo can be used as a boilerplate for getting started with frets in react.

## Getting started.

`pnpm install`

`pnpm run dev`

(you can use yarn or npm of course too)

## Development with ESBuild instead of Webpack

As much as possibly this project attempts to use imperative code instead of "magical" configuration.
So, we use a custom script in `scripts/dev.ts` to configure your development and production builds. This allows us to make use of esbuild for it's incredible speed. I find a simple build script much less opaque than a webpack config. Since esbuild is so fast we actually use it to compile our dev script before we run it. Then the dev script uses esbuild again to transpile the TypeScript and bundle it for a browser.

The dev script also runs the postcss on our css files to compile the tailwind plugin and convert styles to the frets-styles API.
