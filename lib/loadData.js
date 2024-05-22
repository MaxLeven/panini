import fs from 'fs';
import path from 'path';
import { loadFiles } from './utils.js';
import yaml from 'js-yaml';

/**
 * Looks for files with .js, .json, or .yml extensions within the given directory, and adds them as Handlebars variables matching the name of the file.
 * @param {string} dir - Folder to check for data files.
 */
export default function (dir) {
  var dataFiles = loadFiles(dir, '**/*.{js,json,yml}');

  for (var i in dataFiles) {
    var file = fs.readFileSync(dataFiles[i]);
    var ext = path.extname(dataFiles[i]);
    var name = path.basename(dataFiles[i], ext);
    var data;

    if (ext === '.json' || ext === '.js') {
      delete require.cache[require.resolve(dataFiles[i])];
      data = require(dataFiles[i]);
    } else if (ext === '.yml') {
      data = yaml.safeLoad(fs.readFileSync(dataFiles[i]));
    }

    this.data[name] = data;
  }
}
