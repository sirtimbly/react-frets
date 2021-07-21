import { file, basename } from 'estrella'
import postcss from 'postcss'

import { GetResultProcessor, readFile } from 'frets-styles-generator'
import path from 'path'
const postcssPlugins = (production: boolean) =>
  production
    ? require(path.join(process.cwd(), 'postcss.config.prod')).plugins
    : require(path.join(process.cwd(), 'postcss.config')).plugins

export function subdir(name) {
  return path.join(process.cwd(), name)
}

export const runPostcss = async (
  filename: string,
  output: string,
  production: boolean,
  dir: string
) => {
  const processor = GetResultProcessor({
    input: filename,
    output: dir + basename(filename, '.css') + '-styles.ts',
    templatePath:
      subdir('node_modules/frets-styles-generator/build/main/templates/') +
      'react.js',
    overwrite: false,
    inputPath: dir,
    customPlugins: postcssPlugins(production),
    debug: false,
  })
  return postcss(postcssPlugins(production))
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
      processor(result)
    })
}

export const runFretsStylesGenerator = async (
  filename: string,
  dir: string,
  production: boolean
) => {
  return readFile({
    input: filename,
    output: dir + basename(filename, '.css') + '-styles.ts',
    templatePath:
      subdir('node_modules/frets-styles-generator/build/main/templates/') +
      'react.js',
    overwrite: false,
    inputPath: dir,
    customPlugins: postcssPlugins(production),
    debug: true,
  })
}
