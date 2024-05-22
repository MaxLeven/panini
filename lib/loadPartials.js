import fs from 'fs';
import path from 'path';
import stripBom from 'strip-bom';
import { loadFiles } from './utils.js';

/**
 * Looks for files with .html, .hbs, or .handlebars extensions within the given directory, and adds them as Handlebars partials matching the name of the file.
 * @param {string} dir - Folder to check for partials.
 */
export default function (dir) {
  var partials = loadFiles(dir, '**/*.{html,hbs,handlebars}');

  for (var i in partials) {
    var ext = path.extname(partials[i]);
    var file = stripBom(fs.readFileSync(partials[i]).toString());
    var name = path.basename(partials[i], ext);

    this.Handlebars.registerPartial(name, file.toString());
  }
}
