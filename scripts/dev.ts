#!/usr/bin/env node
import { build, cliopts, scandir, file, watch, basename } from 'estrella'
import { readFile } from 'frets-styles-generator'
import liveServer from 'live-server'
import path from 'path'
import postcss from 'postcss'

function subdir(name) {
  return path.join(__dirname, '../' + name) //assume we are in scripts dir
}

const [ opts, args ] = cliopts.parse(
  ["p, production" , "Creates a production build."],
)
const src = subdir('src/')
const output = subdir('build/')
const staticDir = subdir('static/')
const cssFilter = /\.css$/i
const htmlFilter = /\.html$/i

if (opts.production) {
  build({
    entry: src + 'index.ts',
    outfile: output + 'index.js',
    debug: false,
    bundle: true,
    minify: true,
  })
} else {
  build({
    entry: src + 'index.ts',
    outfile: output + 'index.js',
    debug: true,
    bundle: true,
    sourcemap: true,
    minify: false,
  })
}

function copyToOutputFrom(srcDir: string = src) {
  return (filename: string) =>
    file.copy(srcDir + filename, output + basename(filename))
}

function processFSG(filename) {
  readFile(filename, src + basename(filename, '.css') + '-styles.ts', {
    templatePath:
      subdir('node_modules/frets-styles-generator/build/main/templates/') +
      'react.js',
    overwrite: false,
    inputPath: src,
    customPlugins: [require('tailwindcss')],
  })
  postcss([require('tailwindcss')])
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

scandir(staticDir, htmlFilter).then((files) => {
  console.log('🎸 Copy HTML', files)
  files.map(copyToOutputFrom(staticDir))
})

scandir(src, cssFilter).then((files) => {
  console.log('🎸 Process CSS with Postcss and Frets Styles Generator', files)
  files.map((file) => processFSG(src + file))
})

if (cliopts.watch) {
  console.log('🎸 Starting dev server in watch mode.')

  watch(src, { filter: cssFilter }, (changes) => {
    console.log('🎸 CSS File modified')
    changes.map((c) => processFSG(c.name))
  })

  liveServer.start({
    port: process.env.PORT || 8181,
    root: output,
  })
}
