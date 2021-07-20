#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var import_estrella = __toModule(require("estrella"));
var import_frets_styles_generator = __toModule(require("frets-styles-generator"));
var import_live_server = __toModule(require("live-server"));
var import_path = __toModule(require("path"));
var import_postcss = __toModule(require("postcss"));
function subdir(name) {
  return import_path.default.join(__dirname, "../" + name);
}
const [opts, args] = import_estrella.cliopts.parse(["p, production", "Creates a production build."]);
const src = subdir("src/");
const output = subdir("build/");
const staticDir = subdir("static/");
const cssFilter = /\.css$/i;
const htmlFilter = /\.html$/i;
if (opts.production) {
  (0, import_estrella.build)({
    entry: src + "index.ts",
    outfile: output + "index.js",
    debug: false,
    bundle: true,
    minify: true
  });
} else {
  (0, import_estrella.build)({
    entry: src + "index.ts",
    outfile: output + "index.js",
    debug: true,
    bundle: true,
    sourcemap: true,
    minify: false
  });
}
function copyToOutputFrom(srcDir = src) {
  return (filename) => import_estrella.file.copy(srcDir + filename, output + (0, import_estrella.basename)(filename));
}
function processFSG(filename) {
  (0, import_frets_styles_generator.readFile)(filename, src + (0, import_estrella.basename)(filename, ".css") + "-styles.ts", {
    templatePath: subdir("node_modules/frets-styles-generator/build/main/templates/") + "react.js",
    overwrite: false,
    inputPath: src,
    customPlugins: [require("tailwindcss")]
  });
  (0, import_postcss.default)([require("tailwindcss")]).process(import_estrella.file.readSync(filename), {
    from: filename,
    to: output + (0, import_estrella.basename)(filename)
  }).then((result) => {
    import_estrella.file.writeSync(output + (0, import_estrella.basename)(filename), result.css);
    if (result.map) {
      import_estrella.file.writeSync(output + (0, import_estrella.basename)(filename) + ".map", result.map.toString());
    }
  });
}
(0, import_estrella.scandir)(staticDir, htmlFilter).then((files) => {
  console.log("\u{1F3B8} Copy HTML", files);
  files.map(copyToOutputFrom(staticDir));
});
(0, import_estrella.scandir)(src, cssFilter).then((files) => {
  console.log("\u{1F3B8} Process CSS with Postcss and Frets Styles Generator", files);
  files.map((file2) => processFSG(src + file2));
});
if (import_estrella.cliopts.watch) {
  console.log("\u{1F3B8} Starting dev server in watch mode.");
  (0, import_estrella.watch)(src, { filter: cssFilter }, (changes) => {
    console.log("\u{1F3B8} CSS File modified");
    changes.map((c) => processFSG(c.name));
  });
  import_live_server.default.start({
    port: process.env.PORT || 8181,
    root: output
  });
}
