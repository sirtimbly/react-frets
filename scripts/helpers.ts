import { file, basename } from 'estrella'
import postcss from 'postcss'
import purgeFromFrets from 'purgecss-from-frets'
import purgecss from '@fullhuman/postcss-purgecss'
import { readFile } from 'frets-styles-generator'
import path from 'path'

export function subdir(name) {
  return path.join(process.cwd(), name)
}

export const runPostcss = (
  filename: string,
  output: string,
  production: boolean
) => {
  postcss([
    ...require(path.join(process.cwd(), 'postcss.config')).plugins,
    ...(production
      ? [
          require('cssnano')({
            preset: 'default',
          }),
          purgecss({
            content: ['./src/components/**/*.ts'],
            extractors: [
              { extractor: purgeFromFrets.extract, extensions: ['ts'] },
            ],
            safelist: [
              'html',
              'body',
              'input',
              'button',
              'select',
              /icon/,
              /green/,
            ],
            rejected: true,
          }),
        ]
      : []),
  ])
    .process(file.readSync(filename), {
      from: filename,
      to: output + basename(filename),
    })
    .then((result) => {
      file.writeSync(output + basename(filename), result.css)
      if (result.map) {
        file.writeSync(
          output + basename(filename) + '.map',
          result.map.toString()
        )
      }
    })
}

export const runFretsStylesGenerator = (filename: string, dir: string) => {
  readFile(filename, dir + basename(filename, '.css') + '-styles.ts', {
    templatePath:
      subdir('node_modules/frets-styles-generator/build/main/templates/') +
      'react.js',
    overwrite: false,
    inputPath: dir,
    customPlugins: require(path.join(process.cwd(), 'postcss.config')).plugins,
  })
}
