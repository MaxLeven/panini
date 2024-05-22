'use strict';

import glob from 'glob';
import path from 'path';
import fs from 'fs';

/**
 * Load a set of files
 * @param  {string|array} dir
 * @param  {string}       pattern
 * @return {array}
 */
export function loadFiles(dir, pattern) {
  var files = [];

  dir = !Array.isArray(dir) ? [dir] : dir;

  for (var i in dir) {
    files = files.concat(glob.sync(path.join(process.cwd(), dir[i], pattern)));
  }

  return files;
}
