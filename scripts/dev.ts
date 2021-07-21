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
const buildOpts = {
  entry: src + 'index.ts',
  outfile: output + 'index.js',
  bundle: true,
  ...(opts.production
    ? { debug: false, sourcemap: false, minify: true }
    : { debug: true, sourcemap: true, minify: false }),
}

function copyToOutputFrom(srcDir: string = src) {
  return (filename: string) =>
    file.copy(srcDir + filename, output + basename(filename))
}

async function processStylesheet(filename) {
  const time = new Date().getTime()
  await runPostcss(filename, output, opts.production, src)
  console.log(
    `🎸 postcss processing on ${basename(filename)} took ${
      new Date().getTime() - time
    }ms`
  )
}

scandir(staticDir).then((files) => {
  console.log('🎸 Copy Static files')
  files.map(copyToOutputFrom(staticDir))
})

scandir(src, cssFilter)
  .then((files) => {
    console.log('🎸 Process CSS with Postcss and Frets Styles Generator', files)
    return Promise.all(files.map((file) => processStylesheet(src + file)))
  })
  .finally(() => {
    build(buildOpts)
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
