import ifEqual from '../helpers/ifEqual.js';
import markdown from '../helpers/markdown.js';
import repeat from '../helpers/repeat.js';
import code from '../helpers/code.js';

/**
 * Adds built-in helpers to Panini's internal Handlebars instance.
 */
export default async function () {
  this.Handlebars.registerHelper('ifequal', ifEqual);
  this.Handlebars.registerHelper('markdown', markdown);
  this.Handlebars.registerHelper('repeat', repeat);
  this.Handlebars.registerHelper('code', code);
}
