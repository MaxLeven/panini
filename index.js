import help from './lib/helpMessage.js'
import Handlebars from 'handlebars'

import refresh from './lib/refresh.js'
import loadLayouts from './lib/loadLayouts.js'
import loadPartials from './lib/loadPartials.js'
import loadHelpers from './lib/loadHelpers.js'
import loadBuiltinHelpers from './lib/loadBuiltinHelpers.js'
import loadData from './lib/loadData.js'
import render from './lib/render.js'

/**
 * Initializes an instance of Panini.
 * @constructor
 * @param {object} options - Configuration options to use.
 */
class Panini {
  constructor(options) {
    this.options = options;
    this.Handlebars = Handlebars;
    this.layouts = {};
    this.data = {};

    if (!options.layouts) {
      throw new Error('Panini error: you must specify a directory for layouts.');
    }

    if (!options.root) {
      throw new Error('Panini error: you must specify the root folder that pages live in.');
    }
  }
}

Panini.prototype.refresh = refresh;
Panini.prototype.loadLayouts = loadLayouts;
Panini.prototype.loadPartials = loadPartials;
Panini.prototype.loadHelpers = loadHelpers;
Panini.prototype.loadBuiltinHelpers = loadBuiltinHelpers;
Panini.prototype.loadData = loadData;
Panini.prototype.render = render;

/**
 * Gulp stream function that renders HTML pages. The first time the function is invoked in the stream, a new instance of Panini is created with the given options.
 * @param {object} options - Configuration options to pass to the new Panini instance.
 * @returns {function} Transform stream function that renders HTML pages.
 */
export default class {
  constructor(options) {
    this.options = options
    this.panini = new Panini(this.options)

    this.panini.loadBuiltinHelpers()
    this.reload().then()
  }


  async reload() {
    await this.panini.refresh()
    return await this.panini.refresh.bind(this.panini)
  }

  init() {
    return this.panini.render()
  }
}

export { Panini, Handlebars, refresh, help }
