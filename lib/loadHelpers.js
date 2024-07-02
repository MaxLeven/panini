import path from 'path';
import { pathToFileURL } from 'url';
import { loadFiles } from './utils.js';

/**
 * Looks for files with the .js extension within the given directory, and attempts to add them as Handlebars helpers.
 * @param {string} dir - Folder to check for helpers.
 */
export default async function (dir) {
  var helpers = loadFiles(dir, '**/*.js');

  helpers.forEach(async (itm) => {
    let name = path.basename(itm, '.js');

    try {
      const helper = await import(pathToFileURL(itm).href);

      this.Handlebars.registerHelper(name, helper.default);
    } catch (e) {
      console.warn(
        'Error when loading ' + name + '.js as a Handlebars helper.',
      );
    }
  });
}
