#!/usr/bin/env node
import { build, cliopts, scandir, file, watch, basename } from 'estrella'

import liveServer from 'live-server'

import { runPostcss, runFretsStylesGenerator, subdir } from './helpers'

const [opts] = cliopts.parse(
  ['p, production', 'Creates a production build.'],
  ['o, outdir', 'Output directory, defaults to `build/`'],
  ['s, sourcedir', 'Output directory, defaults to `src/`'],
  ['t, staticdir', 'Static file directory, defaults to `static/`']
)
const src = subdir(opts.sourcedir || 'src/')
const output = subdir(opts.outdir || 'build/')
const staticDir = subdir(opts.staticdir || 'static/')
const cssFilter = /\.css$/i
const htmlFilter = /\.html$/i
const buildOpts = {
  entry: src + 'index.ts',
  outfile: output + 'index.js',
  bundle: true,
}

if (opts.production) {
  build({
    ...buildOpts,
    debug: false,
    minify: true,
  })
} else {
  build({
    ...buildOpts,
    debug: true,
    sourcemap: true,
    minify: false,
  })
}

function copyToOutputFrom(srcDir: string = src) {
  return (filename: string) =>
    file.copy(srcDir + filename, output + basename(filename))
}

function processStylesheet(filename) {
  // send through frets-styles-generator first
  runFretsStylesGenerator(filename, src)
  // output the final css file
  runPostcss(filename, output, opts.production)
}

scandir(staticDir).then((files) => {
  console.log('🎸 Copy Static files')
  files.map(copyToOutputFrom(staticDir))
})

scandir(src, cssFilter).then((files) => {
  console.log('🎸 Process CSS with Postcss and Frets Styles Generator', files)
  files.map((file) => processStylesheet(src + file))
})

if (cliopts.watch) {
  console.log('🎸 Starting dev server in watch mode.')

  watch(src, { filter: cssFilter }, (changes) => {
    console.log('🎸 CSS File modified')
    changes.map((c) => {
      if (c.type === 'add' || c.type === 'change') {
        processStylesheet(c.name)
      }
    })
  })

  liveServer.start({
    port: process.env.PORT || 8181,
    root: output,
  })
}
