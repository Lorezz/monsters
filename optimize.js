'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const { optimize } = require('svgo');
const input_folder = path.resolve(__dirname, 'svg_raw');
const output_folder = path.resolve(__dirname, 'public/svg');
const config = {
  plugins: [
    'cleanupAttrs',
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeTitle',
    'removeDesc',
    'removeUselessDefs',
    'removeEditorsNSData',
    'removeEmptyAttrs',
    'removeHiddenElems',
    'removeEmptyText',
    'removeEmptyContainers',
    'removeViewBox',
    'cleanupEnableBackground',
    'convertStyleToAttrs',
    'convertColors',
    'convertPathData',
    'convertTransform',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'removeUnusedNS',
    'cleanupIDs',
    'cleanupNumericValues',
    'moveElemsAttrsToGroup',
    'moveGroupAttrsToElems',
    'collapseGroups',
    // 'removeRasterImages',
    // 'mergePaths',
    'convertShapeToPath',
    'sortAttrs',
    'removeDimensions',
    {
      name: 'removeAttrs',
      params: { attrs: '(stroke|fill-rule|stroke-width)' },
    },
  ],
};

const readFiles = async (dirname) => {
  try {
    const filenames = await (await readdir(dirname)).filter(
      (f) => f.indexOf('.svg') > -1
    );
    console.log({ filenames });
    const files_promise = filenames.map((filename) => {
      return readFile(`${dirname}/${filename}`, 'utf-8');
    });
    const response = await Promise.all(files_promise);
    return filenames.map((filename, currentIndex) => {
      const content = response[currentIndex];
      return {
        filename,
        content,
      };
    });
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  const response = await readFiles(input_folder);
  // console.log(response);
  const opt_results = response.map((item) => {
    const { filename, content } = item;
    const source = `${input_folder}/${filename}`;
    // return writeFile(
    //   dest,
    //   optimize(content, { path: dest, ...config }),
    //   'utf-8'
    // );
    return optimize(content, { path: source, ...config });
  });
  console.log(opt_results.length);

  const promises = response.map((item, index) => {
    const { filename } = item;
    const dest = `${output_folder}/${filename}`;
    const optimized = opt_results[index];
    return writeFile(dest, optimized.data, 'utf-8');
  });

  await Promise.all(promises);
};

// FS.readFile(filepath, 'utf8', function (err, data) {
//   if (err) {
//     throw err;
//   }
//   const result = optimize(data, { path: filepath, ...config });
//   console.log(result);
// });
(() => main())();
