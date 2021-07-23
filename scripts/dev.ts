#!/usr/bin/env node
import { BuildConfig } from 'estrella'
import { build, cliopts, scandir, file, watch, basename } from 'estrella'

import liveServer from 'live-server'

import { runPostcss, subdir } from './helpers'

// for configuring this script's command line arguments, see also
// https://github.com/rsms/estrella#your-build-script-becomes-a-cli-program
const [opts] = cliopts.parse(
  ['p, production', 'Creates a production build.'],
  ['o, outdir', 'Output directory, defaults to `build/`'],
  ['s, sourcedir', 'Output directory, defaults to `src/`']
)

// set up all the directories we want to work in
const src = subdir(opts.sourcedir || 'src/')
const output = subdir(opts.outdir || 'build/')
const staticDir = subdir('static/')
const cssFilter = /\.css$/i
const staticFilter = /\.html$/i

// the es-build options we will apply to your typescript
const buildOpts: BuildConfig = {
  entry: src + 'index.ts',
  outfile: output + 'index.js',
  bundle: true,
  ...(opts.production
    ? { debug: false, sourcemap: false, minify: true }
    : { debug: true, sourcemap: true, minify: false }),
}

/**
 * Runs postcss on a given css file, and log the time it takes to console
 * @param  {string} filename
 */
async function processStylesheet(filename: string) {
  const time = new Date().getTime()
  await runPostcss(filename, output, opts.production, src)
  console.log(
    `🎸 postcss processing on ${basename(filename)} took ${
      new Date().getTime() - time
    }ms`
  )
}

/**
 * ==========================================
 * Start running custom build steps here.
 * ==========================================
 */

// this can run in parallel with the rest of the build
scandir(staticDir, staticFilter)
  .then((staticFiles) => {
    console.log('🎸 Found static files', staticFiles)
    return Promise.all(
      staticFiles.map((filename: string) =>
        file.copy(staticDir + filename, output + basename(filename))
      )
    )
  })
  .then(() => console.log('🎸 Finished Copying Static files'))

/**
 * Build and Transpile Sources
 * Order of operations:
 *  1. Process CSS,
 *  2. In dev mode: start the server
 *  3. In dev mode: start watching for CSS file changes to rebuild them
 *  4. Build JS,
 */
scandir(src, cssFilter)
  .then((files) => {
    console.log(
      '🎸 Start processing CSS with Postcss and Frets Styles Generator',
      files
    )
    return Promise.all(files.map((file) => processStylesheet(src + file)))
  })
  .finally(() => {
    // Run es-build on our typescript source, watch mode is built in
    if (cliopts.watch) {
      console.log('🎸 Starting dev server.')
      liveServer.start({
        port: process.env.PORT || 8181,
        root: output,
      })
      console.log('🎸 Watching for file changes.')
      watch(src, { filter: cssFilter }, (changes) => {
        console.log('🎸 CSS File modified')
        changes.map((c) => {
          if (c.type === 'add' || c.type === 'change') {
            processStylesheet(c.name)
          }
        })
      })
    }
    console.log('🎸 Build the JS')
    return build(buildOpts)
  })
