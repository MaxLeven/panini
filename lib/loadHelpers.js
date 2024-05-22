import fs from 'fs';
import path from 'path';
import { loadFiles } from './utils.js';

/**
 * Looks for files with the .js extension within the given directory, and attempts to add them as Handlebars helpers.
 * @param {string} dir - Folder to check for helpers.
 */
export default async function (dir) {
  var helpers = loadFiles(dir, '**/*.js');

  for (var i in helpers) {
    var name = path.basename(helpers[i], '.js');

    try {
      const helper = await import(path.join(helpers[i]));

      this.Handlebars.registerHelper(name, helper.default);
    } catch (e) {
      console.warn(
        'Error when loading ' + name + '.js as a Handlebars helper.',
      );
    }
  }
}
