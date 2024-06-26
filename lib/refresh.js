import path from 'path';

/**
 * Initializes a Panini instance by setting up layouts and built-in helpers. If partials, helpers, or data were configured, those are set up as well. If layout, partial, helper, or data files ever change, this method can be called again to update the Handlebars instance.
 */
export default async function () {
  this.loadLayouts(this.options.layouts);
  this.loadPartials(this.options.partials || '!*');
  await this.loadHelpers(this.options.helpers || '!*');
  this.loadData(this.options.data || '!*');
}
